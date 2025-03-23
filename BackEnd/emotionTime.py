import time
from datetime import datetime
from pymongo import MongoClient
from emotion_advice import get_emotion_advice  # Make sure this is importable

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["emotionsData"]
threshold_logs = db["threshold_logs"]
notifications = db["notifications"]

class RestingAi:    

    def __init__(self):
        self.timepassed = 0
        self.baseline = 150
        self.baselineCounter = 0
        print("In the constructor")
        self.behaviour = ''
        self.Emotion_Array = [0,0,0,0,0,0,0]
        # Index reference: Angry(0), Stress(1), Sad(2), Fear(3), Neutral(4), Surprise(5), Happy(6)

    def TotalBaseLineReduction(self, user_id, session_id, emotion):
        self.baseline = 10
        self.baselineCounter = 0
        self.Emotion_Array = [0,0,0,0,0,0,0]
        advice = get_emotion_advice(emotion)
        
        # Log advice in notifications DB
        notifications.insert_one({
            "userId": user_id,
            "sessionId": session_id,
            "emotion": emotion,
            "advice": advice,
            "triggeredAt": datetime.utcnow()
        })
        
        # Log threshold snapshot in threshold_logs
        self.log_threshold_snapshot(user_id, session_id, emotion, advice)

        print("This is where we would have an interrupt")
        time.sleep(5)

    def ArrayEvaluation(self, index, user_id, session_id):
        if self.Emotion_Array[0] >= 60 or self.Emotion_Array[1] >= 60:
            self.TotalBaseLineReduction(user_id, session_id, "mad")
        elif self.baselineCounter >= self.baseline:
            if index in [0, 1, 2, 3]:  # Negative emotions
                self.baseline -= 5
                emotion = ["Angry", "Stress", "Sad", "Fear"][index]
                self.log_threshold_snapshot(user_id, session_id, emotion)
            elif index == 4:  # Neutral
                self.log_threshold_snapshot(user_id, session_id, "Neutral")
            else:  # Happy/Surprise
                if self.baseline < 300:
                    self.baseline += 5
                emotion = "Happy"
                self.log_threshold_snapshot(user_id, session_id, emotion)

            self.baselineCounter = 0
            self.Emotion_Array = [0] * 7
        else:
            print(self.baselineCounter)

    def log_threshold_snapshot(self, user_id, session_id, emotion, advice=None):
        doc = {
            "userId": user_id,
            "sessionId": session_id,
            "emotionCounts": {
                "angry": self.Emotion_Array[0],
                "stress": self.Emotion_Array[1],
                "sad": self.Emotion_Array[2],
                "fear": self.Emotion_Array[3],
                "neutral": self.Emotion_Array[4],
                "surprise": self.Emotion_Array[5],
                "happy": self.Emotion_Array[6]
            },
            "overallEmotion": emotion,
            "baseline": self.baseline,
            "baselineCounter": self.baselineCounter,
            "timePassedSeconds": self.timepassed * 10,
            "timestamp": datetime.utcnow()
        }
        if advice:
            doc["advice"] = advice
            doc["triggered"] = True
        else:
            doc["triggered"] = False

        threshold_logs.insert_one(doc)

    def dealWithResposne(self, Emotion, user_id, session_id):
        index = 0
        if Emotion == 'None':
            return None
        elif Emotion == "Angry":
            self.Emotion_Array[0] += 1
        elif Emotion == "Stress":
            self.Emotion_Array[1] += 1
            index = 1
        elif Emotion == "Sad":
            self.Emotion_Array[2] += 1
            index = 2
        elif Emotion == "Fear":
            self.Emotion_Array[3] += 1
            index = 3
        elif Emotion == "Neutral":
            self.Emotion_Array[4] += 1
            index = 4
        elif Emotion == "Surprise":
            self.Emotion_Array[5] += 1
            index = 5
        elif Emotion == "Happy":
            self.Emotion_Array[6] += 1
            index = 6

        self.baselineCounter += 1
        self.ArrayEvaluation(index, user_id, session_id)

    def timing(self):
        print(self.timepassed)
        time.sleep(10)
        self.timepassed += 1
        print(self.timepassed)

    def hi(self, emotion, user_id, session_id):
        self.dealWithResposne(emotion, user_id, session_id)
