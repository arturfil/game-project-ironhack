var canvas  = document.querySelector('canvas');

canvas.width = window.innerWidth = 800;
canvas.height = window.innerHeight = 600;

var c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255, 0, 0, 0.1 )'; // the fill style has to go before the "fill Rect()"
// c.fillRect(100, 100, 100, 100);
//
//
//
// // moving line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.strokeStyle = "#aaa"
// c.stroke();

// arc / Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue'
// c.stroke();

// arc / Circle

var x = 300;
var y = 300;
var dx = 4;
var dy = 4;
var radius = 30;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  c.beginPath();
  c.arc(x, y, 30, 0, Math.PI * 2, false);
  c.strokeStyle = 'blue'
  c.stroke();

  if (x + radius > innerWidth || x - radius < 0) {
    dx = -dx;
  }

  if (y + radius > innerHeight || y - radius < 0) {
    dy = -dy;
  }

  x += dx;
  y += dy;
  console.log('procesing ...');
}

animate();
