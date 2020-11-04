// Author: Lucas Tseng
const net = require('net');
const exec = require('child_process').exec;
const request = require('request');
const fs = require('fs');

const PORT = 18080; // web server tcp port
const WEB_PORT = 8080;
const HOST = '<YOUR HOST>';
const KEEP_ALIVE_TIME = 15 * 60 * 1000;

var client = new net.Socket();
client.connect(PORT, HOST, function() {
	console.log('Connected');
});

client.on('data', function(msg) {
	if (msg == "snapshot") {
		console.log('Snaphsot...');
		exec('python3 snapshot.py', (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			var webUrl = 'http://' + HOST + ':' + WEB_PORT;
			var req = request.post(webUrl + '/fileupload', function (err, resp, body) {
				if (err) {
					console.log('Error');
				} else {
					console.log('Response: ' + body);
				}
			});
			var form = req.form();
			form.append('filetoupload', fs.createReadStream('snap.jpg'), {
				name: 'snap.jpg'
			});
			client.write('snapshot_ok');
			console.log('Snaphsot...done');
		});
	}
});

client.on('close', function() {
	console.log('Connection closed');
	client = null;
});

function keepOnline(client) {
	if (client !== null) {
		client.write('keep_alive');
	}
	else {
		var client = new net.Socket();
		client.connect(PORT, HOST, function() {
			console.log('Connected');
		});
	}
}

setInterval(keepOnline, KEEP_ALIVE_TIME, client);
