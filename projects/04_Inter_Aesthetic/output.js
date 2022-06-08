// visual output
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

let shape = '-';
let shapeSelected = false;

let n1, n2, n3;
let a, b, m;

let detail = 100;
let scl;

let r = [];
let v = [];

let rot;
let off = 0;

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

function visualize() {

  scl = height/3


  for (let j = 0; j < 5; j++) {

    v[j] = [];

    shape = Number(predictions[j]);

    shapeClass();

    for (let i = 0; i < detail; i++) {

      rot = map(confidence[j], 0, 1, 0, TWO_PI);

      let l = map(i, 0, detail, 0, TWO_PI) + rot;

      v[j][i] = supershape(l, a, b, m, n1, n2, n3) * confidence[j];

    }

  }

  // - - - - - - - - - - - - - - - - - - - - - - - - 

  push();
  translate(width / 2, height / 2);
  strokeWeight(2);
  stroke(255);
  fill(80);
  beginShape();

  for (let i = 0; i < detail; i++) {

    let l = map(i, 0, detail, 0, TWO_PI);

    r[i] = v[0][i] + v[1][i] + v[2][i] + v[3][i] + v[4][i];

    x = scl * r[i] * cos(l);
    y = scl * r[i] * sin(l);

    vertex(x, y);

  }

  endShape(CLOSE);
  pop();

  // - - - - - - - - - - - - - - - - - - - - - - - - 

  for (let j = 0; j < 5; j++) {

    v[j] = [];

    shape = Number(predictions[j]);

    shapeClass();

    push();
    translate(width/2, height/2);
    
    colorMode(HSB);
    stroke(map(j, 0, 4, 0, 255), 50, 100);
    noFill();

    beginShape();

    for (let i = 0; i < detail; i++) {
      
      rot = map(confidence[j], 0, 1, 0, TWO_PI);

      let l = map(i, 0, detail, 0, TWO_PI) + rot;

      v[j][i] = supershape(l, a, b, m, n1, n2, n3) * confidence[j];

      x = 0.75 * scl * v[j][i] * cos(l);
      y = 0.75 * scl * v[j][i] * sin(l);

      vertex(x, y);


    }

    endShape(CLOSE);

    pop();

  }

}

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

function outputDraw() {

  for (let i = 0; i < detail; i++) {

    let l = map(i, 0, detail, 0, TWO_PI);

    r[i] = supershape(l, a, b, m, n1, n2, n3);

  }

  push();
  translate(width / 2, height / 2);
  noStroke();
  fill(100);

  beginShape();
  for (let i = 0; i < detail; i++) {

    let l = map(i, 0, detail, 0, TWO_PI);
    x = scl * r[i] * cos(l);
    y = scl * r[i] * sin(l);

    vertex(x, y);

  }
  endShape(CLOSE);
  pop();

}
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

function shapeClass() {

  if (shape == 1) {

    n1 = 1;
    n2 = n1;
    n3 = n1;

    a = 0.7;
    b = 0.7;

    m = 8;

  } else if (shape == 2) {

    n1 = 0.45;
    n2 = n1;
    n3 = n1;

    a = 0.7;
    b = 0.7;

    m = 10;

  } else if (shape == 3) {

    n1 = 0.3;
    n2 = 1.7;
    n3 = 1.7;

    a = 0.95;
    b = 0.95;

    m = 6;


  } else if (shape == 4) {

    n1 = 800;
    n2 = 300;
    n3 = 300;

    a = 0.3;
    b = 0.3;

    m = 6;

  }
  if (shape == 5) {

    n1 = 40;
    n2 = 50;
    n3 = 70;

    a = 0.6;
    b = 0.6;

    m = 4;

  } else if (shape == '-') {

    n1 = 1;
    n2 = 1;
    n3 = 1;

    a = 1;
    b = 1;

    m = 0;

  }

}

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

function supershape(t, a, b, m, n1, n2, n3) {

  let t1 = abs((1 / a) * cos(m * t / 4));
  t1 = pow(t1, n2);

  let t2 = abs((1 / b) * sin(m * t / 4));
  t2 = pow(t2, n3);

  let t3 = t1 + t2;

  let r = constrain(pow(t3, -1 / n1), 0, 1);

  return r;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 