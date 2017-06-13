const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8000');

ws.on('open', function open() {
	ws.send('hello');
});

ws.on('message', function incoming(data) {
	console.log(data);
});
