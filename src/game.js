//estado del juego
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