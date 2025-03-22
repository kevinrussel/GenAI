from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import pymongo
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow frontend to connect

# MongoDB Setup
print("Connecting to MongoDB...", os.getenv("MONGO_URI"))
client = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = client["image_database"]
collection = db["images"]
print("Connected to MongoDB!")

@app.route("/upload", methods=["POST"])
def upload_image():
    try:
        data = request.json  # Get JSON data from frontend
        image_data = data.get("image")

        if not image_data:
            return jsonify({"error": "No image provided"}), 400

        # Store in MongoDB
        image_doc = {"image": image_data}
        collection.insert_one(image_doc)

        return jsonify({"message": "Image uploaded successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)