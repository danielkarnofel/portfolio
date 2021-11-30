// Art 102MM - Project #3
// Covid Destroyer Game v2.0
// Daniel Karnofel

// images made in Illustrator

// - - - - - - - - - - - - - - - - - - - - 
// declare global variables

// image variables
let laser, virus;

// font variables
let marker, roboto;

// create array of virus mobs
let mobs = [];
let num = 5; // # of mobs

// castle variables
let wallSize = 70; // 
let wallLife = 25; // 

// laser variables
let laserX, laserY;
let fire;

// laser sound
let osc, freq, amp, mod;

// game variables
let score, playing;

// - - - - - - - - - - - - - - - - - - - - 

function preload(){
  
  // load images
  laser = loadImage('images/laser_cannon.png');
  virus = loadImage('imagesvirus.png');
  
  // load fonts
  marker = loadFont('fonts/PermanentMarker-Regular.ttf');
  roboto = loadFont('fonts/Roboto-Regular.ttf');

}

// - - - - - - - - - - - - - - - - - - - - 

function setup() {
  var canvas = createCanvas(450, 600);
  canvas.parent('sketch-div');
  
  cursor(CROSS);
  
  // laser sound
  canvas.mousePressed(laserSound);
  osc = new p5.Oscillator('sine');
  mod = 0;
  
  // create virus mobs
  for(let i = 0; i < num; i++){
    mobs.push(new Virus());
  }
  
  score = 0;
  playing = false;
}

// - - - - - - - - - - - - - - - - - - - - 

function draw() {
  background(80, 100, 50);
  
  // draw virus mobs
  for(let i = 0; i < mobs.length; i++){
    mobs[i].move();
    mobs[i].damage();
    mobs[i].attack();
    mobs[i].display();
  }
  
  // - - - - - - - - - - - - - - - - - - - - 
  
  // draw castle
  createCastle();
  
  // - - - - - - - - - - - - - - - - - - - - 
  
  // draw laser cannon
  createLaser();
  
  // laser sound
  if(fire){
    osc.freq(freq, 0.1);
    osc.amp(0.5, 0.1);
  }
  
  // game messages
  messages();
  
}

// - - - - - - - - - - - - - - - - - - - - 

// interactivity

// function keyPressed(){
  
//   if(playing == false){
    
//     playing = true;
    
//   }
  
// }

function mousePressed(){

  if(playing == false){
    
    playing = true;
    
  }
  
  fire = true;
  
  if(wallLife <= 0){
    
    wallLife = 25;
    score = 0;
    playing = false;
    
    for(let i = 0; i < mobs.length; i++){
      
      mobs[i].x = random(width);
      mobs[i].y = random(-25, -height);
      mobs[i].speed = 0;
      
      
    }
    
  }
  
}

function mouseReleased(){
  
  fire = false;
  
  osc.amp(0, 0.5);
  
}

// - - - - - - - - - - - - - - - - - - - - 

// virus class
class Virus{
  
  constructor(){
    this.x = random(width);
    this.y = random(-50, -height);
    this.size = 50;
    this.speed = 0;
    this.hp = 20;
    this.hit = false;
  }
  
  // - - - - - - - - - - - - - - - - - - - - 
  
  move(){
    
    if(this.hp > 0){
      
      this.y += this.speed;
      
      this.x += random(-1, 1);
      
    }   
    
    if(playing == true){
      this.speed = 1 + score/20;
    } else {
      this.speed = 0;
    }
    
    
  }
  
  // - - - - - - - - - - - - - - - - - - - - 
  
  damage(){
    
    // get laser beam line equation
    let lX = mouseX - laserX;
    let lY = laserY - mouseY;
    let m = lY/(lX); // slope of laser beam
    if(abs(m) > 150){
      m = 150;
    }
    
    // convert mob coordinates
    let mX = this.x - laserX;
    let mY = laserY - this.y;
    
    // check distance from mob to laser beam
    let d = abs(mY - mX*m);
    
    if(d < this.size+5 && fire == true && wallLife > 0){
      this.hit = true;
    } else if(abs(lX) < 10 && abs(mX) < 10 && fire == true && wallLife > 0){
      this.hit = true;
    } else {
      this.hit = false;
    }
    
    // inflict damage
    if(this.hit == true){
      
      this.hp -= 1;
      
    }
    
    // respawn when killed
    if(this.hp <= 0){
      
      this.y = random(0-this.size, -height);
      this.x = random(this.size, width-this.size);
      
      this.hp = 10;
      
      score++;
      
    }
    
  }
  
