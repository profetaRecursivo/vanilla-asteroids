import { initGame, update, draw } from "./game.js";
const canvas = document.getElementById("scenario");
let lastTime = 0;

function gameLoop(timestamp) {
  const deltaTime = (timestamp - lastTime)/1000;
  lastTime = timestamp;
  
  update(deltaTime);
  draw();
  requestAnimationFrame(gameLoop);
}

const playButton = document.getElementById("play-button")
playButton.onclick = () => {
  initGame(canvas);
  requestAnimationFrame(gameLoop);
  //como oculto el boton?
  const home = document.getElementsByClassName("home")
  home[0].style.display = "none";
  const game_element = document.getElementsByClassName("game")[0];
  game_element.style.display = "block";
};