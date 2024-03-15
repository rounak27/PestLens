import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export const UploadProblems = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result); // Update the state for the selected image
      };

      reader.readAsDataURL(file);

      // Send the image to the server
      const formData = new FormData();
      formData.append("image", file);

      axios
        .post("http://localhost:3001/upload", formData)
        .then((response) => {
          const predictedClass = response.data.predicted_class;
          console.log(`The predicted class is: ${predictedClass}`);
        })
        .catch((error) => {
          console.error("Error sending image to server:", error);
        });
    }
  };

  return (
    <>
      <div className="upload">
        <h1 className="title">Upload Your Pest Problems:</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            {...register("image", {
              required: "Please upload an image",
            })}
            onChange={handleImageChange}
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
          <p className="text-danger">{errors.image?.message}</p>

          <input type="submit" />
        </form>
      </div>
    </>
  );
};
