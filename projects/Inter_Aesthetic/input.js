// sound input
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

let n = 5;
let points = [];
let notes = [];

let baseFreq = 220;

let modMaxFreq = 300;
let modMaxDepth = 150;

let playing = false;

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

function inputDraw() {

  if (state == 'collection' || state == 'prediction') {

    for (let i = 0; i < points.length; i++) {

      if (i > 0) {

        push();
        stroke(255, 0, 0);
        line(points[i].x, points[i].y, points[i - 1].x, points[i - 1].y);
        pop();

      }
    }

    for (let i = 0; i < points.length; i++) {

      points[i].display();

      notes[i].modFreq = map(points[i].y, 0, height, 0, modMaxFreq);

      notes[i].modDepth = map(points[i].x, 0, width, -modMaxDepth, modMaxDepth);

      notes[i].play();

    }

  }

}

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

class Point {

  constructor(x, y) {

    this.x = constrain(mouseX, 0, width);
    this.y = constrain(mouseY, 0, height);

  }

  display() {

    push();
    stroke(100);
    ellipse(this.x, this.y, 10);
    pop();

  }

}

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

class Note {

  constructor(carrier, modulator, modFreq, modDepth) {

    this.carrier = new p5.Oscillator('sine');
    this.carrier.amp(0);
    this.carrier.freq(baseFreq);

    this.modulator = new p5.Oscillator('sawtooth');
    
    this.modulator.disconnect();
    this.carrier.freq(this.modulator);

    this.modFreq = this.modFreq;
    this.modDepth = this.modDepth;

  }

  play() {

    this.carrier.amp(0.4);

    this.modulator.freq(this.modFreq);

    this.modulator.amp(this.modDepth);

  }

}

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 