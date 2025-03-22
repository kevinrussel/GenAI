import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

mongo = PyMongo()

def init_db(app):
    app.config["MONGO_URI"] = os.getenv("MONGO_URI")
    mongo.init_app(app)
    try:
        # Force a connection test by accessing server info
        mongo.cx.server_info()
        print("MongoDB connection successful!")
    except Exception as e:
        print(f"MongoDB connection failed: {e}")

if __name__ == "__main__":
    from flask import Flask
    app = Flask(__name__)
    init_db(app)

@app.route("/api/ping", methods=["GET"])
def ping():
    origin = request.headers.get("Origin")
    print(f" Frontend connected via CORS from: {origin}")
    return jsonify({"message": "Frontend is connected to backend via CORS!"}), 200

# Run Flask server
if __name__ == "__main__":
    print("Flask server is starting...")
    app.run(host="localhost", port=5001, debug=True)
