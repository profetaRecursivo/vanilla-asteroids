export default class Ship {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.angle = 0;

    this.speed = 250;
    this.acceleration = 400;
    this.friction = 0.92;
    this.rotationSpeed = 3;

    this.radius = 20;

    this.sprite = this._loadSprite();

    this.keys = { w: false, a: false, s: false, d: false };

    this._onKeyDown = (e) => this._handleKey(e.key.toLowerCase(), true);
    this._onKeyUp   = (e) => this._handleKey(e.key.toLowerCase(), false);
    window.addEventListener("keydown", this._onKeyDown);
    window.addEventListener("keyup",   this._onKeyUp);
  }

  _loadSprite() {
    const img = new Image();
    img.src = "assets/sprites/ship.png";
    return img;
  }

  _handleKey(key, pressed) {
    if (key === "w" || key === "a" || key === "s" || key === "d") {
      this.keys[key] = pressed;
    }
  }

  _angleToMouse(mouseX, mouseY) {
    return Math.atan2(mouseY - this.y, mouseX - this.x) + Math.PI / 2;
  }

  update(dt, worldWidth, worldHeight, mousePos) {
    this.angle = this._angleToMouse(mousePos.x, mousePos.y);

    let ax = 0, ay = 0;
    if (this.keys.w) ay -= this.acceleration;
    if (this.keys.s) ay += this.acceleration;
    if (this.keys.a) ax -= this.acceleration;
    if (this.keys.d) ax += this.acceleration;

    if (ax !== 0 && ay !== 0) {
      const inv = 1 / Math.SQRT2;
      ax *= inv;
      ay *= inv;
    }

    this.vx += ax * dt;
    this.vy += ay * dt;

    this.vx *= Math.pow(this.friction, dt * 60);
    this.vy *= Math.pow(this.friction, dt * 60);

    const spd = Math.hypot(this.vx, this.vy);
    if (spd > this.speed) {
      this.vx = (this.vx / spd) * this.speed;
      this.vy = (this.vy / spd) * this.speed;
    }

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    this.wrap(worldWidth, worldHeight);
  }

  wrap(worldWidth, worldHeight) {
    if (this.x < -this.radius) this.x = worldWidth  + this.radius;
    if (this.x > worldWidth  + this.radius) this.x = -this.radius;
    if (this.y < -this.radius) this.y = worldHeight + this.radius;
    if (this.y > worldHeight + this.radius) this.y = -this.radius;
  }

  shoot() {
    const tipX = this.x - Math.sin(this.angle) * -(this.radius); // simplificado abajo
    const tipY = this.y - Math.cos(this.angle) * -(this.radius);

    const bulletSpeed = 600; // px/s
    const bvx = -Math.sin(this.angle - Math.PI) * bulletSpeed;
    const bvy = -Math.cos(this.angle - Math.PI) * bulletSpeed;

    const noseX = this.x + Math.sin(this.angle - Math.PI) * this.radius;
    const noseY = this.y - Math.cos(this.angle - Math.PI) * this.radius;

    return new Bullet(noseX, noseY, bvx, bvy);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    const d = this.radius * 2;
    ctx.drawImage(this.sprite, -this.radius, -this.radius, d, d);
    ctx.restore();
  }

  destroy() {
    window.removeEventListener("keydown", this._onKeyDown);
    window.removeEventListener("keyup",   this._onKeyUp);
  }
}
