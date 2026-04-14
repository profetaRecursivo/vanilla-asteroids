export default class Bullet {
  constructor(x, y, vx, vy) {
    this.x  = x;
    this.y  = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = 4;
    this.alive  = true;
 
    this.sprite = this._loadSprite();
  }
 
  _loadSprite() {
    const img = new Image();
    img.src = "assets/sprites/bullet/bullet.png";
    return img;
  }
 
  update(dt, worldWidth, worldHeight) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
 
    if (
      this.x < -this.radius ||
      this.x > worldWidth  + this.radius ||
      this.y < -this.radius ||
      this.y > worldHeight + this.radius
    ) {
      this.alive = false;
    }
  }
 
  draw(ctx) {
    if (!this.alive) return;
    const d = this.radius * 2;
    ctx.save();
    ctx.drawImage(this.sprite, this.x - this.radius, this.y - this.radius, d, d);
    ctx.restore();
  }
}