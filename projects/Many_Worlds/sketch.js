// Art 102MM - Final Project
// Higher Dimensional Geometries - v3.0
// Daniel Karnofel
// - - - - - - - - - - - - - - - - - - - - 

// switches
let r = 200;
let detail = 20;

let start = false;
let showInfo = false;
let button;

let infoText = "Many Worlds explores the idea of higher dimensional space and geometry through an intuitive exploratory shape generator. ";
    infoText += "Each generated 3D shape is just one of thousands of 'slices' composing a shape that exists in 6 dimensions. ";
    infoText += "By exploring the many possible 3D 'slices' the user can gain an intuition of the extension of this shape into the higher dimensions. ";
    infoText += "The 3 familiar spatial dimensions are represented by the width, height, and depth of the visible 3D shape, while the remaining 3 dimensions are expressed by mouse movement and cyclical time. ";
    infoText += "The generated geometry in this project is created with the superformula proposed by Johan Gielis, a generalization of the superellipse. ";

// - - - - - - - - - - - - - - - - - - - - 

function preload(){

  font1 = loadFont('/fonts/Raleway-ExtraBold.ttf');
  font2 = loadFont('/fonts/Roboto-Regular.ttf');

}

// - - - - - - - - - - - - - - - - - - - - 

function setup() {

  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('sketch-div');
  
  // createCanvas(windowWidth, windowHeight, WEBGL);

  cursor(CROSS);

  // replace w/ ux:
  
  // supershape 1 parameters:
  n1 = 1; 
  n2 = 1; 
  n3 = 1;
  a1 = 1; 
  b1 = 1; 
  m1 = 4;

  // supershape 2 parameters:
  n4 = 1;
  n5 = 1;
  n6 = 1;
  a2 = 1;
  b2 = 1;
  m2 = 4;

  // supershape 3 parameters:
  n7 = 1; 
  n8 = 1; 
  n9 = 1;
  a3 = 1;
  b3 = 1;
  m3 = 0;

  // - - - - - - - - - - 
  // create buttons:

  startButton = createButton('start');
  startButton.parent('button');
  startButton.size(50, AUTO);
  startButton.mousePressed(startUp);

  endButton = createButton('end');
  endButton.parent('button');
  endButton.size(50, AUTO);
  endButton.mousePressed(restart);
  endButton.hide();
  
  infoButton = createButton('info');
  infoButton.parent('button');
  infoButton.size(50, AUTO);
  infoButton.mousePressed(info);

}

// - - - - - - - - - - - - - - - - - - - - 

function startUp(){

  start = true;
  showInfo = false;

  startButton.hide();
  infoButton.hide();

  endButton.show();

  setupSound();

}

function info(){

  if(showInfo){showInfo=false}
  else if(!showInfo){showInfo=true}

}

function restart(){

  start = false;
  let info = false;

  endButton.hide();

  startButton.show();
  infoButton.show();

  stopSound();

}

// - - - - - - - - - - - - - - - - - - - - 

function draw() {
  
  colorMode(RGB);
  background(230, 237, 236);

  // line(0, -height/2, 0, height/2);

  startButton.position(width/2-18, height/2+70);
  endButton.position(50, 50);
  infoButton.position(width/2-18, height/2+100);

  // - - - - - - - - - - 

  if(showInfo == true && start == false){

    push();
    textSize(15);
    textLeading(20);
    textFont(font2);
    textAlign(LEFT, TOP);

    colorMode(RGB);
    fill(100);
    text(infoText, -300, 150, 600, 230);
    pop();

  }
  
  // - - - - - - - - - - 

  if(start == false){
    // - - - - - - - - - - - - - - - - - - - - 
  
    wavyTitle();

  } else if(start == true) {

    createShape();
  
    playSound();
  
    lighting();

    shapeCo();
  
    drawShape();

    outlines();

  }
  
}

// - - - - - - - - - - - - - - - - - - - - 

function shapeCo(){

  push();

  textSize(15);
  textFont(font2);
  textAlign(LEFT, CENTER);

  colorMode(RGB);
  fill(100);

  push();

  let c1 = round(m1, 2);
  let c2 = round(m2, 2);
  let c3 = round(map(l3, 0, PI, 0, 10), 2);

  text('v:', -70, height/2-25);
  text('w:', -70, height/2-45);
  text('t:', -70, height/2-65);

  text(c1, -50, height/2-25);
  text(c2, -50, height/2-45);
  text(c3, -50, height/2-65);

  pop();

  // - - - - - - - - - - 

  push();
  textSize(15);
  textAlign(CENTER, CENTER);
  text('higher dimensional coordinates:', 0, height/2-90);
  pop();

  pop();

  // - - - - - - - - - - 

  push();

  colorMode(RGB);

  translate(30, height/2-45);

  // rotateX(-PI/8);
  rotateY(PI/10);

  let size = 35;
  let tC = map(PI/2 - l3, PI/2, -PI/2, 0, PI);
  let t = map(tC, 0, PI, -size/2+1, size/2-1, true);
  let v = map(mouseX, 0, width, -size/2+1, size/2-1, true);
  let w = map(mouseY, 0, height, -size/2+1, size/2-1, true);
  
  push();
  strokeWeight(7);
  stroke(50, 50, 0, 30);
  point(v, w, t);
  pop();
  
  push();
  translate(0, 0, t);
  noStroke();
  fill(0, 0, 200, 100);
  plane(size, size);
  pop();
  
  push();
  stroke(0, 100);
  fill(200, 0, 200, 50);
  box(size);
  pop();

  pop();

}

