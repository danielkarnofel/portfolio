// Art 185AI - Project #1
// Daniel Karnofel
// Digital Sculptor w/ Teachable Machine

// let inc = 0.25;
let detail = 40;
let levels = 50;
let x, y;
let xShift = 100;
let z = [];
let r = 100; // initial radius scale value
let a = [];
let b = [];
let change = 0.01;

let speed = levels / 500;

let d = -1;
let h = 0;

let margin = 200;

// - - - - - - - - - - - - - - - - - - - - 

function preload(){
  font = loadFont('../../fonts/Roboto-Regular.ttf');
  preloadModel();
}

// - - - - - - - - - - - - - - - - - - - - 

function canvasSize() {

  if(windowHeight > windowWidth) {
    r = windowWidth / 8;
    resizeCanvas(windowWidth-margin, (windowWidth-margin) * (3/4));
  } else {
    r = windowHeight / 8;
    resizeCanvas(windowHeight-margin, (windowHeight-margin) * (3/4));
  }
  
}

function windowResized() {

  canvasSize();

}

function setup() {

  let canvas = createCanvas(windowHeight-margin, (windowHeight-margin) * (3/4), WEBGL);
  canvas.parent("sketch-div");
  canvasSize();
  
  setupMachine();

  for (let i = 0; i <= levels; i++) {

    let lon = map(i, 0, levels, 0, TWO_PI);

    z[i] = map(lon, 0, TWO_PI, -r, r);

    a[i] = map(sin(lon), -1, 1, 0.1, 1);
    b[i] = map(cos(lon), -1, 1, 0.1, 1);

    // a[i] = 1;
    // b[i] = 1;

  }

}


// - - - - - - - - - - - - - - - - - - - - 

function draw() {

  background(50);
  
  camDisplay();
  
  rotateX(TWO_PI / 6);
  rotateZ(millis() / 5000);

  // - - - - - - - - - - - - - - - - - - - 

  if (h < 0) {
    d = 1
  } else if (h > levels) {
    d = -1
  }

  if(loaded == true){
    h += speed * d;
  }

  // - - - - - - - - - - - - - - - - - - - 
  
  if(label == 'no input'){
    a[floor(h)] += 0;
    b[floor(h)] += 0;
  } else if(label == 'horizontal in'){
    a[floor(h)] -= change;
    b[floor(h)] += 0;
  } else if(label == 'horizontal out'){
    a[floor(h)] += change;
    b[floor(h)] += 0;
  } else if(label == 'vertical in'){
    a[floor(h)] += 0;
    b[floor(h)] -= change;
  } else if(label == 'vertical out'){
    a[floor(h)] += 0;
    b[floor(h)] += change;
  }

  // a[floor(h)] += map(mouseX, 0, width, 0, change);
  // b[floor(h)] += map(mouseX, 0, height, 0, change);

  constrain(a[0], 0.1, 2);
  constrain(b[0], 0.1, 2);

  constrain(a[floor(h)], a[h - 1] - 1, a[h - 1] + 1);
  constrain(b[floor(h)], b[h - 1] - 1, b[h - 1] + 1);

  // - - - - - - - - - - - - - - - - - - - 

  fill(255, 100);
  stroke(0, 20);
  
  push();

  for (let i = 0; i < levels; i++) {

    // a[i] -= a[i]/5000;
    // b[i] -= b[i]/5000;

    beginShape();

    let lon = map(i, 0, levels, 0, TWO_PI);

    z[i] = map(lon, 0, TWO_PI, -r, r);

    for (let j = 0; j <= detail; j++) {

      let lon = map(j, 0, detail, 0, TWO_PI);

      x = a[i] * r * sin(lon);
      y = b[i] * r * cos(lon);

      vertex(x, y, z[i]);

    }

    endShape(CLOSE);

  }

  pop();

  // - - - - - - - - - - - - - - - - - - - 

  push();

  strokeWeight(2);
  stroke(255, 0, 0, 10);
  noFill();

  beginShape();

  for (let i = 0; i <= levels; i++) {

    let lon = map(i, 0, levels, 0, TWO_PI);

    x1 = a[floor(h)] * (r + 2) * sin(lon);
    y1 = b[floor(h)] * (r + 2) * cos(lon);
    z1 = map(h, 0, levels, -r, r);

    vertex(x1, y1, z1);

  }

  endShape(CLOSE);

  pop();

}


// - - - - - - - - - - - - - - - - - - - - 