import cv2
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet import preprocess_input
from tensorflow.keras.models import load_model
import json
import sys
import os

# Load the trained model
try:
    model = load_model('pestdetectmodel.h5')
except Exception as e:
    print(f"Error loading model: {e}")
    sys.exit(1)

# Define class labels
class_labels = ['aphids', 'armyworm', 'bettel', 'boolworm', 'fruit_flies', 'grasshopper', 'hornworms', 'mites', 'mosquito', 'sawfly', 'stem_borer']

# Function to check if predicted label exists in class labels
def check_label_exists(prediction, class_labels):
    if int(np.argmax(prediction)) not in range(len(class_labels)):
        return f"Error: Predicted label '{class_labels[int(np.argmax(prediction))]}' does not exist."
    else:
        return None

# Check if the correct number of command-line arguments is provided
if len(sys.argv) != 2:
    print("Usage: python index.py <image_path>")
    sys.exit(1)

# Get the image path from the command-line argument
image_path = sys.argv[1]

# Check if the image file exists
if not os.path.isfile(image_path):
    print(f"Error: Image file not found at '{image_path}'.")
    sys.exit(1)

# Load and preprocess the new image
try:
    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
except Exception as e:
    print(f"Error loading image: {e}")
    sys.exit(1)

# Make the prediction
predictions = model.predict(img_array)

# Set confidence threshold for insect classification
confidence_threshold = 0.5

# Check if any insect class prediction exceeds confidence threshold
if np.max(predictions) < confidence_threshold:
    result = {"predicted_class": "No insect class predicted.", "confidence": 0.0}
else:
    error_message = check_label_exists(predictions, class_labels)
    if error_message:
        result = {"error": error_message}
    else:
        predicted_class = class_labels[np.argmax(predictions)]
        confidence = float(np.max(predictions))
        result = {"predicted_class": predicted_class, "confidence": confidence}

# Convert the dictionary to JSON and print it
json_result = json.dumps(result)
print(json_result)