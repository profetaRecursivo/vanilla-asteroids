//./../../assets/background_music/bardock.mp3
export class Music {
  constructor(src) {
    this.src = src;
    this.ctx = new AudioContext();
    this.isPlaying = false;
  }
  play(begin, end) {
    fetch(this.src)
      .then((res) => res.arrayBuffer())
      .then((data) => this.ctx.decodeAudioData(data))
      .then((buffer) => {
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;

        source.loop = true;
        source.loopStart = begin;
        source.loopEnd = end;

        source.connect(this.ctx.destination);
        source.start(0, begin);

        this.source = source;
        this.isPlaying = true;
      })
      .catch(() => {
        this.isPlaying = false;
      });
  }
  stop() {
    if (this.isPlaying && this.source) {
      this.source.stop();
      this.source = null;
      this.isPlaying = false;
    }
  }
}