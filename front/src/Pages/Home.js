import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import remediesData from "./redemy.json"; // Import the JSON file

const Home = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [selectedImage, setSelectedImage] = useState(null);
  const [predictedClass, setPredictedClass] = useState(null);
  const [remedies, setRemedies] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [invalidImageError, setInvalidImageError] = useState(false);

  const onSubmit = async (data) => {
    setFetching(true);
    setInvalidImageError(false);

    // Check if the selected file is an image
    if (!data.image[0].type.startsWith("image/")) {
      setInvalidImageError(true);
      setFetching(false);
      return;
    }

    // Send the image to the server
    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData
      );
      const receivedPredictedClass = response.data.predicted_class;

      // Extract the relevant part (e.g., "aphids") from the received string
      const extractedClass = receivedPredictedClass.match(
        /"predicted_class": "(.*?)"/
      )[1];

      console.log(`The predicted class is: ${extractedClass}`);
      setPredictedClass(extractedClass);

      // Map the predicted class to the corresponding remedies
      const remediesForPredictedClass = remediesData.remedies[extractedClass];
      setRemedies(remediesForPredictedClass || []);
    } catch (error) {
      console.error("Error sending image to server:", error);
    } finally {
      setFetching(false);
    }
  };

  // Clear the error when a new file is selected
  const handleFileChange = () => {
    setInvalidImageError(false);
  };

  return (
    <div
      className="upload-container"
      style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      <div className="upload">
        <h1
          className="title text-center mb-4"
          style={{ fontFamily: "cursive", fontWeight: "bold" }}
        >
          <span
            className="text-success"
            style={{ fontFamily: "cursive", fontWeight: "bold" }}
          >
            PestLens-
          </span>{" "}
          Upload Your Pest Infected Plant Image
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="file"
              accept="image/*"
              placeholder="Select image"
              {...register("image", {
                required: "Please upload an image",
              })}
              onChange={(e) => {
                setSelectedImage(URL.createObjectURL(e.target.files[0]));
                handleFileChange(); // Clear error when a new file is selected
              }}
              className="form-control"
            />

            {selectedImage && (
              <div>
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  style={{ width: "20rem" }}
                />
              </div>
            )}
            {invalidImageError && (
              <p className="text-danger">Invalid image format</p>
            )}
            {errors.image && errors.image.type === "required" && (
              <p className="text-danger">{errors.image.message}</p>
            )}
          </div>

          <button type="submit" className="btn btn-success me-2">
            Detect
          </button>
          {fetching && (
            <p className="text-muted">Predicted Class: Fetching...</p>
          )}
          {!fetching && predictedClass && (
            <div className="remedy-container border rounded p-3 mt-3 bg-light">
              <p className="h4 mb-3">Predicted Class: {predictedClass}</p>
              {remedies.length > 0 && (
                <>
                  <h2 className="h5 mb-3">Remedies and Solutions:</h2>
                  <ul className="list-group list-group-flush">
                    {remedies.map((remedy, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {remedy}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Home;
