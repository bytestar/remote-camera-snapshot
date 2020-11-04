const net = require('net');
const http = require('http');
const fs = require('fs');
const formidable = require('formidable');

const HOST = '0.0.0.0';

// TCP Server
var cameraClient = null;
const TCP_PORT = 18080;
var server = net.createServer();    
server.on('connection', handleConnection);
server.listen(TCP_PORT, HOST, function() {    
	console.log('TCP Server is running');  
});

function handleConnection(conn) {
	cameraClient = conn;
	var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;  
	console.log('new client connection from %s', remoteAddress);
	conn.on('data', onReceiveData);  
	conn.once('close', onConnClose);  
	conn.on('error', onConnError);


	function onReceiveData(msg) {
		console.log('connection data from %s: %s', remoteAddress, msg);
	};

	function onConnClose() {  
		console.log('connection from %s closed', remoteAddress);  
		cameraClient = null;
	};

	function onConnError(err) {
		console.log('Connection %s error: %s', remoteAddress, err.message);  
		cameraClient = null;
	};
}

// Web Server
const WEB_PORT = 8080;
const requestListener = function (req, res) {
	if (req.url == '/') {
		var html = fs.readFileSync('index.html');
	    res.setHeader("Content-Type", "text/html");
	    res.writeHead(200);
	    res.end(html);
	}
	else if (req.url.startsWith('/snap.jpg')) {
		if (!fs.existsSync('snap.jpg')) {
		    res.setHeader("Content-Type", "text/html");
		    res.writeHead(404);
		    res.end();
		    return;
		}
		var img = fs.readFileSync('snap.jpg');
	    res.setHeader("Content-Type", "image/jpeg");
	    res.writeHead(200);
	    res.end(img);
	}
	else if (req.url == '/snapshot') {
		cameraClient.write('snapshot');
		if (fs.existsSync('snap.jpg'))
			fs.unlinkSync('snap.jpg');
	    res.setHeader("Content-Type", "text/html");
	    res.writeHead(200);
	    res.end();
	}
	else if (req.url == '/fileupload') {
    	var form = new formidable.IncomingForm();
    	form.parse(req, function (err, fields, files) {
		var oldpath = files.filetoupload.path;
		var newpath = './' + files.filetoupload.name;
		fs.rename(oldpath, newpath, function (err) {
		    	if (err) throw err;
				res.write('File upload ok');
				res.end();
    	    });
	    });
  	}
  	else if (req.url == '/reload') {
		if (!fs.existsSync('snap.jpg')) {
		    res.setHeader("Content-Type", "text/html");
		    res.writeHead(404);
		    res.end();
		    return;
		}
	    res.setHeader("Content-Type", "text/html");
	    res.writeHead(200);
	    res.end();
  	}
}

const web = http.createServer(requestListener);
web.listen(WEB_PORT, HOST, () => {
    console.log('Web Server is running');
}); 
