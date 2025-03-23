from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import base64
from datetime import datetime
import traceback  # For debugging errors
import main  # Import main.py functions

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "upload"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload_image():
    try:
        # Get image data and timestamp from the request
        data = request.get_json()
        image_data = data.get("image")
        timestamp = data.get("timestamp")

        if not image_data or not timestamp:
            return jsonify({"error": "Missing image or timestamp"}), 400

        # Decode and save the image
        image_binary = base64.b64decode(image_data.split(",")[1])
        image_filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}.jpg"
        image_path = os.path.join(UPLOAD_FOLDER, image_filename)

        with open(image_path, "wb") as f:
            f.write(image_binary)

        print(f"✅ Image saved to: {image_path}")

        # After uploading, check if there are more than 3 images
        images_in_folder = sorted(os.listdir(UPLOAD_FOLDER))
        print(f"🔍 Images in folder: {images_in_folder}")  # Log for debugging

        if len(images_in_folder) > 3:
            send_and_delete_oldest_image(images_in_folder)

        return jsonify({"message": "Image uploaded successfully", "filename": image_filename}), 200

    except Exception as e:
        return jsonify({"error": f"Failed to upload image: {str(e)}"}), 500

def send_and_delete_oldest_image(images_in_folder):
    """Send the oldest image to the process function in main.py and delete it from the folder."""
    try:
        # Sort the images based on filename (timestamps)
        oldest_image = images_in_folder[0]
        oldest_image_path = os.path.join(UPLOAD_FOLDER, oldest_image)
        
        print(f"🔍 Oldest image to process: {oldest_image_path}")

        # Send to process function
        main.process_oldest_image(oldest_image_path)
        print(f"✅ Successfully processed: {oldest_image_path}")

        # Delete the oldest image
        os.remove(oldest_image_path)
        print(f"✅ Oldest image deleted: {oldest_image_path}")
    
    except FileNotFoundError:
        print(f"❌ File not found, maybe already deleted: {oldest_image_path}")
    except PermissionError:
        print(f"❌ Permission error: Cannot delete {oldest_image_path}. Is it open elsewhere?")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    app.run(debug=True)
