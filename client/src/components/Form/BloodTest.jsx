import React, { useState } from 'react';
import { MLBASE_URL } from '../../Base_url';
import { useNavigate } from 'react-router-dom';

function App() {
  const initialFormData = {
    "Glucose": 0.944893,
    "Cholesterol": 0.905372,
    "Hemoglobin": 0.507711,
    "Platelets": 0.403033,
    "White Blood Cells": 0.164216,
    "Red Blood Cells": 0.307553,
    "Mean Corpuscular Volume": 0.207938,
    "Mean Corpuscular Hemoglobin": 0.50556,
    "Mean Corpuscular Hemoglobin Concentration": 0.85681,
    "Insulin": 0.652465,
    "BMI": 0.106961,
    "Systolic Blood Pressure": 0.942549,
    "Diastolic Blood Pressure": 0.344261,
    "Triglycerides": 0.666368,
    "LDL Cholesterol": 0.65906,
    "HDL Cholesterol": 0.816982,
    "Heart Rate": 0.401166
  };

  const [formData, setFormData] = useState(initialFormData);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const munnadata = [{
    "Glucose": parseFloat(formData["Glucose"]),
    "Cholesterol": parseFloat(formData["Cholesterol"]),
    "Hemoglobin": parseFloat(formData["Hemoglobin"]),
    "Platelets": parseFloat(formData["Platelets"]),
    "White Blood Cells": parseFloat(formData["White Blood Cells"]),
    "Red Blood Cells": parseFloat(formData["Red Blood Cells"]),
    "Mean Corpuscular Volume": parseFloat(formData["Mean Corpuscular Volume"]),
    "Mean Corpuscular Hemoglobin": parseFloat(formData["Mean Corpuscular Hemoglobin"]),
    "Mean Corpuscular Hemoglobin Concentration": parseFloat(formData["Mean Corpuscular Hemoglobin Concentration"]),
    "Insulin": parseFloat(formData["Insulin"]),
    "BMI": parseFloat(formData["BMI"]),
    "Systolic Blood Pressure": parseFloat(formData["Systolic Blood Pressure"]),
    "Diastolic Blood Pressure": parseFloat(formData["Diastolic Blood Pressure"]),
    "Triglycerides": parseFloat(formData["Triglycerides"]),
    "LDL Cholesterol": parseFloat(formData["LDL Cholesterol"]),
    "HDL Cholesterol": parseFloat(formData["HDL Cholesterol"]),
    "Heart Rate": parseFloat(formData["Heart Rate"])
  }];

  const predictionLabels = {
    0: 'Anemia',
    1: 'Healthy',
    2: 'Diabetes',
    3: 'Thalassemia',
    4: 'Thrombosis'
  };

const navigateTo=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch(`${MLBASE_URL}/predict4`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(munnadata)
      });
      const data = await response.json();
      setLoading(false);
      setPrediction(data.prediction[0]);
      navigateTo(`/bloodtest/${predictionLabels[data.prediction[0]]}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) });
  };

  
  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-3xl font-bold text-center mb-8">Blood Test Prediction</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="border border-gray-300 rounded p-2">
              <>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={key}>
                  {key}
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-black"
                  id={key}
                  name={key}
                  type="text"
                  value={value}
                  onChange={handleChange}
                />
              </>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            type="submit"
          >
            {loading ? <span>Loading...</span> : <span>Predict</span>}
          </button>
        </div>
      </form>
      {/* {prediction !== null && (
        <div className="mt-4 text-center">
          <p className="font-semibold">Prediction:</p>
          <p>{predictionLabels[prediction]}</p>
        </div>
      )} */}
    </div>
  );
}

export default App;
