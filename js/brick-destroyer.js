
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
var brickGrid = [true, true, true, false, true ];

const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const PADDLE_DIST_FROM_EDGE = 60;
var paddleX = 400;

var canvas, canvasContext;

var mouseX = 0;
var mouseY = 0;

//Pretty self explanatory
function updateMousePos(event) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  var mouseX = event.clientX - rect.left - root.scrollLeft;
  // var mouseY = event.clientY - rect.top - root.scrollTop;

  paddleX = mouseX - PADDLE_WIDTH/2;
}

// this will check whether a brick should be drawn along with the drawBricks(); function
function brickReset(){
  for(var i=0; i < BRICK_COLS * BRICK_ROWS; i++) {
    brickGrid[i] = true;
  }

  brickGrid[5] = false;
}

// Game loaded
window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', updateMousePos);
}

// this function redraws and controls the movement of all the objects in the game
function updateAll() {
  moveAll();
  drawAll();
}

// every time the ball touches the bottom, the ball will re-apear or 'reset' in the screen
function ballReset() {
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

// this controls the movement of the ball and the paddle
function moveAll() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // this 'if' statements control the movement and the boundraries of the ball movement
  if (ballX + radius > canvas.width || ballX - radius < 0) {
    ballSpeedX = -ballSpeedX
  }

  if (ballY + radius > canvas.height) {
    ballReset();
  }

  if (ballY - radius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  // this contorls the movement of the paddle with the mouse given the varibles created for the Paddle creation
  var paddleTopEdgeY = canvas.height-PADDLE_DIST_FROM_EDGE;
  var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_HEIGHT;
  var paddleLeftEdgeX = paddleX;
  var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
  if (ballY > paddleTopEdgeY - radius &&             //bellow
    ballY < paddleBottomEdgeY - radius &&             //above
    ballX > paddleLeftEdgeX - radius &&               //left
    ballX < paddleRightEdgeX + radius ) {           //right
      ballSpeedY = -ballSpeedY;

      // this specifically refers that your mouse will contorl the CENTER of the mouse
      var centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
      var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
      ballSpeedX = ballDistFromPaddleCenterX * difficulty;
    }

}

//this function calls colorRec() and test the logic to decide whether it should draw it or not
function drawBricks() {
  if(brickGrid[0]) {
    colorRect(BRICK_W*0, 0, BRICK_W-2, BRICK_H, 'red')
  }
}

//Draws all of the objects
function drawAll() {
  colorRect(0, 0, canvas.width, canvas.height, 'black'); //clear screen

  colorCircle(ballX, ballY, radius, 'white') //draw ball

  colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_HEIGHT, 'white') //draw paddle

  drawBricks();// pretty self explanatory

  //colorText(mouseX+ ... DONT WANT TO DISPLAY THE MOUSE COORDINATES)
}

//Draw a rectangle either the bricks or the paddle
function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

//drawing the ball
function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}
