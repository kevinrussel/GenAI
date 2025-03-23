from RestingAi import *
from flask import Flask,request,jsonify

app = Flask(__name__)

var1 = RestingAi()

@app.route('/data',methods=['POST'])
def receive_data():
    data = request.json
    if not data or 'message' not in data:
        return jsonify({"error":"No message provided"}),400
    message = data['message']
    result = var1.hi(message)
    return jsonify({"message": "Data receieved", "status": "success"}),200

def process_oldest_image(image_path):
    print(f"Processing image: {image_path}")
    var1.HandlePicture(image_path)

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)
