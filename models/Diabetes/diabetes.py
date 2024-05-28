import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv("./diabetes.csv")

X=df.drop('Outcome',axis=1)
y=df['Outcome']

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2,random_state = 101)

from sklearn.neighbors import KNeighborsClassifier
neighbors = np.arange(1, 30)
train_accuracies = {}
test_accuracies = {}
for neighbor in neighbors:
    knn = KNeighborsClassifier(n_neighbors=neighbor)
    knn.fit(X_train, y_train)
    train_accuracies[neighbor] = knn.score(X_train, y_train)
    test_accuracies[neighbor] = knn.score(X_test, y_test)
    
model = KNeighborsClassifier(n_neighbors = 28)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
train_accuracy = model.score(X_train, y_train)
test_accuracy = model.score(X_test, y_test)
print(f'Train Accuracy: {train_accuracy}\nTest Accuracy: {test_accuracy}')

from sklearn.model_selection import GridSearchCV
def hyperparameter_tunning(estimator, X_train, y_train, param_grid, score ='accuracy', n = 5):

    grid_search = GridSearchCV(estimator = estimator,param_grid = param_grid,scoring = score,cv = n)

    grid_search.fit(X_train,y_train)
    best_params = grid_search.best_params_
    best_score = grid_search.best_score_

    print(f'Best parameters: {best_params} \n')
    print(f'Best score: {best_score}')

    best_estimator = grid_search.best_estimator_
    return best_estimator

 param_grid = {
 'n_neighbors': [3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25,27,29,31,33],
 'weights': ['uniform', 'distance'],
 'metric': ['euclidian', 'manhattan']
 }
 best_estimator = hyperparameter_tunning(model, X_train, y_train, param_grid,score = 'accuracy', n = 5)

knn = KNeighborsClassifier(metric = 'manhattan', n_neighbors = 11, weights='uniform')
model_diabetes = knn.fit(X,y)
model_diabetes.score(X, y)