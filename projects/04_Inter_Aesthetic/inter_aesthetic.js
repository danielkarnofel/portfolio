// Art 185AI - Final Project
// Daniel Karnofel
// ml5.js Neural Net based on Shiffman example
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

let model;
let state = 'title';

let fullSet = false;

let targetLabel = '';
let dataPoints = 0;
let totalPoints = 0;

let predictions = [];
let confidence = [];

let font;

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

function preload() {
  font = loadFont('../../fonts/DotGothic16-Regular.ttf');
}

// - - - - - - - - - - - - - - - - - - - - - - - - - 

function setup() {

  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-div");

  textAlign(LEFT, CENTER);

  textSize(14);

  textFont(font);

  buttons();

  // - - - - - - - - - - - - - - - - - - - - - - - - 

  // input setup:
  for (let i = 0; i < n; i++) {
    notes[i] = new Note();
  }

  // neural net setup:
  let options = {
    inputs: 10,
    outputs: ['label'],
    task: 'classification',
    debug: 'true'
  };

  model = ml5.neuralNetwork(options);

}

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

function draw() {

  background(201, 205, 215);

  if (state == 'title') {

    titleScreen();

  } else if (state == 'collection') {

    outputDraw();

    inputDraw();

    push();

    textAlign(LEFT, CENTER);

    fill(50);

    text('Press 1-5 to select training class', 20, height - 60);
    text('Press S to save data', 20, height - 40);
    text('Press T to train model', 20, height - 20);

    pop();

    push();

    textAlign(RIGHT, CENTER);

    fill(50);

    text('shape class:  ' + shape, width - 20, height - 20);

    text('shape data points:  ' + dataPoints, width - 20, height - 60);

    text('total data points:  ' + totalPoints, width - 20, height - 40);

    pop();

  } else if (state == 'prediction') {

    if (fullSet == false) {
      
      inputDraw();

      push();

      fill(50);

      text('select 5 points to begin', 20, height - 20);

      pop();

    }

    fill(50);

    text('predictions:', width - 110, height - 130);

    if (fullSet == true) {
      
      visualize();
      
      inputDraw();

      push();

      for (let i = 0; i < 5; i++) {

        fill(50);

        text(predictions[i] + ':', width - 110, height - 110 + 20 * i);

        text(confidence[i], width - 90, height - 110 + 20 * i);

      }

      pop();

    }

  }

}

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

function keyPressed() {

  if (keyCode == 49) {
    shape = '1';
    shapeSelected = true;

  } else if (keyCode == 50) {
    shape = '2';
    shapeSelected = true;

  } else if (keyCode == 51) {
    shape = '3';
    shapeSelected = true;

  } else if (keyCode == 52) {
    shape = '4';
    shapeSelected = true;

  } else if (keyCode == 53) {
    shape = '5';
    shapeSelected = true;

  } else if (keyCode == 84) {
    shapeSelected = true;

  } else {
    shape = '-';
    shapeSelected = false;
  }

  shapeClass();

  if (shapeSelected == true && state == 'collection') {

    targetLabel = shape;

    for (let i = 0; i < points.length; i++) {

      notes[i].carrier.amp(0);

    }
    
    points = [];

    dataPoints = 0;
    fullSet = false;

  }

  // T:
  if (keyCode == 84 && state == 'collection') {

    state = 'training';
    console.log('starting training');
    model.normalizeData();
    let options = {
      epochs: 200
    }
    model.train(options, whileTraining, finishedTraining);

  } 

  else if(keyCode == 83) { // S

    model.saveData('data');

  } 

}

// - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

function mousePressed() {

  if (shapeSelected == true || state == 'prediction') {
    points.push(new Point(mouseX, mouseY));
  }

  if (points.length > n) {
    points.splice(0, 1);
  }

  for(let i = 0; i < notes.length; i++){

    if(playing == false){

      notes[i].carrier.start();
      notes[i].modulator.start();
      playing = true;

    }

  }

  if (points.length >= n) {

    fullSet = true;

    let inputs = {

      x1: points[0].x,
      y1: points[0].y,

      x2: points[1].x,
      y2: points[1].y,

      x3: points[2].x,
      y3: points[2].y,

      x4: points[3].x,
      y4: points[3].y,

      x5: points[4].x,
      y5: points[4].y,

    }

    let target = {

      label: targetLabel

    }

    if (state == 'collection') {

      model.addData(inputs, target);

      dataPoints++;
      totalPoints++;

      console.log(inputs, target);

    } else if (state == 'prediction') {

      model.classify(inputs, gotResults);

    }
  }

}

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

function whileTraining() {

  console.log(epoch);

}

function finishedTraining() {

  console.log('finished training');
  state = 'prediction';

}

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

function gotResults(error, results) {

  if (error) {

    console.error(error);
    return;

  }

  // console.log(results);

  for (let i = 0; i < results.length; i++) {

    predictions[i] = results[i].label;
    
    confidence[i] = round(results[i].confidence, 2);
    

  }

}

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 