import os
import sys
from tensorflow.keras.models import load_model
import matplotlib.pyplot as plt
import numpy as np
import pickle

AI_MODEL_PATH = os.path.join(
    os.path.dirname(os.path.realpath(os.curdir)),
    'GenAI', # repo name
    'AI_Model'
)
sys.path.append(AI_MODEL_PATH)

from image_preprocessing import preprocess, decode_labels

BACKEND_PATH = os.path.join(
    os.path.dirname(os.path.realpath(os.curdir)),
    'GenAI', # repo name
    'BackEnd'
)
sys.path.append(BACKEND_PATH)

IMAGE_PATH = os.path.join(
    BACKEND_PATH,
    'upload'
)

HUMAN_FACE_DETECTION_MODEL = load_model(
    os.path.join(
        AI_MODEL_PATH,
        'human_face_detection_model.h5'
    )
)

FACIAL_EMOTION_RECOGNITION_MODEL = load_model(
    os.path.join(
        AI_MODEL_PATH,
        'facial_emotion_recognition_model.h5'
    )
)

def predictEmotions(imagePath: str = IMAGE_PATH):
    """
    Predict emotions from images in the specified directory.

    Args:
        imagePath (str, optional): Path to the directory containing images. Defaults to IMAGE_PATH.

    Returns:
        dict: A dictionary with image paths as keys and predicted emotion labels as values.
    
    Author:
        Kelvin Mock
    """
    print('Predicting Images...')
    listOfImages = []
    for imageName in os.listdir(imagePath):
        fullFilepath = os.path.join(imagePath, imageName)
        image = plt.imread(fullFilepath)
        image = preprocess(image)
        listOfImages.append(image)
    listOfImages = np.array(listOfImages)
    pred = FACIAL_EMOTION_RECOGNITION_MODEL.predict(listOfImages)
    pred = np.argmax(pred, axis=1)  # Ensure predictions are 1D
    print('Prediction Completed')
    
    # Decode the Labels with Label Encoder
    encoder = pickle.load(open(os.path.join(
        AI_MODEL_PATH, 
        'dataset',
        'apollo2506',
        'facial-recognition-dataset',
        'encoder_y_test.pkl'
    ), 'rb'))
    pred_items_texts: list = decode_labels(
        encoded_labels=pred,
        encoder=encoder
    )
    predictions_dict: dict = {
        os.path.join(imagePath, imageName): pred_text for imageName, pred_text in zip(os.listdir(imagePath), pred_items_texts)
    }
    return predictions_dict

def predictIsHuman(imagePath: str = IMAGE_PATH):
    """
    Predicts whether the images in the specified directory contain human faces.
    
    Args:
        imagePath (str, optional): The path to the directory containing images. Defaults to IMAGE_PATH.
        dict: A dictionary where the keys are the file paths of the images and the values are the predicted labels.
    
    Returns:
        dict: A dictionary with image paths as keys and predicted human face labels as values.
    
    Author:
        Kelvin Mock
    """
    print('Predicting Images...')
    listOfImages = []
    for imageName in os.listdir(imagePath):
        fullFilepath = os.path.join(imagePath, imageName)
        image = plt.imread(fullFilepath)
        image = preprocess(image)
        listOfImages.append(image)
    listOfImages = np.array(listOfImages)
    pred = HUMAN_FACE_DETECTION_MODEL.predict(listOfImages)
    pred = np.argmax(pred, axis=1)  # Ensure predictions are 1D
    print('Prediction Completed')
    
    # Decode the Labels with Label Encoder
    encoder = pickle.load(open(os.path.join(
        AI_MODEL_PATH, 
        'dataset',
        'aliasgartaksali',
        'human-and-non-human',
        'encoderTest.pkl'
    ), 'rb'))
    pred_items_texts: list = decode_labels(
        encoded_labels=pred,
        encoder=encoder
    )
    predictions_dict: dict = {
        os.path.join(imagePath, imageName): pred_text for imageName, pred_text in zip(os.listdir(imagePath), pred_items_texts)
    }
    return predictions_dict

if __name__ == '__main__':
    predictions = predictEmotions()
    print('Facial Emotion Predictions:')
    for image_path, prediction in predictions.items():
        print(f"{image_path}: {prediction}")
    
    print('\n')

    print('Human Face Detection Predictions:')
    predictions = predictIsHuman()
    for image_path, prediction in predictions.items():
        print(f"{image_path}: {prediction}")