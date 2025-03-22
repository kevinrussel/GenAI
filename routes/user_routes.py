from flask import Blueprint, request
from controller import register_user, login_user
from middleware import auth_required

routes = Blueprint("routes", __name__)

# Register new user
@routes.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    return register_user(data)

# Login existing user
@routes.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    return login_user(data)

# Protected test route (requires token or middleware logic)
@routes.route("/api/secure-data", methods=["GET"])
@auth_required
def secure_data():
    return {"message": "🔐 Authenticated route!"}
