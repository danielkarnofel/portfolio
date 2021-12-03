// Visual Output Experiment
// Daniel Karnofel
// - - - - - - - - - - - - - - - - - - - - 

let n = 30;
let x, y;
let scl = 300;

// - - - - - - - - - - - - - - - - - - - - 

function setup() {

  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('sketch-div');
  noCursor();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
}

// - - - - - - - - - - - - - - - - - - - - 

function draw() {

  background(10, 10, 10);

  translate(0, 0, 50);
  rotateX(millis()/2000);

  strokeWeight(3);

  for (let i = 0; i < n; i++) {
    
    let s = map(i, 0, n, 0, TWO_PI);

    let a = map(mouseX, 0, width, 0.1, 3);
    let b = map(mouseY, 0, height, 0.1, 3);
    
    for(let j = 0; j < n; j++){

      let t = map(j, 0, n, 0, TWO_PI);
      
      r = scl * cos(a*t)*sin(b*s);
      
      x = r * sin(s) * cos(t);
      y = r * sin(s) * sin(t);
      z = r * cos(s);

      stroke(map(z, 0, width, 255, 0));
      
      point(x, y, z);
      
    }

  }

}

// - - - - - - - - - - - - - - - - - - - - 
