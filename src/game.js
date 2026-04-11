//estado del juego
import Asteroid from "./entities/asteroid.js"

const asteroidsOnScreen = 10;
let gameState;
//canvas
let canvas;
let ctx;
//jugador
let score;
let highscore;
let lives;
let level;
//entidades
let ship;
let asteroids;
let bullets;
let particles;
//tiempo
let lastTime;

function initGame() {
	gameState = 'menu';
	score = 0;
	highscore = localStorage.getItem('highscore') || 0;
	lives = 3;
	level = 1;
	ship = null;
	asteroids = [];
	bullets = [];
	particles = [];
	lastTime = 0;
}

initGame();
//deberia de poner una funcion que meta una especie de valores a la lista de asteroides
function createRandomAsteroid(){
	//meter asteroides en posiciones y velocidades random en la pantalla
	//pero deberian de ser asteroides que aparezcan del borde de la pantalla
	//mockeamos por ahora
	return new Asteroid(10, 10, "medium");
}
function fillAsteroids(){
	const missingAsteroids = asteroidsOnScreen - asteroids.length;
	for(let i = 0; i<missingAsteroids; i++){
		asteroids.push(createRandomAsteroid());
	}
}
function update(deltaTime){
	fillAsteroids();
}