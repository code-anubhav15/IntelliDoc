import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv('./liver_records.csv')

df = df.drop_duplicates()
df = df[df.Aspartate_Aminotransferase<=2500]
df = df.dropna(how='any')

y=df.Dataset
X=df.drop('Dataset', axis=1)

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.model_selection import GridSearchCV
from sklearn.svm import SVC

X_train, X_test, y_train , y_test = train_test_split(X,y, test_size=0.2, random_state=0, stratify=y)

train_mean = X_train.mean()
train_std = X_train.std()

X_train = (X_train - train_mean) / train_std
X_test = (X_test - train_mean) / train_std

svc= SVC(probability=True)
parameters = {
    'gamma':[0.0001, 0.001, 0.01, 0.1],
    'C':[0.01, 0.05, 0.5, 0.1, 1, 10, 15, 20, 30]
}
grid_search = GridSearchCV(svc, parameters)
grid_search.fit(X_train, y_train)
grid_search.best_params_

svc= SVC(C=0.01, gamma=0.0001,probability=True)
svc.fit(X_train, y_train)

print(accuracy_score(y_train, svc.predict(X_train)))