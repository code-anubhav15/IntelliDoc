from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from sklearn.preprocessing import LabelEncoder, StandardScaler, Normalizer

import pandas as pd
import tensorflow as tf
import cv2
import numpy as np
import json
app = Flask(__name__)
CORS(app, supports_credentials=True)  # Enable CORS with support for credentials

# Load Model and Load Column Names for heart disease prediction
col_names = joblib.load("heart_disease_columns.pkl")
model = joblib.load("heart_disease_model.pkl")

# Load Model and Load Column Names for diabetes prediction
col_names2 = joblib.load("diabetes_columns.pkl")
model2 = joblib.load("diabetes_model.pkl")

# Load Model and Load Column Names for CKD prediction
col_names3 = joblib.load("cardio_columns.pkl")
model3 = joblib.load("cardio_model.pkl")

col_names4 = joblib.load("blood_test_columns.pkl")
model4 = joblib.load("blood_test_model.pkl")

model5 = joblib.load("kidney_stone_model.pkl")
col_names5 = joblib.load("kidney_stone_columns.pkl")

model6=joblib.load("liver_model.pkl")
col_names6 = joblib.load("liver_columns.pkl")

enc = LabelEncoder()

# Load StandardScaler and Normalizer
scaler = StandardScaler()
normalizer = Normalizer()

# Route for heart disease prediction
@app.route('/predict1', methods=['POST'])
def predict_heart_disease():
    try:
        feat_data = request.json
        
        if feat_data is None:
            return jsonify({'error': 'No JSON data received'})
        
        df = pd.DataFrame(feat_data)
        df = df.reindex(columns=col_names)
        
        prediction = model.predict(df)
        
        response = {'prediction': prediction.tolist()}
        
        return jsonify(response), 200, {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Credentials': 'true'}
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500, {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Credentials': 'true'}

# Route for diabetes prediction
@app.route('/predict2', methods=['POST'])
def predict_diabetes():
    try:
        feat_data = request.json
        
        if feat_data is None:
            return jsonify({'error': 'No JSON data received'})
        
        df = pd.DataFrame(feat_data)
        df = df.reindex(columns=col_names2)
        
        prediction = model2.predict(df)
        
        response = {'prediction': prediction.tolist()}
        
        return jsonify(response), 200, {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Credentials': 'true'}
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500, {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Credentials': 'true'}

# Route for CKD prediction
@app.route('/predict3', methods=['POST'])
def predict_ckd():
    try:
        feat_data = request.json
        
        if feat_data is None:
            return jsonify({'error': 'No JSON data received'})
        
        df = pd.DataFrame(feat_data)
        df = df.reindex(columns=col_names3)
        
        prediction = model3.predict(df)
        
        response = {'prediction': prediction.tolist()}
        
        return jsonify(response), 200, {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Credentials': 'true'}
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500, {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Credentials': 'true'}

@app.route('/predict4', methods=['POST'])
def predict_blood_test():
    try:
        feat_data = request.json
        
        if feat_data is None:
            return jsonify({'error': 'No JSON data received'})
        
        df = pd.DataFrame(feat_data)
        df = df.reindex(columns=col_names4)
        
        prediction = model4.predict(df)
        
        response = {'prediction': prediction.tolist()}
        
        return jsonify(response), 200, {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Credentials': 'true'}
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500, {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Credentials': 'true'}


@app.route('/predict5', methods=['POST'])
def predict_kidney_stone():
    try:
        feat_data = request.json
        
        if feat_data is None:
            return jsonify({'error': 'No JSON data received'})
        
        df = pd.DataFrame(feat_data)
        df = df.reindex(columns=col_names5)
        
        prediction = model5.predict(df)
        
        response = {'prediction': prediction.tolist()}
        
        return jsonify(response), 200, {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Credentials': 'true'}
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500, {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Credentials': 'true'}

@app.route('/predict6', methods=['POST'])
def predict_liver():
    try:
        feat_data = request.json
        
        if feat_data is None:
            return jsonify({'error': 'No JSON data received'})
        
        df = pd.DataFrame(feat_data)
        df = df.reindex(columns=col_names6)
        
        prediction = model6.predict(df)
        
        response = {'prediction': prediction.tolist()}
        
        return jsonify(response), 200, {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Credentials': 'true'}
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500, {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Credentials': 'true'}


# Load all three models
model_heart_disease = tf.keras.models.load_model("bestmodel.keras")
model_cataract = tf.keras.models.load_model("cataract_model.h5")
model_diabetic_retinopathy = tf.keras.models.load_model("diabeticretinopathy.h5")
model_ct_scan = tf.keras.models.load_model("cancer_prediction.h5")
# Predict function for Heart Disease
@app.route('/predict_heart_disease', methods=['POST'])
def predict_heart_disease_img():
    file = request.files['file']
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    img = cv2.resize(img, (256, 256))
    img = np.array(img)
    img = img.reshape((1, 256, 256, 3))
    
    c = model_heart_disease.predict(img)
    d = np.argmax(c)
    prediction = int(d)
    
    return jsonify({'prediction': prediction})

# Predict function for Cataract
@app.route('/predict_cataract', methods=['POST'])
def predict_cataract():
    file = request.files['file']
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    img = cv2.resize(img, (224, 224))
    img = np.array(img)
    img = img.reshape((1, 224, 224, 3))
    
    c = model_cataract.predict(img)
    prediction = int(c[0, 0])
    
    return jsonify({'prediction': prediction})

# Predict function for Diabetic Retinopathy
@app.route('/predict_diabetic_retinopathy', methods=['POST'])
def predict_diabetic_retinopathy():
    file = request.files['file']
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    img = cv2.resize(img, (512, 512))
    img = np.array(img)
    img = img.reshape((1, 512, 512, 3))
    
    c = model_diabetic_retinopathy.predict(img)
    d = np.argmax(c, axis=1)
    prediction = int(d)
    
    return jsonify({'prediction': prediction})

@app.route('/predict_ct_scan', methods=['POST'])
def predict_ct_scan():
    file = request.files['file']
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    img = cv2.resize(img, (224, 224))
    img = np.array(img)
    img=img/255
    img = img.reshape((1, 224, 224, 3))
    
    c = model_ct_scan.predict(img)
    d = np.argmax(c)
    prediction = int(d)
    
    return jsonify({'prediction': prediction})


if __name__ == '__main__':
    app.run(debug=True)
