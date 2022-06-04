
const ONE_SEG: number = 1000;

export default class CycleTimer {
  _name: string;
  startTime: number = 0;
  remaining: number = 0;
  timer: any = null;
  paused: boolean = false;
  resolveTimer: Function | null;
  _seconds: number;
  _callback: Function;

  constructor(name: string, seconds: number, callback: Function) {
    this._name = name;
    this._seconds = seconds;
    this._callback = callback;
  }

  init() {
    this.timer && this.clear();
    // Init Promise
    return new Promise((resolve: any) => {
      if (!this.resolveTimer) {
        this.resolveTimer = resolve;
      }
      this.timer = setInterval(() => this.run(), ONE_SEG)
    });
  }

  run() {
    if (this._seconds === ONE_SEG) {
      // Resolve Promise
      this.resolveTimer(true);
      return this.clear();
    }
    this.startTime = new Date().getTime();
    this._seconds = this._seconds - ONE_SEG;
    this._callback(this._seconds);
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