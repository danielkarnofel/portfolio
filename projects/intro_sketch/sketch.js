// Visual Design for Portfolio
// Daniel Karnofel
// - - - - - - - - - - - - - - - - - - - - 

let nodes = [];
let mouse;
const n = 25;
let spacing, nW, nH;
let minDist, maxDist;
let canvas, divHeight, divWidth;
const marginW = 0.5;
const marginH = 4;

// - - - - - - - - - - - - - - - - - - - - 

function setup() {

  divWidth = document.getElementById("sketch-div").clientWidth;
  divHeight = document.getElementById("sketch-div").clientHeight;
  
  canvas = createCanvas(divWidth, divHeight);
  canvas.parent("sketch-div");

  spacing = height/n;
  nW = width/spacing - marginW;
  nH = height/spacing - marginH;
  minDist = 0.01;
  maxDist = 5 * spacing;
  
  for (let i = marginW; i <= nW; i++) {
    nodes[i] = [];

    for (let j = marginH; j <= nH; j++) {
      nodes[i][j] = new Node(i*spacing, j*spacing);
    }
  }

}

window.addEventListener('resize', function(event){

  divWidth = document.getElementById("sketch-div").clientWidth;
  divHeight = document.getElementById("sketch-div").clientHeight;
  
  resizeCanvas(divWidth, divHeight);

  nW = width/spacing - marginW;

  for (let i = marginW; i <= nW; i++) {
    nodes[i] = [];

    for (let j = marginH; j <= nH; j++) {
      nodes[i][j] = new Node(i*spacing, j*spacing);
    }
  }
});

// - - - - - - - - - - - - - - - - - - - - 

function draw() {
  background(10, 10, 10);
  stroke(255);
  strokeWeight(2);

  mouse = createVector(mouseX, mouseY);

  for (let i = marginW; i <= nW; i++) {
    for (let j = marginH; j <= nH; j++) {
      nodes[i][j].pushForce();
      nodes[i][j].pullForce();
      nodes[i][j].update();
      nodes[i][j].show();
    }
  }
}
