//estado del juego
import Asteroid from "./entities/asteroid.js"
import Ship from "./entities/ship.js"
import Bullet from "./entities/bullet.js"

const asteroidsOnScreen = 10;
//canvas
let canvas;
let ctx;
let asteroids = [];
let bullets = [];
let mousePos = {x: 0, y: 0};
let ship;
const level = 1;//de momento asi seteado para que luego haya el final boss :p

function createRandomAsteroid(){
  const asteroidSizes = ["big", "medium", "small"];
	const w = canvas.width;
	const h = canvas.height;
	const size = asteroidSizes[Math.floor(Math.random()*asteroidSizes.length)];
	const edge = Math.floor(Math.random() * 4);
	let x = 0, y = 0;
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
function fillAsteroids(){
	const missingAsteroids = asteroidsOnScreen - asteroids.length;
	for(let i = 0; i<missingAsteroids; i++){
		asteroids.push(createRandomAsteroid());
	}
}
export function update(deltaTime){
	fillAsteroids();

	ship.update(deltaTime, canvas.width, canvas.height, mousePos);

	for(const asteroid of asteroids){
		asteroid.update(deltaTime, canvas.width, canvas.height);
	}
	
	for (const bullet of bullets) {
		bullet.update(deltaTime, canvas.width, canvas.height);
	}
	bullets = bullets.filter(b => b.alive);
}


export function initGame(canvasElement) {
    canvas = canvasElement;
    ctx = canvas.getContext("2d");
    asteroids = [];
    bullets = [];
    ship = new Ship(canvas.width / 2, canvas.height / 2);

    canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        mousePos.x = e.clientX - rect.left;
        mousePos.y = e.clientY - rect.top;
    });
    canvas.addEventListener("mousedown", () => {
        const bullet = ship.shoot(mousePos);
        if (bullet) bullets.push(bullet);
    });
}

export function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(const asteroid of asteroids){
		const d = asteroid.radius*2;
		ctx.drawImage(asteroid.sprite, asteroid.x - asteroid.radius, asteroid.y - asteroid.radius, d, d);
	}
	//dibujar la nave
	//dibujar las balas que aun esten en pantalla
	for (const bullet of bullets) {
		bullet.draw(ctx);
	}
	ship.draw(ctx);
}