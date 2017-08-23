function moveAll() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX + radius > canvas.width || ballX - radius < 0) {
    ballSpeedX = -ballSpeedX
  }

  if (ballY + radius > canvas.height) {
    ballSpeedY = -ballSpeedY
  }

  if (ballY - radius < 0) {
    ballSpeedY = -ballSpeedY;
  }
}
