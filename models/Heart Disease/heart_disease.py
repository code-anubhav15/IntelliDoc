import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv("./Heart_Disease_Prediction.csv")

df = df.dropna()
X = df.drop('Heart Disease', axis=1)
y = df['Heart Disease']

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

df_encode = pd.get_dummies(df, columns=['Sex', 'Chest pain type', 'BP', 'Cholesterol', 'Slope of ST', 'Thallium'], drop_first=True)
df_encode2 = df_encode.drop(['FBS over 120', 'EKG results', 'ST depression'], axis=1)
convert_columns = ['Sex_1', 'Chest pain type_2', 'Chest pain type_3', 'Chest pain type_4', 'BP_100', 'Cholesterol_360', 'Cholesterol_394', 'Cholesterol_407', 'Cholesterol_409', 'Cholesterol_417', 'Cholesterol_564', 'Slope of ST_2', 'Slope of ST_3', 'Thallium_6', 'Thallium_7']

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
accuracy_score(y,y_pred)