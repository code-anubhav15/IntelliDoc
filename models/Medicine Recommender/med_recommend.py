import numpy as np 
import pandas as pd 
df = pd.read_csv('./Medicine_Details.csv')
df.head()
df.describe()
df.duplicated().sum()
clean_df = df.drop_duplicates()

composition_value_counts = clean_df['Composition'].value_counts()
composition_value_counts

composition_names = composition_value_counts.index.tolist()
salts_name = composition_names[:50]
salts_name

side_effects_counts = clean_df['Side_effects'].value_counts()
side_effects_medicines = {}
for side_effect, count in side_effects_counts.items():
    medicines_for_side_effect = clean_df.loc[clean_df['Side_effects'] == side_effect, 'Medicine Name'].tolist()
    side_effects_medicines[side_effect] = medicines_for_side_effect

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix_uses = tfidf_vectorizer.fit_transform(clean_df['Uses'].astype(str))
tfidf_matrix_composition = tfidf_vectorizer.fit_transform(clean_df['Composition'].astype(str))
tfidf_matrix_side_effects = tfidf_vectorizer.fit_transform(clean_df['Side_effects'].astype(str))

min_rows = min(tfidf_matrix_uses.shape[0], tfidf_matrix_composition.shape[0], tfidf_matrix_side_effects.shape[0])

tfidf_matrix_uses = tfidf_matrix_uses[:min_rows]
tfidf_matrix_composition = tfidf_matrix_composition[:min_rows]
tfidf_matrix_side_effects = tfidf_matrix_side_effects[:min_rows]

from scipy.sparse import hstack
tfidf_matrix_combined = hstack((tfidf_matrix_uses, tfidf_matrix_composition, tfidf_matrix_side_effects))

cosine_sim_combined = cosine_similarity(tfidf_matrix_combined, tfidf_matrix_combined)

def recommend_medicines_by_symptoms(symptoms, tfidf_vectorizer, tfidf_matrix_uses, clean_df):

    symptom_str = ' '.join(symptoms)
    
    symptom_vector = tfidf_vectorizer.transform([symptom_str])
    
    sim_scores = cosine_similarity(tfidf_matrix_uses, symptom_vector)

    sim_scores = sim_scores.flatten()
    similar_indices = sim_scores.argsort()[::-1][:5] 

    recommended_medicines = clean_df.iloc[similar_indices]['Medicine Name'].tolist()
    
    return recommended_medicines

from sklearn.feature_extraction.text import TfidfVectorizer
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix_uses = tfidf.fit_transform(clean_df['Uses'])

def medbysymp():
    input_symptoms=input("Enter symptoms : ")
    query = [] 
    query.append(input_symptoms)
    recommended_medicines = recommend_medicines_by_symptoms(query, tfidf, tfidf_matrix_uses, clean_df)
    print(recommended_medicines)
medbysymp()
