from resting_ai import RestingAi
from emotion_advice import get_emotion_advice

# Singleton instance
resting_ai = RestingAi()

def process_emotion_input(emotion, user_id, session_id):
    resting_ai.dealWithResposne(emotion, user_id, session_id)

    if resting_ai.baseline <= 10:
        # Call the full emotion handler — let it handle advice + DB
        session_result = handle_emotion_session(session_id, user_id)

        return {
            "triggered": True,
            "advice": session_result["advice"],
            "overallEmotion": session_result["overallEmotion"],
            "sessionId": session_id
        }

    return {
        "triggered": False,
        "baseline": resting_ai.baseline
    }
