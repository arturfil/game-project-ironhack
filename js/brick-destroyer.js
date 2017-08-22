var canvas, canvasContext;

function updateMousePos(e) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = e.clientX - rect.left - root.scrollLeft;
  // var mouseY = e.clientY - rect.top = root.scrollTop;

  paddleX = mouseX - PADDLE_WIDTH/2;
}

function ballReset() {
  ballX = canvas.height/2;
  ballY = canvas.width/2;
}

window.onload = function() {

  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', updateMousePos);
}

var ballX = 75;
var ballY = 75;
var radius = 10;

var ballSpeedX = 5;
var ballSpeedY = 5;

const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const PADDLE_DIST_FROM_EDGE = 60;
var paddleX = 400;

function updateAll() {
  moveAll();
  drawAll()
}

// this controls the boundraries of the ball movement but doesn't create the movement itself;
function moveAll() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX + radius > canvas.width || ballX - radius < 0) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballY + radius > canvas.height) {
    ballReset();
    // ballSpeedY = -ballSpeedY;
  }

  if (ballY - radius == 0) {
    // ballReset();
    ballSpeedY = -ballSpeedY;
  }

  var difficulty = {
    easy: .35,
    normal: .45,
    hard: .55
  }

  var paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
  var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_HEIGHT;
  var paddleLeftEdgeX = paddleX;
  var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
  if (  ballY > paddleTopEdgeY - radius && // bellow the top of the paddle
        ballY < paddleBottomEdgeY + radius && // above the bootom of the paddle
        ballX > paddleLeftEdgeX && // right of the left side of the paddle
        ballX < paddleRightEdgeX ) { // left of the right side of the paddle
        ballSpeedY *= -1;

        var centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
        var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
        ballSpeedX = ballDistFromPaddleCenterX * difficulty.hard;

    }
}

//drawing the canvas and the ball everytime the window loads.
// it emulates movement
function drawAll() {
  colorRect(0, 0, canvas.width, canvas.height, 'black') //draw screen
  colorCircle(ballX, ballY, radius, 'white' )           //draw ball

  colorRect(paddleX, canvas.height - PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
  ctx.fillStyle = fillColor;
  ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY,  ballRadius, fillColor) {
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY,  ballRadius, 0, Math.PI * 2, true);
  ctx.fill();
}
