const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { createCanvas, loadImage } = require("canvas");
const tf = require("@tensorflow/tfjs-node");

async function runPrediction() {
  // Load the trained model
  const modelPath = "path/to/pestdetectmodel/model.json"; // Replace with the path to your saved model
  const model = await tf.loadLayersModel(`file://${modelPath}`);

  // Load and preprocess the new image
  const imagePath = "/grass.jpg"; // Replace with the path to your new image
  const imageBuffer = await promisify(fs.readFile)(imagePath);
  const img = await loadImage(imageBuffer);
  const canvas = createCanvas(224, 224);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, 224, 224);
  const imgArray = tf.browser.fromPixels(canvas).toFloat();
  const normalizedImg = imgArray.div(tf.scalar(255));
  const expandedImg = normalizedImg.expandDims(0);

  // Make the prediction
  const predictions = model.predict(expandedImg);

  // Decode the prediction
  const classLabels = [
    "aphids",
    "armyworm",
    "bettel",
    "boolworm",
    "grasshopper",
    "mites",
    "mosquito",
    "sawfly",
    "stem_borer",
  ];
  const predictedClassIndex = predictions.argMax(1).dataSync()[0];
  const predictedClass = classLabels[predictedClassIndex];

  // Print the predicted class
  console.log(`The predicted class is: ${predictedClass}`);
}

// Call the async function
runPrediction();
