var series = [5, 2, 4, 2, 0, 5, 2, 7, 9, 0, 4];
var labels =  ['mon', 'tue', 'wed', 'thu', 'fri'];
var linedata = { labels: labels, series: [series] };
var options = { high: 2, low: -2 };

var linechart = new Chartist.Line('#chart1', linedata, options);

const socket = new WebSocket('ws://localhost:8000');
const statuslog = document.getElementById('statuslog');
const data = document.getElementById('data');

socket.addEventListener('open', function(event) {
	statuslog.innerHTML = "Connected";
});

socket.addEventListener('message', function(event) {
	//data.innerHTML += event.data + "\n";
	series.splice(0, 1);
	series.push(Number(event.data));
	linechart.update({series: [series], labels: labels}, null, false);
});

