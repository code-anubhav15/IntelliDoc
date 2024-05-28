import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MLBASE_URL } from '../../Base_url';
import { useNavigate } from 'react-router-dom';

const HeartDiseaseForm = () => {
  const [formData, setFormData] = useState({
    Age: '',
    Sex: '',
    "Chest pain type": '',
    BP: '',
    Cholesterol: '',
    "FBS over 120": '',
    "EKG results": '',
    "Max HR": '',
    "Exercise angina": '',
    "ST depression": '',
    "Slope of ST": '',
    "Number of vessels fluro": '',
    Thallium: '',
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const munnadata = [{
    "Age": parseInt(formData.Age),
    "Sex": parseInt(formData.Sex),
    "Chest pain type": parseInt(formData["Chest pain type"]),
    "BP": parseInt(formData.BP),
    "Cholesterol": parseInt(formData.Cholesterol),
    "FBS over 120": parseInt(formData["FBS over 120"]),
    "EKG results": parseInt(formData["EKG results"]),
    "Max HR": parseInt(formData["Max HR"]),
    "Exercise angina": parseInt(formData["Exercise angina"]),
    "ST depression": parseInt(formData["ST depression"]),
    "Slope of ST": parseInt(formData["Slope of ST"]),
    "Number of vessels fluro": parseInt(formData["Number of vessels fluro"]),
    "Thallium": parseInt(formData.Thallium)
  }];
  
const navigateTo = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${MLBASE_URL}/predict1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(munnadata)
      });
      setLoading(false);
      // const data = await response.json();
      // const prediction = data.prediction[0];
      console.log("prediction",response)
      navigateTo(`/heart-disease-results`);
      // setResponseMessage(prediction);
      // toast.success(prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto mt-20">
    <h1 className="text-3xl font-bold text-center mb-8">Heart Disease Prediction</h1>
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="border border-gray-300 rounded p-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={key}>
              {key}
              {key === 'Age' && ' (years)'}
              {key === 'BP' && ' (mm Hg)'}
              {key === 'Cholesterol' && ' (gm/dl)'}
              {key === 'Max HR' && ' (beats/min)'}
              {key === 'ST depression'}
              {key === 'Number of vessels fluro' && ' (0-3)'}
              {key === 'Thallium'}
            </label>
            {key === 'Sex' || key === 'Chest pain type' || key === 'FBS over 120' || key === 'EKG results' || key === 'Exercise angina' || key === 'Slope of ST' || key === 'Thallium' ? (
              <select
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded-lg py-2 px-4 font-semibold mb-3 leading-tight focus:outline-none focus:border-black"
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
              >
                {key === 'Sex' ? (
                  <>
                    <option value="">Select</option>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </>
                ) : key === 'Chest pain type' ? (
                  <>
                    <option value="">Select</option>
                    <option value="1">Typical Angina</option>
                    <option value="2">Atypical Angina</option>
                    <option value="3">Non-Anginal Pain</option>
                    <option value="4">Asymptomatic</option>
                  </>
                ) : key === 'FBS over 120' || key === 'Exercise angina' ? (
                  <>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </>
                ) : key === 'EKG results' ? (
                  <>
                    <option value="">Select</option>
                    <option value="0">Normal</option>
                    <option value="1">ST-T wave abnormality</option>
                    <option value="2">Probable or definite left ventricular hypertrophy</option>
                  </>
                ) : key === 'Slope of ST' ? (
                  <>
                    <option value="">Select</option>
                    <option value="1">Upsloping</option>
                    <option value="2">Flat</option>
                    <option value="3">Downsloping</option>
                  </>
                ) : (
                  <>
                    <option value="">Select</option>
                    <option value="0">Normal</option>
                    <option value="1">Fixed Defect</option>
                    <option value="2">Reversible Defect</option>
                  </>
                )}
              </select>
            ) : (
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-black"
                id={key}
                name={key}
                type="text"
                value={value}
                onChange={handleChange}
              />
            )}
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
    {responseMessage !== "" && (
      <div className="mt-4 text-center">
        <p className="font-semibold">Prediction:</p>
        <p>{responseMessage}</p>
      </div>
    )}
  </div>
  );
};

export default HeartDiseaseForm;
