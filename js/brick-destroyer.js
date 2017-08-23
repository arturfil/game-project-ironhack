
//game variables go here//
var difficulty = 0.45;
var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 5;
var radius = 10;


const BRICK_W = 100;
const BRICK_H = 30;
const BRICK_GAP = 2;
const BRICK_COLS = 8;
const BRICK_ROWS = 6;
var brickGrid = new Array(BRICK_COLS);

const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const PADDLE_DIST_FROM_EDGE = 60;
var paddleX = 400;

var canvas, canvasContext;

var mouseX = 0;
var mouseY = 0;

function updateMousePos(event) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  var mouseX = event.clientX - rect.left - root.scrollLeft;
  // var mouseY = event.clientY - rect.top - root.scrollTop;

  paddleX = mouseX - PADDLE_WIDTH/2;
}

function brickReset(){
  for(var i=0; i < BRICK_COLS; i++) {
    brickGrid[i] = true;
  }

  brickGrid[5] = false;
}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', updateMousePos);
}

function updateAll() {
  moveAll();
  drawAll();
}

function ballReset() {
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

function moveAll() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX + radius > canvas.width || ballX - radius < 0) {
    ballSpeedX = -ballSpeedX
  }

  if (ballY + radius > canvas.height) {
    ballReset();
  }

  if (ballY - radius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  var paddleTopEdgeY = canvas.height-PADDLE_DIST_FROM_EDGE;
  var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_HEIGHT;
  var paddleLeftEdgeX = paddleX;
  var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
  if (ballY > paddleTopEdgeY - radius &&             //bellow
    ballY < paddleBottomEdgeY - radius &&             //above
    ballX > paddleLeftEdgeX - radius &&               //left
    ballX < paddleRightEdgeX + radius ) {           //right
      ballSpeedY = -ballSpeedY;

      var centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
      var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
      ballSpeedX = ballDistFromPaddleCenterX * difficulty;
    }

}

function drawBricks() {
  for (var eachRow=0; eachRow<BRICK_ROWS; eachRow++) {
    for (var eachCol=0; eachCol < BRICK_COLS; eachCol++) {
      if(brickGrid[eachCol] = true) { // CHECK THE CONDITIONAL! FOR NOW I DID A TEMPORARY FIX!
        colorRect(BRICK_W * eachCol, BRICK_H * eachRow, BRICK_W-BRICK_GAP, BRICK_H-BRICK_GAP, 'blue');
      }
    }
  }
}

function drawAll() {
  colorRect(0, 0, canvas.width, canvas.height, 'black'); //clear screen

  colorCircle(ballX, ballY, radius, 'white') //draw ball

  colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_HEIGHT, 'white')

  drawBricks();

  //colorText(mouseX+ ... DONT WANT TO DISPLAY THE MOUSE COORDINATES)
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}
