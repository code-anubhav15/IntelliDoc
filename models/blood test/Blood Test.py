import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, accuracy_score

df = pd.read_csv('./blood_samples.csv')

df.Disease = df.Disease.map({
    "Anemia":0,
    "Healthy":1,
    "Diabetes":2,
    "Thalasse":3,
    "Thromboc":4
})

X = df.drop(["Disease"], axis=1)
y = df.Disease

X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.3, random_state=0)

model = LogisticRegression()
model.fit(X_train, y_train)

def prediction(data):
    k=model.predict([data])
    if(k[0]==0):
        print("Anemia")
    elif(k[0]==1):
        print("Healthy")
    elif(k[0]==2):
        print("Diabetes")
    elif(k[0]==3):
        print("Thalasse")
    elif(k[0]==4):
        print("Thromboc")
        
data = [...]
        
prediction(data)