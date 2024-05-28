from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from imblearn.over_sampling import RandomOverSampler
from sklearn import tree
from collections import Counter
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

data = pd.read_excel('./Kidney Stone.xlsx')

data=data.drop(['Patient Number '],axis=1)
data=data.drop_duplicates()

from sklearn.preprocessing import LabelEncoder
enc=LabelEncoder()
data['Priority Level']=enc.fit_transform(data['Priority Level'])

cls_1=data[data['Priority Level']==0]
cls_2=data[data['Priority Level']==1]
cls_3=data[data['Priority Level']==2]
cls_4=data[data['Priority Level']==3]
df_class_1_over = cls_1.sample(250, replace=True)
df_class_2_over = cls_2.sample(250, replace=True)
df_class_3_over = cls_3.sample(250, replace=True)
df_class_4_over = cls_4.sample(250, replace=True)
df_test_over = pd.concat([df_class_1_over, df_class_2_over,df_class_3_over, df_class_4_over], axis=0)

corr=data.corr()
cor_target = abs(corr["Priority Level"])

y1=df_test_over['Priority Level']
df_test_over=df_test_over.drop(['Priority Level'],axis=1)
X1=df_test_over

from sklearn.model_selection import train_test_split

X1_s_train,X1_s_test ,y1_s_train, y1_s_test = train_test_split(X1,y1,test_size=0.25,random_state=0,shuffle = True,stratify = y1)

from sklearn.svm import SVC

svc_s_model = SVC(kernel='rbf',gamma=8)
svc_s_model.fit(X1_s_train, y1_s_train)

from sklearn.metrics import accuracy_score, confusion_matrix
predictions= svc_s_model.predict(X1_s_train)
percentage=svc_s_model.score(X1_s_train,y1_s_train)
res=confusion_matrix(y1_s_train,predictions)
print("Training confusion matrix")
print(res)
predictions= svc_s_model.predict(X1_s_test)
percentage=svc_s_model.score(X1_s_test,y1_s_test)
res=confusion_matrix(y1_s_test,predictions)
print("validation confusion matrix")
print(res)

print('training accuracy = '+str(svc_s_model.score(X1_s_train, y1_s_train)*100))
print('testing accuracy = '+str(svc_s_model.score(X1_s_test, y1_s_test)*100))