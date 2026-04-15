export default class SoundEffect {
  constructor(ctx) {
    this.ctx = ctx;
    this.buffers = new Map();
  }
  async load(name, src) {
    const data = await fetch(src).then((r) => r.arrayBuffer());
    const buffer = await this.ctx.decodeAudioData(data);
    this.buffers.set(name, buffer);
  }
  play(name, volume = 1) {
    const buffer = this.buffers.get(name);
    const source = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();

    source.buffer = buffer;
    gain.gain.value = volume;

    source.connect(gain);
    gain.connect(this.ctx.destination);
    source.start();
  }

  shoot() {
    this.play("shoot", 0.4);
  }

  explosion() {
    this.play("explosion", 0.7);
  }

  gameOver() {
    this.play("gameOver", 0.9);
  }

  hurt() {
    this.play("hurt", 0.7);
  }

  async loadAll() {
    await Promise.all([
      this.load("shoot", "assets/sounds/shoot.wav"),
      this.load("explosion", "assets/sounds/explosion.wav"),
      this.load("gameOver", "assets/sounds/game_over.wav"),
    ]);
  }
}