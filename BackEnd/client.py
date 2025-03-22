import requests
import time
url = "http://127.0.0.1:5000/data"

data= {"message": "happy"}

for i in range(150):
    data = {"message":"Stress"}
    response = requests.post(url,json=data)
