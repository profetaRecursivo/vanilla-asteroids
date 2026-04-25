import Asteroid from "../entities/asteroid.js";
import Ship from "../entities/ship.js";
import Bullet from "../entities/bullet.js";
import { bullet_with_asteroid, ship_with_asteroid } from "../systems/collision.js";

export class GameState {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.ship = new Ship(canvasWidth / 2, canvasHeight / 2);
    this.asteroids = [];
    this.bullets = [];

    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.level = 1;

    this.asteroidsOnScreen = 10;
    this.mousePos = { x: 0, y: 0 };

    this.onScoreChanged = null;
    this.onLivesChanged = null;
    this.onAsteroidsChanged = null;
    this.onGameOver = null;
  }

  update(deltaTime) {
    if (this.gameOver) return;

    this.ship.update(deltaTime, this.canvasWidth, this.canvasHeight, this.mousePos);

    this.asteroids.forEach(asteroid =>
      asteroid.update(deltaTime, this.canvasWidth, this.canvasHeight)
    );

    this.bullets.forEach(bullet =>
      bullet.update(deltaTime, this.canvasWidth, this.canvasHeight)
    );

    this.bullets = this.bullets.filter(b => b.alive);

    this._checkCollisions();

    this._fillAsteroids();
  }

  _checkCollisions() {
    for (const asteroid of this.asteroids) {
      if (this.ship.isCollisionActivate() && ship_with_asteroid(this.ship, asteroid)) {
        this._handleShipHit();
        return;
      }
    }

    for (const bullet of this.bullets) {
      for (const asteroid of this.asteroids) {
        if (bullet_with_asteroid(bullet, asteroid)) {
          this._handleAsteroidHit(bullet, asteroid);
          break;
        }
      }
    }
  }

  _handleShipHit() {
    if (this.ship.hurt()) {
      this.lives--;
      if (this.onLivesChanged) this.onLivesChanged(this.lives);
      this.ship.reboot(this.canvasWidth, this.canvasHeight);
    } else {
      this.gameOver = true;
      this.asteroids = [];
      this.bullets = [];
      this.ship.destroy();
      if (this.onGameOver) this.onGameOver(this.score);
    }
  }

  _handleAsteroidHit(bullet, asteroid) {
    bullet.alive = false;

    this.score += asteroid.score();
    if (this.onScoreChanged) this.onScoreChanged(this.score);

    if (asteroid.size === "big" || asteroid.size === "medium") {
      const [first, second] = asteroid.divide();
      this.asteroids.push(first);
      this.asteroids.push(second);
    }

    this.asteroids = this.asteroids.filter(a => a !== asteroid);
    if (this.onAsteroidsChanged) this.onAsteroidsChanged(this.asteroids.length);
  }

  shoot() {
    const bullet = this.ship.shoot(this.mousePos);
    if (bullet) {
      this.bullets.push(bullet);
      return bullet;
    }
    return null;
  }

  _fillAsteroids() {
    const missingAsteroids = this.asteroidsOnScreen - this.asteroids.length;
    for (let i = 0; i < missingAsteroids; i++) {
      this.asteroids.push(this._createRandomAsteroid());
    }
  }
  _createRandomAsteroid() {
    const asteroidSizes = ["big", "medium", "small"];
    const size = asteroidSizes[Math.floor(Math.random() * asteroidSizes.length)];
    const edge = Math.floor(Math.random() * 4);

    let x = 0, y = 0;

    if (edge === 0) {
      // Arriba
      x = Math.random() * this.canvasWidth;
      y = 0;
    } else if (edge === 1) {
      // Derecha
      x = this.canvasWidth;
      y = Math.random() * this.canvasHeight;
    } else if (edge === 2) {
      // Abajo
      x = Math.random() * this.canvasWidth;
      y = this.canvasHeight;
    } else {
      // Izquierda
      x = 0;
      y = Math.random() * this.canvasHeight;
    }

    return new Asteroid(x, y, size);
  }

  init() {
    this.gameOver = false;
    this.score = 0;
    this.lives = 3;
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Ship(this.canvasWidth / 2, this.canvasHeight / 2);
    this._fillAsteroids();

    if (this.onLivesChanged) this.onLivesChanged(this.lives);
    if (this.onAsteroidsChanged) this.onAsteroidsChanged(this.asteroids.length);
  }

  setMousePos(x, y) {
    this.mousePos.x = x;
    this.mousePos.y = y;
  }
}
