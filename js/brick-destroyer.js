
//game variables go here//
var difficulty = 0.45;
var ballX = 450;
var ballY = 450;
var ballSpeedX = 5;
var ballSpeedY = 5;
var radius = 10;

var audio = new Audio();
    i = 0;
var playlist = new Array(
  "./audio/little_secrets.m4a",
  "./audio/fire.m4a",
  "./audio/brocoli.m4a",
  "./audio/fall.m4a"
);

audio.addEventListener('ended', function () {
    i = ++i < playlist.length ? i : 0;
    console.log(i)
    audio.src = playlist[i];
    audio.play();
}, true);
audio.volume = 0.3;
audio.loop = false;
audio.src = playlist[0];
audio.play();

// Check brick collision again;
var BRICK_W = 80;
var BRICK_H = 20;

const BRICK_GAP = 2;
// const BRICK_COUNT = 8;
const BRICK_COLS = 10;
const BRICK_ROWS = 9;
var brickGrid = new Array(BRICK_COLS * BRICK_ROWS); // This will keep track an array that is 2 dimensional (height and width).
var bricksLeft = 0;
var livesLeft = 4;
var score = 0;
var level = 1;

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

// this will set the on and off state of the bricks or the 'true' or 'false' state of the brick in order to exist or not
function brickReset() {
  bricksLeft = 0;
  for(var i = 0; i<3 * BRICK_COLS; i++) {
    brickGrid[i] = false;
  }
  for(var i = 3 * BRICK_COLS; i < BRICK_COLS * BRICK_ROWS; i++) {
    brickGrid[i] = true;
    bricksLeft++; // every time we reset the game and create the brick grid, the counter code is ran and counts all the created bricks in the begginning.
  }
  // brickGrid[0] = false; // testing
}

function start() {
  $("canvas").fadeIn();
  // ALL THE FUNCTIONS SHOULD GO HERE! OTHERWISE IT DOESN'T RENDER!!!!!
  // Game loaded{
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', updateMousePos);

  brickReset();
  ballReset();
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

function ballMove() {
  var error = new Audio("./audio/error.m4a");
  var ballLost = new Audio("./audio/ball-lost.m4a");

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // this 'if' statements control the movement and the boundraries of the ball movement
  if (ballX < 0 && ballSpeedX < 0.0) {
    ballSpeedX *= -1;
  }

  if (ballX > canvas.width && ballSpeedX > 0.0) {
    ballSpeedX *= -1;
  }

  if (ballY + radius > canvas.height) {
    if (livesLeft > 0) {
      ballLost.play();
      ballReset();
      livesLeft--;
      $(".lives").html("Lives: " + livesLeft);
    } else if (livesLeft <= 0) {
      ballReset();
      brickReset();
      score = 0;
      livesLeft = 4;
      level = 1;
      $(".lives").html("Lives: " + livesLeft);
      $(".score").html("Score: " + score);
      $(".level").html("Level: " + level);
      error.play();
    }
  }

  if (ballY - radius < 0) {
    ballSpeedY = -ballSpeedY;
  }
}

function ballBrickHandling() {
  var audio = new Audio("./audio/beep.m4a");
  var ballBrickCol = Math.floor(ballX / BRICK_W) // setting variables for when the brick and the ball x points meet
  var ballBrickRow = Math.floor(ballY / BRICK_H) // setting  variable for when the brick and the ball y points meet.
  var ballCollision = rowColToArrayIndex(ballBrickCol, ballBrickRow); // setting up the array index of the brick when there's a 'collision'

  if(ballBrickCol >= 0 && ballBrickCol < BRICK_COLS && ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {
    if(brickGrid[ballCollision]) {

      brickGrid[ballCollision].BRICK_H = 10;
      brickGrid[ballCollision].BRICK_W = 40;
      brickGrid[ballCollision] = false;

      bricksLeft--;
      score++;
      $(".score").html("Score: " + score * 12);

      audio.play();

      var prevBallX = ballX - ballSpeedX;
      var prevBallY = ballY - ballSpeedY;
      var prevBrickCol = Math.floor( prevBallX / BRICK_W );
      var prevBrickRow = Math.floor( prevBallY / BRICK_H );

      if(prevBrickCol != ballBrickCol) {
        ballSpeedX *= -1;
      }

      if(prevBrickRow != ballBrickRow) {
        ballSpeedY *= -1;
      }
    }
  }
}

function ballPaddleHandling() {
  // this contorls the movement of the paddle with the mouse given the varibles created for the Paddle creation
  var paddle = new Audio("./audio/paddle.m4a");
  var levelUp = new Audio("./audio/level-up.m4a");

  var paddleTopEdgeY = canvas.height-PADDLE_DIST_FROM_EDGE;
  var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_HEIGHT;
  var paddleLeftEdgeX = paddleX;
  var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
  if (ballY > paddleTopEdgeY - radius &&             //bellow
    ballY < paddleBottomEdgeY - radius &&             //above
    ballX > paddleLeftEdgeX - radius &&               //left
    ballX < paddleRightEdgeX + radius ) {           //right
      ballSpeedY = -ballSpeedY;
      paddle.play();

    // this specifically refers that your mouse will contorl the CENTER of the mouse
    var centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
    var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
    ballSpeedX = ballDistFromPaddleCenterX * difficulty;

    if(bricksLeft == 0) {
      brickReset();
      levelUp.play();
      level++;
      $(".level").html("Level: " + level);
    }
  }
}

// this controls the movement of the ball, the paddle and the brick collision
function moveAll() {
  ballMove();
  ballBrickHandling();
  ballPaddleHandling ();
}

// This function will keep track of each brick's index by accounting for the Brick row, the colomumn that it's at.
function rowColToArrayIndex(col, row) {
  return col + BRICK_COLS * row;  // col = eachCol (the column within a row); row = eachRow; BRICK_COLS = the whole column of the array;
  // put the 'var Array Index here'
}

//this function calls colorRec() and test the logic to decide whether it should draw it or not
function drawBricks() {
  for(var eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
    for (var eachCol = 0; eachCol < BRICK_COLS; eachCol++) {

      var arrayIndex = rowColToArrayIndex(eachCol, eachRow)

      if(brickGrid[arrayIndex]) {
        colorRect(BRICK_W * eachCol, BRICK_H * eachRow, BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, '#FC5B1C')
      }
    }
  }
}

//Draws all of the objects
function drawAll() {
  colorRect(0, 0, canvas.width, canvas.height, 'black'); //clear screen

  colorCircle(ballX, ballY, radius, 'white') //draw ball

  colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_HEIGHT, '#8dff75') //draw paddle

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
