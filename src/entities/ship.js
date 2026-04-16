import Bullet from "./bullet.js";

export default class Ship {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.angle = 0;

    this.speed = 200;
    this.acceleration = 800;
    this.radius = 20;
    this.lives = 3;
    this.collisionCooldown = 0;

    this.sprite = this._loadSprite();

    this.keys = { w: false, a: false, s: false, d: false };

    this._onKeyDown = (e) => this._handleKey(e.key.toLowerCase(), true);
    this._onKeyUp = (e) => this._handleKey(e.key.toLowerCase(), false);
    window.addEventListener("keydown", this._onKeyDown);
    window.addEventListener("keyup", this._onKeyUp);
  }

  _loadSprite() {
    const img = new Image();
    img.src = "assets/sprites/ship/ship.png";
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
    if (this.collisionCooldown > 0) {
      this.collisionCooldown -= dt;

      if (this.collisionCooldown < 0) {
        this.collisionCooldown = 0;
      }
    }

    this.angle = this._angleToMouse(mousePos.x, mousePos.y);

    let ax = 0;
    let ay = 0;

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
    if (this.x < -this.radius) this.x = worldWidth + this.radius;
    if (this.x > worldWidth + this.radius) this.x = -this.radius;
    if (this.y < -this.radius) this.y = worldHeight + this.radius;
    if (this.y > worldHeight + this.radius) this.y = -this.radius;
  }

  shoot(mousePos) {
  // calculo dist de nave y mouse
  const dx = mousePos.x - this.x;
  const dy = mousePos.y - this.y;
  const distance = Math.hypot(dx, dy);

  const dirX = distance !== 0 ? dx / distance : 0;
  const dirY = distance !== 0 ? dy / distance : -1;

  const noseX = this.x + dirX * this.radius;
  const noseY = this.y + dirY * this.radius;

  const bulletSpeed = 600;
  const bvx = dirX * bulletSpeed;
  const bvy = dirY * bulletSpeed;

  return new Bullet(noseX, noseY, bvx, bvy);
}

  draw(ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle); // usa el angulo calculado par arotar
  const d = this.radius * 2;
  ctx.drawImage(this.sprite, -this.radius, -this.radius, d, d);
  ctx.restore();
}

  destroy() {
    window.removeEventListener("keydown", this._onKeyDown);
    window.removeEventListener("keyup", this._onKeyUp);
  }

  hurt() {
    if (this.lives <= 0) {
      return false;
    }

    this.lives--;

    return this.lives > 0;
  }
  _deactivateCollision() {
    this.collisionCooldown = 3;
  }

  reboot(width, height) {
    this.x = width / 2;
    this.y = height / 2;
    this.vx = 0;
    this.vy = 0;
    this._deactivateCollision();
  }

  isCollisionActivate() {
    return this.collisionCooldown <= 0;
  }
}
