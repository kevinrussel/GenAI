from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import base64
import os
from config import MONGO_URI

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Requests

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["image_db"]
collection = db["images"]

@app.route("/upload", methods=["POST"])
def upload_image():
    try:
        data = request.json
        image_data = data.get("image")

        if not image_data:
            return jsonify({"error": "No image provided"}), 400

        collection.insert_one({"image": image_data})
        return jsonify({"message": "Image uploaded successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/latest", methods=["GET"])
def get_latest_image():
    try:
        image_doc = collection.find_one({}, sort=[("_id", -1)])
        if not image_doc:
            return jsonify({"error": "No images found"}), 404
        
        return jsonify({"image": image_doc["image"]})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
