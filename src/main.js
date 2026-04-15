import { initGame, update, draw } from "./game.js";
import { Music } from "./audio/music.js";
import SoundEffect from "./audio/soundEffect.js";
const canvas = document.getElementById("scenario");
let lastTime = 0;
const bardockTheme = "./../../assets/background_music/bardock.mp3";
const titleMusic = new Music(bardockTheme);
const soundEffects = new SoundEffect(titleMusic.ctx);
function gameLoop(timestamp) {
  const deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  update(deltaTime);
  draw();
  requestAnimationFrame(gameLoop);
}

const playButton = document.getElementById("play-button");
playButton.onclick = async () => {
  //98 a 238
  titleMusic.stop();
  const gameMusic = new Music(bardockTheme);
  gameMusic.play(98, 238);
  await soundEffects.loadAll();
  initGame(canvas, soundEffects);
  requestAnimationFrame(gameLoop);
  //como oculto el boton?
  const home = document.getElementsByClassName("home");
  home[0].style.display = "none";
  const game_element = document.getElementsByClassName("game")[0];
  game_element.style.display = "block";
};

let musicStarted = false;

async function startMusicOnFirstGesture() {
  if (musicStarted) return;
  musicStarted = true;

  try {
    if (titleMusic.ctx.state === "suspended") {
      await titleMusic.ctx.resume();
    }
    titleMusic.play(2, 70);
  } catch (e) {
    console.error("no funciona la fokin musicaaaaaaa");
  }
}

["pointerdown", "keydown", "touchstart"].forEach((eventName) => {
  window.addEventListener(eventName, startMusicOnFirstGesture, {
    once: true,
    passive: true,
  });
});