  // - - - - - - - - - - - - - - - - - - - - 
  
  attack(){
    
    // collision detection with castle
    if(this.y >= height - wallSize && wallLife > 0){
      
      // damage castle wall
      wallLife -= 1;
      
      // respawn new mob
      this.y = random(0-this.size, -height);
      this.x = random(this.size, width-this.size);
      
    } 
    
    // respawn mobs after castle is destroyed
    else if (this.y > height && wallLife <= 0){
      
      this.y = random(0-this.size, -height);
      this.x = random(this.size, width-this.size);
      
    }
    
  }
  
  // - - - - - - - - - - - - - - - - - - - - 
  
  display(){
    
    if(this.hp > 0 && this.hit == false){
      
      imageMode(CENTER);
      image(virus, this.x, this.y, this.size, this.size);
      
    } else if(this.hp > 0 && this.hit == true){
      
      strokeWeight(5);
      stroke(100, 0, 255, 100);
      fill(255, 0, 100, 100);
      circle(this.x, this.y, this.size);
      
      imageMode(CENTER);
      image(virus, this.x, this.y, this.size, this.size);
      
    }
    
  }
  
}

// - - - - - - - - - - - - - - - - - - - - 

function createCastle(){
  
  // draw castle
  push();
  if(wallLife > 0){
    
    fill(100);
    noStroke();
    rect(0, height-wallSize, width, wallSize); 
    
    stroke(0);
    strokeWeight(3);
    line(0, height-wallSize, width, height-wallSize);
    
  }
  pop();
  
  // draw health bar
  push();
  let hColor = map(wallLife, 0, 25, 0, 120);
  colorMode(HSB);
  noStroke();
  fill(hColor, 255, 255);
  rectMode(CENTER);
  rect(width/2, height-wallSize/4, wallLife*10, 5);
  pop();
  
}

// - - - - - - - - - - - - - - - - - - - - 

function createLaser(){
  
  laserX = width/2;
  laserY = height-wallSize;
  
  push();
  
  // translate to bottom-middle and follow mouse
  translate(laserX, laserY);
  let a = atan2(mouseY-laserY, mouseX-laserX);
  rotate(a+PI*0.491);
  
  if(wallLife > 0){
    
    // draw laser beam
    if(fire == true){
    
      strokeWeight(5);
      stroke(255, 0, 0);
      line(0, 0, 0, -height*1.1);

      strokeWeight(15);
      stroke(255, 0, 0, 50);
      line(0, -50, 0, -height*1.1);
    
    }
    
    // draw laser cannon
    imageMode(CENTER);
    image(laser, 0, 0, 90, 100);
    
  }
  
  pop();
  
}

// - - - - - - - - - - - - - - - - - - - - 

function laserSound(){

  mod++;
  let freq = map(sin(radians(mod)), -1, 1, 180, 220);

  osc.freq(freq, 0.1);
  osc.amp(0.1);
  osc.start();
  
}

// - - - - - - - - - - - - - - - - - - - - 

function messages(){
  
  strokeWeight(5);
  stroke(100, 0, 255, 100);
  textFont(roboto);
  
  if(playing == false){
    
    textAlign(CENTER, CENTER);
    
    let title1 = 'COVID';
    let title2 = 'DESTROYER';
    
    push();
    textFont(marker);
    textSize(40);
    fill(255, 0, 0);
    text(title1, width/2, height/2-20);
    text(title2, width/2, height/2+20);
    pop();
    
    let playText = 'click to begin';
    
    textSize(15);
    fill(255);
    text(playText, width/2, height*(2/3));
    
  }
  
  let scoreText = score;
  
  textAlign(LEFT, CENTER);
  textSize(15);
  fill(255);
  text(scoreText, width/2, 25);
  
  if(wallLife <= 0){
    
    let t1 = "oh no! you've been";
    let t2 = 'CONTAMINATED';
    let t3 = "go wash your hands";
    let t4 = "click to try again";
    
    textAlign(CENTER, CENTER);
    
    textSize(15);
    fill(255);
    text(t1, width/2, height/2);
    
    push();
    textFont(marker);
    textSize(25);
    fill(255, 0, 0);
    text(t2, width/2, height/2+25);
    pop();
    
    textSize(15);
    fill(255);
    text(t3, width/2, height/2+50);
    
    textSize(10);
    fill(255);
    text(t4, width/2, height/2+75)
    
  }
  
}



// - - - - - - - - - - - - - - - - - - - - 