export class InputHandler {
  constructor(canvas, gameState, onShoot) {
    this.canvas = canvas;
    this.gameState = gameState;
    this.onShoot = onShoot;

    this._setupEventListeners();
  }

  _setupEventListeners() {
    this.canvas.addEventListener("mousemove", (e) => this._handleMouseMove(e));
    this.canvas.addEventListener("mousedown", () => this._handleMouseDown());
  }

  _handleMouseMove(event) {
    const rect = this.canvas.getBoundingClientRect();

    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    this.gameState.setMousePos(x, y);
  }

  _handleMouseDown() {
    if (this.gameState.gameOver) return;

    const bullet = this.gameState.shoot();
    if (bullet && this.onShoot) {
      this.onShoot();
    }
  }
}
