const { exec } = require("child_process");

const predictClass = (imagePath, callback) => {
  console.log("Entering predictClass function...");

  // Replace with your Python executable path
  const pythonExecutable = "C:/Python311/python.exe";
  const pythonScriptPath = "index.py";

  const command = `${pythonExecutable} ${pythonScriptPath} ${imagePath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error}`);
      return callback(error, null);
    }

    const predictedClass = stdout.trim();
    console.log(`The predicted class is: ${predictedClass}`);

    callback(null, predictedClass);
  });
};

module.exports = { predictClass };
