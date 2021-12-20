// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/u75EP8qsd/';

// Video
let video;
let flippedVideo;
let vidW = 140;
let vidH = vidW*(3/4);

let font;
let loaded = false;

// To store the classification
let label = "";

// Load the model first
function preloadModel() {
  
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
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

  let vidX = width/2 - (vidW+10);
  let vidY = height/2 - (vidH+10);

  // Draw the video
  image(flippedVideo, vidX, vidY);

  // Border
  push();
  stroke(255, 0, 0);
  noFill();
  rect(vidX, vidY, vidW, vidH);
  pop();

  // Draw the label
  push();
  fill(255);
  textSize(18);
  textFont(font);
  textAlign(CENTER, CENTER);
  text(label, width/2 - vidW/2 - 10, height/2 - vidH - 20);
  pop();
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




