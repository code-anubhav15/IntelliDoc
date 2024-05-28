import numpy as np
import pandas as pd
import matplotlib
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('./cardiovascular_diseases.csv', sep=';')

duplicated = df[df.duplicated(keep=False)]
duplicated = duplicated.sort_values(by=['AGE', 'GENDER', 'HEIGHT'], ascending= False)
df.drop_duplicates(inplace=True)

from sklearn.model_selection import train_test_split

y = df['CARDIO_DISEASE']
X = df.drop(['CARDIO_DISEASE'], axis=1, inplace=False)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25,random_state = 0)

from sklearn.preprocessing import StandardScaler

sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

from sklearn.neighbors import KNeighborsClassifier

KNN_classifier = KNeighborsClassifier(n_neighbors=25)
KNN_classifier.fit(X_train, y_train)
y_predicted = KNN_classifier.predict(X_test)

accuracy = round(accuracy_score(y_test, y_predicted), 2)
print("Overall accuracy score: " + str(accuracy))