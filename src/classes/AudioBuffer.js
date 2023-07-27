export default class AudioBuffer {
  context = null;
  buffer = null;
  source = null;
  _audioURL = null;
  _time = null;
  _volume = null;

  constructor(audioURL, time, volume) {
    this._audioURL = audioURL;
    this._time = time;
    this._volume = volume;
  }

  init() {
    this.createContext();
    this.loadSound();
  }

  createContext () {
    if (!window) return;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
  }

  loadSound() {
    var request = new XMLHttpRequest();
    request.open('GET', this._audioURL, true);
    request.responseType = 'arraybuffer';
    // Decode asynchronously
    request.onload = () => {
      this.context.decodeAudioData(request.response, (buffer) => {
          if (!buffer) {
              console.log('Error decoding file data: ' + _audioURL);
              return;
          }
          this.buffer = buffer;
          // this.source.connect(this.context.destination);  
      });
    }
    request.onerror = function() {console.log('BufferLoader: XHR error')};
    request.send();
  }

  playSound() {              
    var source = this.context.createBufferSource();   // creates a sound source
    source.buffer = this.buffer;                     // tell the source which sound to play
    source.connect(this.context.destination);          // connect the source to the context's destination (the speakers)
    const gainNode = this.context.createGain();          // Create a gain node
    source.connect(gainNode);                     // Connect the source to the gain node
    gainNode.connect(this.context.destination);        // Connect the gain node to the destination
    gainNode.gain.value = this._volume;                  // Set the volume
    source.start(this._time);                           // play the source at the deisred time 0=now    
  }

}