import random


class EmotionMsg:



    def get_emotion_advice(overall_emotion):
        advice_pool = {
        "neutral": [
            "Refill your water bottle and take a sip.",
            "Do a 2-minute body scan meditation.",
            "Change your sitting position to refresh your posture.",
            "Crack your knuckles, shake out your arms and legs.",
            "Get up and move to a different room briefly.",
            "Write down one thing you accomplished today.",
            "Close your eyes for 30 seconds and breathe deeply."
        ],
        "sad": [
            "Step outside and feel the sun or wind on your skin.",
            "Write down 3 things you're grateful for.",
            "Drink a glass of cold water slowly and mindfully.",
            "Stretch your arms and legs gently.",
            "Wrap yourself in a blanket and hug a pillow.",
            "Clean up a small area of your room or desk.",
            "Look at an old photo that brings you comfort.",
            "Listen to calming or nostalgic music.",
            "Pet an animal or watch a cute animal video."
        ],
        "happy": [
            "Do a little dance to your favorite song.",
            "Write down what’s making you feel good right now.",
            "Send a message of appreciation to someone.",
            "Stretch and smile at yourself in the mirror.",
            "Take a deep breath and soak in the good moment.",
            "Share your joy with a friend or loved one.",
            "Do something creative while you're in the zone.",
            "Celebrate yourself with a small treat or reward."
        ],
        "mad": [
            "Do 10 deep belly breaths while sitting up straight.",
            "Splash cold water on your face.",
            "Take a 5-minute power walk outside.",
            "Try a 2-minute guided breathing app.",
            "Punch a pillow to release frustration.",
            "Scribble or doodle angrily on a paper, then toss it.",
            "Yell into a pillow for 10 seconds.",
            "Write down what made you mad, then tear it up.",
            "Go outside and do jumping jacks or shake it out."
        ],
        "fear": [
            "Name 5 things you can see, 4 you can touch, 3 you can hear...",
            "Turn on a night light or comforting object.",
            "Write down what's scaring you, then reframe it logically.",
            "Watch something funny or familiar to ground yourself.",
            "Text or call a friend for support.",
            "Do a calming visualization — imagine a safe place.",
            "Remind yourself of times you've overcome fear before."
        ],
        "surprise": [
            "Pause and take 3 slow breaths.",
            "Write down what surprised you — was it good or bad?",
            "Talk it out with someone if it's bothering you.",
            "Take a short walk to reset your mind.",
            "Turn the surprise into curiosity — explore the why.",
            "Smile and embrace it — not all surprises are bad!"
        ],
        "stress": [
            "Close your eyes and breathe in for 4, out for 6.",
            "Make a simple to-do list and focus on 1 task.",
            "Do a 1-minute shoulder and neck roll stretch.",
            "Unclench your jaw and drop your shoulders.",
            "Pause your session and do something fun for 5 mins.",
            "Drink water slowly and intentionally.",
            "Listen to a calming playlist or nature sounds.",
            "Write down what's stressing you, then rewrite it as something manageable."
        ],
        "unknown": [
            "Take 3 deep breaths — it’s okay not to know what you feel.",
            "Focus on your senses — what do you see, hear, smell?",
            "Stretch or move your body gently to reconnect.",
            "Play a song that matches your current mood — or randomness!",
            "Write freely for 2 minutes without judgment.",
            "Let go of needing to label your feelings — just be."
        ]
    }

        return random.choice(advice_pool.get(overall_emotion, ["You're doing great! Keep it up."]))
