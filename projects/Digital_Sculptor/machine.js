// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/u75EP8qsd/';

// Video
let video;
let flippedVideo;
let vidW, vidH;

let font;
let loaded = false;

// To store the classification
let label = "";

// Load the model first
function preload() {
  
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  
  font = loadFont('../../fonts/Roboto-Regular.ttf');
  
  loaded = true;
}

function setupMachine() {

  // Create the video
  video = createCapture(VIDEO);
  video.size(vidW, vidH);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  
  // Start classifying
  classifyVideo();
}

function camDisplay() {

  let offset = 50;

  let varW = width/2-vidW - offset;
  let varH = height/2-vidH - offset;

  // Draw the video
  image(flippedVideo, varW, varH);
  push();
  stroke(0, 200, 0); 
  noFill();
  rect(varW, varH, vidW, vidH);
  pop();

  // Draw the label
  fill(255);
  textSize(18);
  textFont(font);
  textAlign(CENTER, CENTER);
  text(label, varW + vidW/2, varH - offset);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();

}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}




