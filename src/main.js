import { initGame, update, draw } from "./game";
const canvas = getElementById("scenario");
let lastTime = 0;
initGame(canvas);

function gameLoop(timestamp) {
  const deltaTime = (timestamp - lastTime)/1000;
  lastTime = timestamp;

  update(deltaTime);
  draw();
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);