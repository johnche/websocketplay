var linechart = new Chartist.Line('#chart1', {
	labels: ['mon', 'tue', 'wed', 'thu', 'fri'],
	series: [[5, 2, 4, 2, 0]]
});

const socket = new WebSocket('ws://localhost:8000');
const logger = document.getElementById('log');

socket.addEventListener('open', function(event) {
	console.log('connected');
	logger.innerHTML += event.data + "\n";
});

socket.addEventListener('message', function(event) {
	console.log(event.data);
	linechart.update(0, null, null);
});
