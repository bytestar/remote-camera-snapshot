# remote-camera-snapshot

## What it does
This project is going to demonstrate how to use a Raspberry Pi, a webcam and an internet server
with around 100 lines code to build a simple home surveillance system.


## What you can do
You can take a snapshot from webcam in your house or office through the web browser.
![image](https://github.com/bytestar/remote-camera-snapshot/blob/main/rcs_demo.jpg)

## Requirement
- Internet server
> If you want to access everywhere then you need a public IP or you can only access in local netowork
- Raspberry Pi
- USB Webcam or RPi camera


## How to use
On Internet Server:
1. Install Nodejs and npm package 
```
sudo apt install nodejs
sudo apt install npm
```
2. Install formidable module
```
cd remote-camera-snapshot/web
npm install formidable
```
3. Run camera_server.js
```
node camera_server.js
```
On Raspberry Pi:
1. Install Nodejs, python3 and OpenCV for python3
```
sudo apt install nodejs
sudo apt install python3
sudo apt install opencv-python
```
2. Change HOST variable to your internet server IP in camera_client.js
```
const HOST = '<YOUR HOST>';
```
3. Run camera_client.js
```
cd remote-camera-snapshot/cam-client
node camera_client.js
```
Finally,<br/>
Open you web browser and goes to http://<host_ip>:<8080>/<br/>
Done.
 

## License
```
Copyright (C) 2015 Ping-Chun Tseng <lucas.pctseng@gmail.com> 
Licensed under Apache 2.0
```