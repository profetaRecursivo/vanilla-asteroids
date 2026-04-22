//estado del juego
import Asteroid from "./entities/asteroid.js";
import Ship from "./entities/ship.js";
import Bullet from "./entities/bullet.js";
import {
  bullet_with_asteroid,
  ship_with_asteroid,
} from "./systems/collision.js";

const asteroidsOnScreen = 10;
//canvas
let canvas;
let ctx;
let asteroids = [];
let bullets = [];
let mousePos = { x: 0, y: 0 };
let ship;
let soundEffects;
let gameOver = false;
const level = 1; //de momento asi seteado para que luego haya el final boss :p

function handleMouseMove(e) {
  const rect = canvas.getBoundingClientRect();
  mousePos.x = e.clientX - rect.left;
  mousePos.y = e.clientY - rect.top;
}

function handleMouseDown() {
  if (gameOver) return;
  const bullet = ship.shoot(mousePos);
  if (bullet) {
    bullets.push(bullet);
    soundEffects.shoot();
  }
}

function createRandomAsteroid() {
  const asteroidSizes = ["big", "medium", "small"];
  const w = canvas.width;
  const h = canvas.height;
  const size = asteroidSizes[Math.floor(Math.random() * asteroidSizes.length)];
  const edge = Math.floor(Math.random() * 4);
  let x = 0,
    y = 0;
  if (edge === 0) {
    x = Math.random() * w;
    y = 0;
  } else if (edge === 1) {
    x = w;
    y = Math.random() * h;
  } else if (edge === 2) {
    x = Math.random() * w;
    y = h;
  } else {
    x = 0;
    y = Math.random() * h;
  }
  return new Asteroid(x, y, size);
}
function fillAsteroids() {
  const missingAsteroids = asteroidsOnScreen - asteroids.length;
  for (let i = 0; i < missingAsteroids; i++) {
    asteroids.push(createRandomAsteroid());
  }
}
export function update(deltaTime) {
  //fillAsteroids();
  if(gameOver)return;
  ship.update(deltaTime, canvas.width, canvas.height, mousePos);

  for (const asteroid of asteroids) {
    asteroid.update(deltaTime, canvas.width, canvas.height);
  }

  for (const bullet of bullets) {
    bullet.update(deltaTime, canvas.width, canvas.height);
  }
  bullets = bullets.filter((b) => b.alive);
  //despues de actualizar todo, chequeamos colisiones
  check_collisions();
}
function check_collisions() {
  for (const asteroid of asteroids) {
    if (ship.isCollisionActivate() && ship_with_asteroid(ship, asteroid)) {
      if (ship.hurt()) {
        soundEffects.hurt();
        ship.reboot(canvas.width, canvas.height);
      } else {
        soundEffects.gameOver();
        gameOver = true;
        asteroids = [];
        bullets = [];
        ship.destroy();
        return;
      }
    }
  }

  for (const bullet of bullets) {
    for (const asteroid of asteroids) {
      if (bullet_with_asteroid(bullet, asteroid)) {
        bullet.alive = false;

        if (asteroid.size === "big" || asteroid.size === "medium") {
          const [first, second] = asteroid.divide();
          asteroids.push(first);
          asteroids.push(second);
        }

        asteroids = asteroids.filter((a) => a !== asteroid);
        soundEffects.explosion();
        break;
      }
    }
  }
}

export function initGame(canvasElement, sounds) {
  gameOver = false;
  canvas = canvasElement;
  ctx = canvas.getContext("2d");
  soundEffects = sounds;
  asteroids = [];
  bullets = [];
  ship = new Ship(canvas.width / 2, canvas.height / 2);

  canvas.removeEventListener("mousemove", handleMouseMove);
  canvas.removeEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mousedown", handleMouseDown);
  fillAsteroids();
}

export function draw() {
  if (gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "40px 'Press Start 2P'";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);

    ctx.font = "16px 'Press Start 2P'";
    ctx.fillText(
      "Refresh to try again",//seria bonito un boton aquipero luego vemos
      canvas.width / 2,
      canvas.height / 2 + 35,
    );
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const asteroid of asteroids) {
    const d = asteroid.radius * 2;
    ctx.drawImage(
      asteroid.sprite,
      asteroid.x - asteroid.radius,
      asteroid.y - asteroid.radius,
      d,
      d,
    );
  }
  //dibujar la nave
  //dibujar las balas que aun esten en pantalla
  for (const bullet of bullets) {
    bullet.draw(ctx);
  }
  ship.draw(ctx);
}
