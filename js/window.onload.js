var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 5;
var radius = 10;

var canvas, canvasContext;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);
}