// - - - - - - - - - - - - - - - - - - - - 

function outlines(){

	// - - - - - - - - - - - - - - - - - - - - 
	// supershape outlines

	push();

	let oRad = 50;

	noFill();
	stroke(50);
	strokeWeight(0.5);

	// - - - - - - - - - - - - - - - 

	push();

	translate(-width/2+1.5*oRad, height/2-1.5*oRad);
	beginShape();
	for(let i = 0; i < detail; i++){

		let lat = map(i, 0, detail, 0, TWO_PI);
    	x = oRad * r1[i] * cos(lat);
    	y = oRad * r1[i] * sin(lat);

    	vertex(x, y, 0);

  	}
  	endShape(CLOSE);
  	pop();

	// - - - - - - - - - - - - - - - 

	push();

	translate(width/2-1.5*oRad, height/2-1.5*oRad);
	beginShape();
	for(let i = 0; i < detail; i++){

	    let lat = map(i, 0, detail, 0, TWO_PI);
	    x = oRad * r2[i] * cos(lat);
	    y = oRad * r2[i] * sin(lat);

	    vertex(x, y, 0);

	}
	endShape(CLOSE);
	pop();

	// - - - - - - - - - - - - - - - 

	push();

	translate(0, height/2-1.5*oRad);
	beginShape();
	for(let i = 0; i < detail; i++){

		let lat = map(i, 0, detail, 0, TWO_PI);
    	x = oRad * r3[i] * cos(lat);
    	y = oRad * r3[i] * sin(lat);

    	vertex(x, y, 0);

  	}
  	endShape(CLOSE);
  	pop();

  	pop();


}

// vector array
let shape = [];
let x, y, z;

// radius arrays
let r1 = [];
let r2 = [];
let r3 = [];

let l1, l2, l3;

// - - - - - - - - - - - - - - - - - - - - 

function createShape(){

  // morph controls
  m1 = map(mouseX, 0, width, 0, 10, true);
  m2 = map(mouseY, 0, height, 0, 10, true);
  
  
  // create vector array
  for(let i = 0; i< detail+1; i++){
    
    shape[i] = [];
    
    // r3[i] = [];
    
    l1 = map(i, 0, detail, -PI, PI);
    
    r1[i] = supershape1(l1, a1, b1, m1, n1, n2, n3);
    
    for(let j = 0; j < detail+1; j++){
      
      l2 = map(j, 0, detail, -PI, PI);
      
      r2[j] = supershape2(l2, a2, b2, m2, n4, n5, n6);
      
      let k = sin(millis()/5000);
        
      l3 = map(k, -1, 1, 0, PI);
      
      m3 = abs(map(j, 0, detail, -10, 10));
      
      r3[k] = supershape3(l3, a3, b3, m3, n7, n8, n9);
      
      x = r * r3[k]*cos(l3) * r2[j]*cos(l2) * r1[i]*cos(l1);
      y = r * r3[k]*cos(l3) * r2[j]*cos(l2) * r1[i]*sin(l1);
      z = r * r3[k]*cos(l3) * r2[j]*sin(l2);
      
      shape[i][j] = createVector(x, y, z);
      
    }
  }

}

// - - - - - - - - - - - - - - - - - - - - 

function drawShape(){

  // draw shape
  // - - - - - - - - - - 
  
  push();
  
  // rotation: 
  rotateX(PI/3);
  rotateZ(millis()/1500);
  
  for(let i = 0; i < detail; i++){
    
    beginShape(TRIANGLE_STRIP);
    
    for(let j = 0; j < detail+1; j++){

      noStroke();
         
      let v1 = shape[i][j];
      vertex(v1.x, v1.y, v1.z);
      
      let v2 = shape[i+1][j];
      vertex(v2.x, v2.y, v2.z);
      
    }  
    
    endShape();
    
  }
  
  pop();

}

// - - - - - - - - - - - - - - - - - - - - 

