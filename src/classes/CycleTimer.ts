export default class CycleTimer {
  _name: string;
  startTime: number = 0;
  remaining: number = 0;
  timer: any = null;
  paused: boolean = false;
  _seconds: number;
  _callback: void;

  constructor(name, seconds) {
    this._name = name;
    this._seconds = seconds;
  }

  init() {
    this.timer && this.clear();
    this.timer = setInterval(() => this.run(), 1000)
  }

  run() {
    if (this._seconds === 0) {
      return this.clear();
    }
    this.startTime = new Date().getTime();
    this._seconds = this._seconds - 1000;
    console.log('TIME:', this._seconds);
  }

  pause() {
    if (!this.paused) {
      this.clear();
      this.remaining = new Date().getTime() - this.startTime;
      this.paused = true;
    }
  }

  resume() {
    if (this.paused) {
      if (this.remaining) {
        setTimeout(() => {
          this.paused = false;
          this.run();
          this.init();  
        }, this.remaining)
      } else {
        this.paused = false;
        this.init();
      }
    }
  }

  clear() {
    clearInterval(this.timer);
  }
}