const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { predictClass } = require("./predict.js");

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Handle file uploads
app.post("/upload", upload.single("image"), (req, res) => {
  // Process the uploaded image
  const imageBuffer = req.file.buffer;
  const imagePath = path.join(__dirname, "public", "uploaded", "image.jpg");

  fs.writeFileSync(imagePath, imageBuffer);

  // Make predictions using the predictClass function
  predictClass(imagePath, (error, predictedClass) => {
    console.log("Predicting class...");
    if (error) {
      console.error("Error predicting class:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json({ predicted_class: predictedClass });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
