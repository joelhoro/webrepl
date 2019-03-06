var StartServer = require('./server').StartServer;

// Require the serialport node module
var serialport = require('serialport');

var SERIAL_PORT = "COM3";

// console.log("Opening Serial port " + SERIAL_PORT);
// var port = new serialport(SERIAL_PORT, {
//     baudRate: 115200,
// });


var PORT = 90;
var SERIAL_PORT = "COM3";
var ws = StartServer(PORT, ws => {

    var port;
    
    function sendData(type, contents) {
        ws.send(JSON.stringify({ type, contents }));
    }

    ws.on('message', message => {
        var data = JSON.parse(message);

        //log the received message and send it back to the client
        console.log('Received from socket: %s', message);
        if(data.type == 'serial') {
            var contents = data.contents;
            console.log("Sending this to serial line: ", contents);
            port.write(contents);
        }
        if(data.type == 'ports') {
            serialport.list(function (err, ports) {
                sendData('ports',ports);
              });
        }
        if(data.type == 'connect') {
            var serial_port = data.contents.port;
            var baudRate = data.contents.baudrate;
            
            console.log("Opening Serial port " + serial_port);

            port = new serialport(serial_port, {
                baudRate,
            });

            port.on('data', function(data) {
                console.log("Received data from serial: ", data);
                sendData('data', data);
            });
        }
    });

    ws.on('close', _ => {
        console.log("Closing port");
        port.close();
    })
});
