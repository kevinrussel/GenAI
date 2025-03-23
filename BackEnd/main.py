from flask import Flask, request, jsonify
from flask_cors import CORS
from controller import process_emotion_input
from pymongo import MongoClient

app = Flask(__name__)

# ✅ Enable CORS properly for preflight (important for POST with JSON)
CORS(app, resources={r"/*": {"origins": "*"}})  # or restrict to ["http://localhost:3000"]

# ✅ MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["image_database"]
emotions_collection = db["emotionsData"]
notifications_collection = db["notificationData"]

@app.route("/upload", methods=["POST"])
def upload_image():
    data = request.get_json()
    image = data.get("image")
    user_id = data.get("userId", "user_1")
    session_id = data.get("sessionId", "session_1")

    # 🧠 Replace with actual emotion detection later
    predicted_emotion = "Sad"

    result = process_emotion_input(predicted_emotion, user_id, session_id)
    return jsonify(result)

@app.route("/get/emotions/<session_id>", methods=["GET"])
def get_emotions(session_id):
    docs = emotions_collection.find({"sessionId": session_id})
    timeline = [
        {
            "emotion": doc["emotion"],
            "timestamp": doc["timestamp"].isoformat()
        }
        for doc in docs
    ]
    return jsonify({"timeline": timeline})

@app.route("/get/notifications/<user_id>", methods=["GET"])
def get_notifications(user_id):
    docs = notifications_collection.find({"userId": user_id})
    history = [
        {
            "emotion": doc["emotion"],
            "advice": doc["advice"],
            "timestamp": doc["timestamp"].isoformat()
        }
        for doc in docs
    ]
    return jsonify({"notifications": history})

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)

