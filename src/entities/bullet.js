export default class Bullet {
  constructor(x, y, vx, vy) {
    this.x  = x;
    this.y  = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = 4;
    this.alive  = true; // se pone en false cuando sale del canvas
 
    this.sprite = this._loadSprite();
  }
 
  _loadSprite() {
    const img = new Image();
    img.src = "assets/sprites/bullet.png"; // ajusta al path real
    return img;
  }
 
  /**
   * @returns {boolean} false si la bala salió del canvas (debe eliminarse)
   */
  update(dt, worldWidth, worldHeight) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
 
    // Sin wrap: se destruye al salir del límite
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