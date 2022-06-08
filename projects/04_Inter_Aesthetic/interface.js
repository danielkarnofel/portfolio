// user interface
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

// buttons:
let trainModel;
let loadModel;
let restart;

let buttonSize = 65;

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

function titleScreen() {

  let titleText = 'inter - aesthetic';

  push();

  textAlign(CENTER, CENTER);
  fill(50, 100);

  push();
  textSize(42);
  text(titleText, width / 2, height / 2 - 30);
  pop();

  push();
  textSize(42);
  colorMode(HSB);
  fill(random(0, 255), 100, 100, 10);
  text(titleText, width/2 + random(-2, 2), height/2 - 30 + random(-2, 2));
  pop();

  text('by Daniel Karnofel', width/2, height/2 + 15);

  // - - - - - - - - - - - - 

  push();
  fill(50);
  text('v  scroll down for more info  v', width/2, height - 30);
  pop();

  pop();

}

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

function buttons() {

  trainModel = createButton('Train Model');
  // trainModel.parent('button');
  trainModel.position(width / 2 - buttonSize/2 - 50, height/2+40);
  trainModel.size(buttonSize);
  trainModel.mousePressed(trainTheModel);

  loadModel = createButton('Load Model');
  // loadModel.parent('button');
  loadModel.position(width / 2 - buttonSize/2 + 50, height/2+40);
  loadModel.size(buttonSize);
  loadModel.mousePressed(loadTheModel);

  restart = createButton('Restart');
  // restart.parent('button');
  restart.position(40, 40);
  restart.size(buttonSize);
  restart.mousePressed(restartModel);
  restart.hide();

}

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

function loadTheModel() {

  const modelInfo = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin'
  }

  model.load(modelInfo, modelLoaded);

  loadModel.hide();
  trainModel.hide();
  restart.show();

  for (let i = 0; i < points.length; i++) {

    notes[i].carrier.amp(0);

  }

  points = [];

  fullSet = false;

}

function modelLoaded() {
  console.log('model loaded');
  state = 'prediction';

}

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

function trainTheModel() {

  loadModel.hide();
  trainModel.hide();
  restart.show();

  state = 'collection';
  
  for (let i = 0; i < points.length; i++) {

    notes[i].carrier.amp(0);

  }

  points = [];

  fullSet = false;

}

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

function restartModel() {

  restart.hide();
  state = 'title';

  for (let i = 0; i < points.length; i++) {

    notes[i].carrier.amp(0);

  }

  loadModel.show();
  trainModel.show();

}

// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - 