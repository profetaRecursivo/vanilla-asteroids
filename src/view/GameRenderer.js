export class GameRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  render(gameState) {
    this._clearScreen();

    if (gameState.gameOver) {
      this._drawGameOver(gameState.score);
    } else {
      this._drawGame(gameState);
    }
  }

  _clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  _drawGame(gameState) {
    for (const asteroid of gameState.asteroids) {
      this._drawAsteroid(asteroid);
    }

    for (const bullet of gameState.bullets) {
      this._drawBullet(bullet);
    }
    this._drawShip(gameState.ship);
  }

  _drawAsteroid(asteroid) {
    const d = asteroid.radius * 2;
    this.ctx.drawImage(
      asteroid.sprite,
      asteroid.x - asteroid.radius,
      asteroid.y - asteroid.radius,
      d,
      d
    );
  }

  _drawBullet(bullet) {
    if (!bullet.alive) return;

    this.ctx.save();
    this.ctx.fillStyle = "#ffffff";

    const pattern = [
      [false, true, false],
      [true, true, true],
      [false, true, false],
    ];

    const pixelSize = bullet.pixelSize;
    const startX = bullet.x - (3 * pixelSize) / 2;
    const startY = bullet.y - (3 * pixelSize) / 2;

    for (let row = 0; row < pattern.length; row++) {
      for (let col = 0; col < pattern[row].length; col++) {
        if (pattern[row][col]) {
          const px = startX + col * pixelSize;
          const py = startY + row * pixelSize;
          this.ctx.fillRect(px, py, pixelSize, pixelSize);
        }
      }
    }

    this.ctx.restore();
  }


  _drawShip(ship) {
    this.ctx.save();
    this.ctx.translate(ship.x, ship.y);
    this.ctx.rotate(ship.angle);

    const size = ship.radius * 2;
    this.ctx.drawImage(
      ship.sprite,
      -ship.radius,
      -ship.radius,
      size,
      size
    );

    this.ctx.restore();
  }

  _drawGameOver(score) {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.ctx.font = "40px 'Press Start 2P'";
    this.ctx.fillText("GAME OVER", this.canvas.width / 2, this.canvas.height / 2 - 20);

    this.ctx.font = "16px 'Press Start 2P'";
    this.ctx.fillText(
      "Refresh to try again",
      this.canvas.width / 2,
      this.canvas.height / 2 + 35
    );
  }
}
