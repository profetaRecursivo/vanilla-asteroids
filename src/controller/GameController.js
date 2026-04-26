import { GameState } from "../model/GameState.js";
import { GameRenderer } from "../view/GameRenderer.js";
import { InputHandler } from "./InputHandler.js";

export class GameController {
  constructor(canvas, soundEffects) {
    this.canvas = canvas;
    this.soundEffects = soundEffects;


    this.gameState = new GameState(canvas.width, canvas.height);
    this.renderer = new GameRenderer(canvas);


    this.inputHandler = new InputHandler(
      canvas,
      this.gameState,
      () => this.soundEffects.shoot()
    );


    this._setupModelCallbacks();
  }

  _setupModelCallbacks() {
    this.gameState.onScoreChanged = (score) => this._updateScoreUI(score);
    this.gameState.onLivesChanged = (lives) => this._updateLivesUI(lives);
    this.gameState.onAsteroidsChanged = (count) => this._updateAsteroidsUI(count);
    this.gameState.onGameOver = (score) => {
      this.soundEffects.gameOver();
    };
  }

  update(deltaTime) {
    this.gameState.update(deltaTime);
  }

  render() {
    this.renderer.render(this.gameState);
  }

  init() {
    this.gameState.init();
  }

  _updateScoreUI(score) {
    const scoreElement = document.getElementById("score-value");
    if (scoreElement) {
      scoreElement.textContent = this._formatScore(score);
    }
  }

  _updateLivesUI(lives) {
    const livesElement = document.getElementById("lives-value");
    if (livesElement) {
      livesElement.textContent = lives;
    }
  }

  _updateAsteroidsUI(count) {
    const asteroidsElement = document.getElementById("asteroids-value");
    if (asteroidsElement) {
      asteroidsElement.textContent = count;
    }
  }

  _formatScore(score) {
    const scoreStr = score.toString();
    return scoreStr.padStart(6, "0");
  }
}
