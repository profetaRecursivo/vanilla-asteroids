//estado del juego
import Asteroid from "./entities/asteroid.js"

const asteroidsOnScreen = 10;
//canvas
let canvas;
let ctx;
let asteroids = [];
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
	for(const asteroid of asteroids){
		asteroid.update(deltaTime, canvas.width, canvas.height);
	}
	
}


export function initGame(canvasElement){
	canvas = canvasElement;
	ctx = canvas.getContext("2d");
	asteroids = [];
	//falta poner lo de la nave aqui ojo
	//ship = new Ship();

}

export function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(const asteroid of asteroids){
		const d = asteroid.radius*2;
		ctx.drawImage(asteroid.sprite, asteroid.x - asteroid.radius, asteroid.y - asteroid.radius, d, d);
	}
	//dibujar la nave
	//dibujar las balas que aun esten en pantalla
	
}