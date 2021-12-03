// Art 102MM: Project #2
// Daniel Karnofel
// Expressive Robot

// - - - - - - - - - - 

let rX, rY;// robot coordinates
let rD = 50; // body size

let gH = []; // ground height array
 
let speed = 0; // initialize speed 
let sInc = 0.002; // speed increment
let jitter = 0; // leg movement

let value = 5; // expression variable

let energy = 100;
let fear = 0;
let love = 0;

let tL = 30; // lightning timer
let tMax = 120; // timer reset time
let t = tMax;

let roseX = -10;
let roseSpeed = 1;

let thunder, collect;

let skull, heart, lightning;

// - - - - - - - - - - 

function preload(){
  thunder = loadSound('data/thunder.mp3');
  collect = loadSound('data/collect.mp3');
  
  lightning = loadImage('data/lightning.png');
  skull = loadImage('data/skull.png');
  heart = loadImage('data/heart.png');
}

// - - - - - - - - - - 

function setup() {
  let window = windowWidth-200;
  var canvas = createCanvas(window, floor(window*.75));
  canvas.parent('sketch-div');
}

// - - - - - - - - - - 

function draw() {
  
  background(128,144,194);
  
  // draw ground w 1D noise
  push();
  stroke(194,178,128); // ground color (sand)
  let xoff = speed;
  for(let x = 0; x <= width; x++){
    xoff+=0.002; // ground roughness
    let n = noise(xoff);
    gH[x] = height - map(n, 0, 1, 20, 250);
    line(x, height, x, gH[x]);
  }
  speed+=sInc; // movement speed
  pop();
  
  
  // - - - - - - - - - - 
  // create robot body
  // - - - - - - - - - - 
  
  // locate body above ground
  rX = width/3;
  rY = gH[rX] - rD*(0.7);
  
  // connect legs to ground
  push();
  strokeWeight(5);
  let angle = 360; // first leg joint
  let scale = rD/2-5;
  for(let l = 0; l < 4; l++){
    let a = radians(angle);
    let lX = rX-cos(a)*scale;
    let lY = rY-sin(a)*scale;
    line(lX, lY, lX-5*cos(a)+jitter, gH[lX]+5);
    angle -= 60; // distance between joints
  }
  pop();
  
  // draw body
  push();
  strokeWeight(5);
  fill(150);
  circle(rX, rY, rD);
  pop();  
  
  
  
  // - - - - - - - - - - 
  // create emotions
  // - - - - - - - - - - 
  
  // emotion meters
  let base = height-20;
  
  // ENERGY
  push();
  stroke(0);
  colorMode(HSB);
  fill(energy, 255, 255);
  rect(20, base, 5, -energy);
  pop();
  image(lightning, 18, base+5, 10, 10);
  
  // - - - - - - - - - - 
  
  // FEAR
  push();
  stroke(1);
  colorMode(HSB);
  fill(fear, 255, 255);
  rect(40, base, 5, -fear);
  pop();
  image(skull, 38, base+5, 10, 10)
  
  // - - - - - - - - - - 
  
  // LOVE
  push();
  stroke(1);
  colorMode(HSB);
  fill(love, 255, 255);
  rect(60, base, 5, -love);
  pop();
  image(heart, 58, base+5, 10, 10)
  
  
  
  // - - - - - - - - - - 
  // face expression 
  // - - - - - - - - - - 
  
  if(value == 1){
    happy();
  } else if(value == 2){
    sad();
  } else if(value == 3){
    scared();
  } else if(value == 4){
    angry();
  } else if(value == 5){ 
    neutral(); 
  }
  value = key;
  
  
  
  if(love <= 90 && energy > 25){
    value = 4; // angry
  }
  
  if(fear>=20){
    fearInc = 0.25;
    value = 3; // scared
    sInc = 0;
    
  } else if(fear<20 && energy>1){
    fearInc = 0.01;
    sInc = 0.002;
  }
  
  if(fear>0){
    fear-=fearInc;
  }
  
  if(energy < 50 && energy > 1 && love <=91){
    value = 2; // sad
    push();
    textAlign(CENTER,CENTER);
    fill(255);
    text('oh no! battery low!', width/2, height/3);
    pop();
  }
  
  if(energy < 1){
    value = 5; // neutral
    sInc = 0;
    jitter = 0;
    
    // death message
    push();
    textAlign(CENTER,CENTER);
    fill(255);
    text('my lonely life is over ):', width/2, height/3);
    pop();
  }
  
  if(energy > 1 && sInc > 0 && love <91){
    energy -= 0.05;
    jitter = random(-2, 2);
  }
  
  if(love > 91){
    value = 1; // happy
    sInc = 0;
    jitter = 0;
    roseSpeed = 0;
    
    // victory message
    push();
    textAlign(CENTER,CENTER);
    fill(255);
    text('happiness achieved!', width/2, height/3);
    pop();
  }
  

  
  // - - - - - - - - - - 
  // interactivity
  // - - - - - - - - - - 
  
  // lightning!!
  
  // timer for lighting strike
  if(t < tL){
    if(t%2){
      fill(255,200);
    } else {
      fill(0,200);
    }
    rect(0,0,width,height);
  }
  
  // timer for fear
  if(t < tMax){
    fearInc = 0;
    t++;
  } else {
    fearInc = 0.25;
  }
  
  // - - - - - - - - - - 
  
  // roses of love
  
  if(roseX > -10 && sInc > 0){
    roseX -= roseSpeed;
  }
  
  let roseH = 15;
  let roseY = gH[int(roseX)]-roseH;
  
  push();
  strokeWeight(5);
  stroke(0,255,0);
  line(roseX, roseY+roseH, roseX, roseY);
  pop();
  
  push();
  fill(255, 0, 0);
  let petalSize = 10;
  circle(roseX+3, roseY+3, petalSize);
  circle(roseX-3, roseY+3, petalSize);
  circle(roseX+3, roseY-3, petalSize);
  circle(roseX-3, roseY-3, petalSize);
  pop();
  
  // pick up roses
  if(abs(roseX-rX) < rD/3){
    
    roseX = -10;
    
    love += 10;
    
    if(fear >= 10){
      fear -= 10;
    }
    
    collect.play();
    
  }
  
}

