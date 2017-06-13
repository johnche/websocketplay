var express = require('express');
var app = express();
var http = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: http }); 
var port = 8000;

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    }); 
};

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        // Print to console
        console.log('Message: %s', message);

        // Broadcast to everyone else
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    })  

    ws.send('Connected');
});



app.get('/', function(req, res) {
    res.sendFile('main.html', {root: __dirname});
});
app.use('/static', express.static(__dirname + '/static'));

app.get('/datasender', function(req, res) {
	res.sendFile('data.html', {root: __dirname});
});

http.listen(port, function() {
    console.log('Listening to port ' + port);
});

