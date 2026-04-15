export default class Bullet {
  constructor(x, y, vx, vy) {
    this.x  = x;
    this.y  = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = 4;
    this.alive  = true;
    this.pixelSize = 2;
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
    
    ctx.save();
    ctx.fillStyle = "#ffffff";

    const pattern = [
      [false, true, false],
      [true, true, true],
      [false, true, false]
    ];
    
    const pixelSize = this.pixelSize;
    const startX = this.x - (3 * pixelSize) / 2;
    const startY = this.y - (3 * pixelSize) / 2;
    
    for (let row = 0; row < pattern.length; row++) {
      for (let col = 0; col < pattern[row].length; col++) {
        if (pattern[row][col]) {
          const px = startX + col * pixelSize;
          const py = startY + row * pixelSize;
          ctx.fillRect(px, py, pixelSize, pixelSize);
        }
      }
    }
    
    ctx.restore();
  }
}