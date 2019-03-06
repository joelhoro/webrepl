const path = require('path');
const express = require('express');
const app = express();
const WebSocket = require('ws');

var http = require('http').Server(app);

exports.StartServer = function(port, connectFn = undefined) {

    app.use('/', express.static(path.resolve(__dirname)))

    const wss = new WebSocket.Server({ port: 9000 });
    wss.on('connection', connectFn);

    http.listen(port, () => console.log(`Example app listening on port ${port}!`))

    // io.on('connection', function(socket) { 
    //     console.log("New connection...");
    //     if(connectFn != undefined)
    //         connectFn(socket);
    // });

    return wss;
}
 


