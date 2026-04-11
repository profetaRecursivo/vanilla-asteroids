function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  update(deltaTime);
  draw();
  requestAnimationFrame(gameLoop);
}

canvas = document.getElementById("scenario");
ctx = canvas.getContext("2d");
requestAnimationFrame(gameLoop);