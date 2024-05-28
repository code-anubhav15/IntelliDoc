import React, { useState } from 'react';

const RecommendationPage = () => {
  const [symptom, setSymptom] = useState('');
  const [symptomsList, setSymptomsList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
//     'Chronic Cough',
//     'Chronic Pain',
//     'Chemotherapy',
//     'Cold',
//     'Fever',
//     'Headache',
//     'Stomach Pain',
//     'Back Pain',
//     'Nausea',
//     'Vomiting',
//     'Diarrhea',
//     'Fatigue',
//     'Dizziness',
//     'Shortness of Breath',
//     'Joint Pain',
//     'Muscle Pain',
//     'Chest Pain',
//     'Heartburn',
//     'Constipation',
//     'Indigestion',
//     'Acid Reflux',
//     'Bloating',
//     'Cramps',
//     'Swelling',
//     'Rash',
//     'Itching',
//     'Dry Skin',
//     'Skin Irritation',
//     'Allergies',
//     'Runny Nose',
//     'Sneezing',
//     'Watery Eyes',
//     'Coughing Blood',
//     'Blood in Stool',
//     'Blood in Urine',
//     'Bruising',
//     'Swollen Glands',
//     'Sore Throat',
//     'Hoarseness',
//     'Difficulty Swallowing',
//     'Weight Loss',
//     'Weight Gain',
//     'Loss of Appetite',
//     'Excessive Thirst',
//     'Frequent Urination',
//     'Painful Urination',
//     'Blood in Semen',
//     'Loss of Libido',
//     'Erectile Dysfunction',
//     // Add more symptoms here...
//   ]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSymptom(value);
    if (value) {
      const filteredSuggestions = getSuggestions(value);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleAddSymptom = () => {
    if (symptom) {
      setSymptomsList([...symptomsList, symptom]);
      setSymptom('');
      setSuggestions([]);
    }
  };

  const handleRemoveSymptom = (index) => {
    const newSymptomsList = [...symptomsList];
    newSymptomsList.splice(index, 1);
    setSymptomsList(newSymptomsList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/recommend_medicines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: symptomsList }),
      });
      const data = await response.json();
      setRecommendations(data.recommended_medicines);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const getSuggestions = (value) => {
    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setSymptom(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
    <h1 className="text-3xl font-bold mb-4">Medicine Recommendation</h1>
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex items-center mb-2">
        <input
          type="text"
          value={symptom}
          onChange={handleChange}
          onFocus={() => setSuggestions(suggestions)}
          className="border rounded px-4 py-2 flex-grow mr-2"
          placeholder="Type symptom..."
        />
        <button
          type="button"
          onClick={handleAddSymptom}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded"
        >
          Add Symptom
        </button>
      </div>
      <div className="flex flex-wrap mb-4">
        {symptomsList.map((symptom, index) => (
          <div key={index} className="bg-gray-200 rounded px-2 py-1 mr-2 mb-2">
            <span>{symptom}</span>
            <button type="button" onClick={() => handleRemoveSymptom(index)} className="ml-2 text-red-600 font-bold">x</button>
          </div>
        ))}
      </div>
      {suggestions.length > 0 && (
        <ul className="border rounded px-4 py-2">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="cursor-pointer hover:bg-gray-200" onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded">Get Recommendations</button>
    </form>
    <div>
      <h2 className="text-2xl font-bold mb-2">Recommendations:</h2>
      <div className="grid grid-cols-1  gap-4">
        {recommendations.map((medicine, index) => (
          <div key={index} className="bg-white shadow rounded overflow-hidden transition-transform hover:shadow-lg hover:scale-105">
            <div className="flex">
              <div className="flex-1 p-4">
                <h3 className="text-xl font-bold mb-2">{medicine['Medicine Name']}</h3>
                <p><strong>Composition:</strong> {medicine['Composition']}</p>
                <p><strong>Uses:</strong> {medicine['Uses']}</p>
                <p><strong>Side Effects:</strong> {medicine['Side_effects']}</p>
                <p><strong>Manufacturer:</strong> {medicine['Manufacturer']}</p>
                {/* <p><strong>Excellent Review %:</strong> {medicine['Excellent Review %']}</p>
                <p><strong>Average Review %:</strong> {medicine['Average Review %']}</p>
                <p><strong>Poor Review %:</strong> {medicine['Poor Review %']}</p> */}
              </div>
              {medicine['Image URL'] && (
                <div className="flex-none w-40 p-4">
                  <img src={medicine['Image URL']} alt={medicine['Medicine Name']} className="rounded-lg" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default RecommendationPage;
