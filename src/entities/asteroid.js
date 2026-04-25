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

  update(dt, worldWidth, worldHeight) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.wrap(worldWidth, worldHeight);
  }

  wrap(worldWidth, worldHeight) {
    if (this.x < -this.radius) this.x = worldWidth + this.radius;
    if (this.x > worldWidth + this.radius) this.x = -this.radius;
    if (this.y < -this.radius) this.y = worldHeight + this.radius;
    if (this.y > worldHeight + this.radius) this.y = -this.radius;
  }
  divide() {
    if (this.size === "small") return null;
    const newSize = this.size === "big" ? "medium" : "small";
    const first = new Asteroid(this.x, this.y, newSize);
    const second = new Asteroid(this.x, this.y, newSize);
    const angle = Math.atan2(this.vy, this.vx);
    const speed = Math.sqrt(this.vx ** 2 + this.vy ** 2);
    const deviation = Math.PI / 6;
    const angle1 = angle - deviation;
    const angle2 = angle + deviation;
    first.vx = Math.cos(angle1) * speed;
    first.vy = Math.sin(angle1) * speed;
    second.vx = Math.cos(angle2) * speed;
    second.vy = Math.sin(angle2) * speed;
    return [first, second];
  }
  score() {
    let ans;
    if (this.size === "big") {
      ans = 2048;
    } else if (this.size === "medium") {
      ans = 1024;
    } else {
      ans = 512;
    }
    return ans;
  }
}