function lighting(){

  // lighting & material:
  // - - - - - - - - - - 

  colorMode(RGB);
  
  specularMaterial(255, 255, 255);

  colorMode(HSB);
  
  // back light:
  pointLight(10, 255, 120, -r/2, -1.5*r, -2*r);
  
  // key light:
  pointLight(250, 255, 240, 2*r, -2*r, r);
  
  // fill light:
  pointLight(90, 255, 180, -2*r, -r, r);

  shininess(20);

  
  

}

// - - - - - - - - - - - - - - - - - - - - 

// Sound Generation

let osc = [];
let freq = [];
let mag = [];

let waves = 8;

// - - - - - - - - - - - - - - - - - - - - 

function setupSound(){
  
  for(let i = 0; i < waves; i++){
    
    osc[i] = [];
    freq[i] = [];
    mag[i] = [];
    
    for(let j = 0; j < waves; j++){
      
      osc[i][j] = new p5.Oscillator('sine');
    
      osc[i][j].freq(0);
      osc[i][j].amp(0.1);
  
      osc[i][j].start();
      
    }   
  }
  
}

// - - - - - - - - - - 

function playSound(){
  
  for(let i = 0; i < waves; i++){
    
    let s = floor(map(i, 0, waves, 0, detail));
    
    for(let j = 0; j < waves; j++){
      
      let t = floor(map(j, 0, waves, 0, detail));
      
      mag[i][j] = shape[s][t].mag()/r;
      
      freq[i][j] = map(mag[i][j], 0, 1, 75, 300);
      
      osc[i][j].freq(freq[i][j], 0.1);
      
    }
  }
  
}

function stopSound(){

  for(let i = 0; i < waves; i++){
    
    for(let j = 0; j < waves; j++){
  
      osc[i][j].stop();
      
    }   
  }

}


// supershape 1 parameters:
let n1, n2, n3;
let a1, b1, m1;

// supershape 2 parameters:
let n4, n5, n6;
let a2, b2, m2;

// supershape 3 parameters:
let n7, n8, n9;
let a3, b3, m3;

// - - - - - - - - - - - - - - - - - - - - 

function supershape1(t, a1, b1, m1, n1, n2, n3){
  
  let t1 = abs((1/a1) * cos(m1*t/4));
  t1 = pow(t1, n2);
  
  let t2 = abs((1/b1) * sin(m1*t/4));
  t2 = pow(t2, n3);
  
  let t3 = t1 + t2;
  
  let r1 = constrain(pow(t3, -1 / n1), 0, 1);

  return r1;
  
}

// - - - - - - - - - - - - - - - - - - - - 

function supershape2(t, a2, b2, m2, n4, n5, n6){
  
  let t1 = abs((1/a2) * cos(m2*t/4));
  t1 = pow(t1, n5);
  
  let t2 = abs((1/b2) * sin(m2*t/4));
  t2 = pow(t2, n6);
  
  let t3 = t1 + t2;
  
  let r2 = constrain(pow(t3, -1 / n4), 0, 1);

  return r2;
  
}

// - - - - - - - - - - - - - - - - - - - - 

function supershape3(t, a3, b3, m3, n7, n8, n9){
  
  let t1 = abs((1/a3) * cos(m3*t/4));
  t1 = pow(t1, n8);
  
  let t2 = abs((1/b3) * sin(m3*t/4));
  t2 = pow(t2, n9);
  
  let t3 = t1 + t2;
  
  let r3 = constrain(pow(t3, -1 / n7), 0, 1);

  return r3;
  
}

let title = 'MANY  WORLDS';
let tx, ty;

function wavyTitle(){

    textFont(font1);
    textAlign(CENTER, CENTER);

    textSize(60);

    let scl = 2;
    let rate;
    
    push();
    rate = 600;
    tx = scl*sin(millis()/rate);
    ty = scl*cos(millis()/rate);
    translate(tx, ty);
    fill(255, 0, 0, 100);
    text(title, 0, -50);
    pop();
    
    push();
    rate = 500;
    tx = scl*sin(millis()/rate+PI/3);
    ty = scl*cos(millis()/rate+1);
    translate(tx, ty);
    fill(0, 255, 0, 90);
    text(title, 0, -50);
    pop();
    
    push();
    rate = 400;
    tx = scl*sin(millis()/rate+TWO_PI/3);
    ty = scl*cos(millis()/rate+2);
    translate(tx, ty);
    fill(0, 0, 255, 80);
    text(title, 0, -50);
    pop();

    // - - - - - - - - - - 

    push();
    textSize(15);
    textFont(font2);
    textAlign(CENTER, CENTER);
    fill(100);
    text('an explorable higher dimensional shape', 0, 0);
    pop();

    // - - - - - - - - - - 

    push();
    textSize(10);
    textFont(font2);
    textAlign(CENTER, CENTER);
    fill(100);
    text('created by Daniel Karnofel', 0, 25);
    pop();

}








