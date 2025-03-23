import os
import base64
import uuid
from flask import Flask, request, jsonify, send_from_directory, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)

# ✅ Use absolute path for UPLOAD_FOLDER
UPLOAD_FOLDER = os.path.abspath("uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure the folder exists

@app.route("/upload", methods=["POST"])
def upload_image():
    try:
        data = request.json  # Get JSON data from frontend
        image_data = data.get("image")

        if not image_data:
            return jsonify({"error": "No image provided"}), 400

        # ✅ Decode base64 image
        try:
            image_bytes = base64.b64decode(image_data.split(",")[1])  # Remove data URL prefix if present
        except Exception as e:
            return jsonify({"error": "Invalid base64 data"}), 400

        # ✅ Generate unique filename
        filename = f"{uuid.uuid4()}.png"
        file_path = os.path.join(UPLOAD_FOLDER, filename)

        # ✅ Save image
        with open(file_path, "wb") as f:
            f.write(image_bytes)

        print(f"✅ Image saved at: {file_path}")  # Debugging info

        # ✅ Return the public URL of the uploaded image
        return jsonify({"message": "Image uploaded successfully!", "image_url": f"/view/{filename}"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/view/<filename>", methods=["GET"])
def view_image(filename):
    """ Serve the uploaded image so it can be viewed in the browser """
    file_path = os.path.join(UPLOAD_FOLDER, filename)

    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")  # Debugging info
        return jsonify({"error": "File not found"}), 404

    return send_from_directory(UPLOAD_FOLDER, filename)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)  # Runs on all network interfaces
