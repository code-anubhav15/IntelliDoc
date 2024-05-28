import numpy as np
import pandas as pd
import cv2
import matplotlib.pyplot as plt
import seaborn as sns
import random
from sklearn.model_selection import train_test_split
import tensorflow as tf
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Conv2D, AveragePooling2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint

import os
import warnings
warnings.filterwarnings('ignore')

img = cv2.imread('/kaggle/input/skin-diseases/kaggle/train/3. Akne/07RosaceaK0216.jpg')
plt.imshow(img)
plt.title('Akne')

img = cv2.imread('/kaggle/input/skin-diseases/kaggle/train/4. Pigment/actinic-comedones-10.jpg')
plt.imshow(img)
plt.title('Pigment')

img = cv2.imread('/kaggle/input/skin-diseases/kaggle/train/5. Benign/20RupturedCyst.jpg')
plt.imshow(img)
plt.title('Benign')

img = cv2.imread('/kaggle/input/skin-diseases/kaggle/train/6. Malign/ISIC_0024572.jpg')
plt.imshow(img)
plt.title('Malignant')

img_width = 256
img_height = 256

from tensorflow.keras.preprocessing import image_dataset_from_directory

train_dir = "/kaggle/input/skin-diseases/kaggle/train"
test_dir =  "/kaggle/input/skin-diseases/kaggle/test"
val_dir = "/kaggle/input/skin-diseases/kaggle/val"

train_data = image_dataset_from_directory(train_dir,label_mode = "categorical", image_size = (img_height, img_width),batch_size = 16, shuffle = True,seed = 42)
test_data = image_dataset_from_directory(test_dir,label_mode = "categorical", image_size = (img_height, img_width),batch_size = 16, shuffle = False,seed = 42)
val_data = image_dataset_from_directory(val_dir,label_mode = "categorical", image_size = (img_height, img_width),batch_size = 16, shuffle = False,seed = 42)

model = Sequential()
model.add(Conv2D(128, (3, 3), padding = 'same', input_shape = (256, 256, 3), activation = 'relu'))
model.add(AveragePooling2D(2,2))
model.add(Conv2D(128, (3, 3), activation = 'relu', padding = 'same'))
model.add(Conv2D(128, (3, 3), activation = 'relu', padding = 'same'))
model.add(MaxPooling2D(2,2))
model.add(Dropout(0.25))
model.add(Conv2D(128, (3, 3), activation = 'relu', padding = 'same'))
model.add(Conv2D(128, (3, 3), activation = 'relu', padding = 'same'))
model.add(MaxPooling2D(2,2))
model.add(Conv2D(64, (3, 3), activation = 'relu', padding = 'same'))
model.add(Conv2D(64, (3, 3), activation = 'relu', padding = 'same'))
model.add(MaxPooling2D(2,2))
model.add(Flatten())
model.add(Dropout(0.2, seed = 12))
model.add(Dense(3000, activation = 'relu'))
model.add(Dense(1500, activation = 'relu'))
model.add(Dense(6, activation = 'softmax'))

model.compile(loss = 'categorical_crossentropy', optimizer = 'nadam', metrics = ['accuracy'])

model.summary()

history = model.fit(train_data, validation_data = val_data, epochs = 50, batch_size = 32, callbacks = [early_stopping, checkpoint])