export default class Asteroid {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    const validSizes = ["big", "medium", "small"];
    this.size = validSizes.includes(size) ? size : "medium"; //puede ser small, big o medium
    const [vxr, vyr] = this.calculateSpeed();
    this.vx = vxr;
    this.vy = vyr;
    this.radius = this.calculateRadius();
    this.sprite = this.calculateSprite(Math.random() < 0.5 ? 1 : 2);
  }
  calculateRadius() {
    let radius;
    if (this.size === "big") {
      radius = 48;
    } else if (this.size === "medium") {
      radius = 28;
    } else {
      radius = 16;
    }
    return radius;
  }

  calculateSprite(value) {
    const img = new Image();
    if (this.size === "big") {
      img.src = `assets/sprites/asteroids/asteroid_big2.png`;
    } else if (this.size === "medium") {
      img.src = `assets/sprites/asteroids/asteroid_medium${value}.png`;
    } else {
      img.src = `assets/sprites/asteroids/asteroid_small${value}.png`;
    }
    return img;
  }
  calculateSpeed() {
    const angle = Math.random() * Math.PI * 2;

    let speed;
    if (this.size === "big") speed = 50;
    else if (this.size === "medium") speed = 80;
    else speed = 120;
    return [Math.cos(angle) * speed, Math.sin(angle) * speed];
  }
  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.wrap();
  }
  //se usa cuando sale de la pantalla, reaparece pero en su borde complemento
  wrap() {
    if (!canvas) return;
    if (this.x < -this.radius) {
      this.x = canvas.width + this.radius;
    }
    if (this.x > canvas.width) {
      this.x = -this.radius;
    }
    if (this.y < -this.radius) {
      this.y = canvas.height + this.radius;
    }
    if (this.y > canvas.height) {
      this.y = -this.radius;
    }
  }
}
