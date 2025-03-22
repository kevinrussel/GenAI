import os
import jwt
import bcrypt
from flask import jsonify
from Connection.db import mongo
from dotenv import load_dotenv

load_dotenv()
JWT_SECRET = os.getenv("JWT_SECRET")

# 🔐 Register a new user
def register_user(data):
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    if mongo.db.users.find_one({"username": username}):
        return jsonify({"error": "User already exists"}), 409

    # Hash the password before storing
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    mongo.db.users.insert_one({
        "username": username,
        "password": hashed_password
    })

    return jsonify({"message": "User registered successfully!"}), 201

# 🔓 Login user and return JWT token
def login_user(data):
    username = data.get("username")
    password = data.get("password")

    user = mongo.db.users.find_one({"username": username})
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    if not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    # Generate JWT token
    token = jwt.encode({"username": username}, JWT_SECRET, algorithm="HS256")

    return jsonify({"token": token}), 200
