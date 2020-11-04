# remote-camera-snapshot

## What it does
This project is going to demonstrate how to use a Raspberry Pi, a webcam and an internet server
with around 100 lines code to build a simple home surveillance system.


## What you can do
You can take a snapshot from webcam in your house or office through the web browser.


## Requirement
- Internet server
>> If you want to access everywhere then you need a public IP or you can only access in local netowork
- Raspberry Pi
- USB Webcam or RPi camera


## How to use
Open you web browser with you internet server url


## Get Start
The working flow as below
```
camera preview data(YV12) -> YUV420sp -> MediaCodec -> H.264 data -> UDP 
```
 

## License
```
Copyright (C) 2015 Ping-Chun Tseng <lucas.pctseng@gmail.com> 
Licensed under Apache 2.0
```

## Future works
