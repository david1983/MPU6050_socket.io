var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sp = new SerialPort("/dev/ttyACM0", {
    parser: serialport.parsers.readline("\n")
});


app.listen(8999);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function (socket) {
    sp.on('data', function(data) {
        socket.emit('news', { hello: data });
    });



});
