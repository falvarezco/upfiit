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

    let usingWebAudio = true;

    try {
      if (typeof AudioContext !== 'undefined') {
        this.context = new AudioContext();
      } else if (typeof webkitAudioContext !== 'undefined') {
        this.context = new webkitAudioContext();
      } else {
        usingWebAudio = false;
      }
    } catch(e) {
      usingWebAudio = false;
    }
  
    // context state at this time is `undefined` in iOS8 Safari
    if (usingWebAudio && this.context.state === 'suspended') {
      var resume = function () {
        this.context.resume();

        setTimeout(function () {
          if (this.context.state === 'running') {
            document.body.removeEventListener('touchend', resume, false);
          }
        }, 0);
      };

      document.body.addEventListener('touchend', resume, false);
    }
    // window.AudioContext = window.AudioContext || window.webkitAudioContext;
    // this.context = new AudioContext();
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
      });
    }
    request.onerror = function() {console.log('BufferLoader: XHR error')};
    request.send();
  }

  playSound() {
    // creates a sound source
    var source = this.context.createBufferSource();   
    // tell the source which sound to play
    source.buffer = this.buffer;                      
    // connect the source to the context's destination (the speakers)
    source.connect(this.context.destination);        
    // Create a gain node
    const gainNode = this.context.createGain();     
    // Connect the source to the gain node
    source.connect(gainNode);                     
    // Connect the gain node to the destination
    gainNode.connect(this.context.destination);        
    // Set the volume
    gainNode.gain.value = this._volume;                  
    // play the source at the deisred time 0=now
    source.start(this._time);                           
  }
}