// - - - - - - - - - - 

function mouseClicked(){
  
  // click sky for lighting strike
  if(mouseY < gH[mouseX]){
    t = 0;
    sInc = 0;
    
    thunder.play();
    
    if(fear < 150){
      fear += 30;
    }
    
    if(energy < 100){
      energy += 10;
    }
  }
  
  
  // drop rose
  if(mouseY > gH[mouseX] && roseX < 0){
    roseX = width+1;
  }
  
}



// - - - - - - - - - - 
// face functions
// - - - - - - - - - -

function happy(){
  push();
  strokeWeight(2);
  fill(0);
  circle(rX-rD/4, rY+rD/20, rD/10)
  circle(rX+rD/4, rY+rD/20, rD/10)
  pop();
  
  push();
  strokeWeight(2);
  noFill();
  arc(rX, rY+rD/10, rD/7, rD/7, 0, PI);
  pop();
}
  
function sad(){
  push();
  strokeWeight(2);
  fill(0);
  arc(rX-rD/4, rY+rD/20, rD/10, rD/10, 0, PI);
  arc(rX+rD/4, rY+rD/20, rD/10, rD/10, 0, PI);
  pop();
  
  push();
  strokeWeight(2);
  noFill();
  arc(rX, rY+rD/6, rD/7, rD/7, PI, 0);
  pop();
}

function scared(){  
  push();
  strokeWeight(2);
  fill(0);
  circle(rX-rD/4, rY+rD/20, rD/5)
  circle(rX+rD/4, rY+rD/20, rD/5)
  pop();
  
  push();
  strokeWeight(2);
  fill(100);
  ellipse(rX, rY+rD/6, rD/5, rD/5);
  pop();
}

function angry(){
  push();
  strokeWeight(2);
  fill(0);
  arc(rX-rD/4, rY+rD/20, rD/8, rD/8, 0, radians(220), CHORD);
  arc(rX+rD/4, rY+rD/20, rD/8, rD/8, radians(320), PI, CHORD);
  pop();
  
  push();
  strokeWeight(2);
  noFill();
  arc(rX, rY+rD/6, rD/7, rD/7, PI, 0);
  pop();
}

function neutral(){
  push();
  strokeWeight(2);
  fill(0);
  circle(rX-rD/4, rY+rD/20, rD/10)
  circle(rX+rD/4, rY+rD/20, rD/10)
  pop();
  
  push();
  strokeWeight(2);
  noFill();
  line(rX-5, rY+rD/10, rX+5, rY+rD/10);
  pop();
}



