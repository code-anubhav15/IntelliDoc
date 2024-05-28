/* App.jsx */

import React, { useState } from 'react';
import { MLBASE_URL } from '../../Base_url';
import { useNavigate } from 'react-router-dom';
function App() {
  const initialFormData = {
    "Back/belly/side pain": 0,
    "Burning during urination": 0,
    "Urgenncy in urination": 0,
    "Blood in urine": 0,
    "Cloudy/Smelly urine": 0,
    "Small amounts of urine": 0,
    "Nausea/Vomitting": 0,
    "Fever/Chills": 0,
    "Total": 0 
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [prediction, setPrediction] = useState(null);

  
  const munnadata = [{
    "Back/belly/side pain": parseInt(formData["Back/belly/side pain"]),
    "Burning during urination": parseInt(formData["Burning during urination"]),
    "Urgenncy in urination": parseInt(formData["Urgenncy in urination"]),
    "Blood in urine": parseInt(formData["Blood in urine"]),
    "Cloudy/Smelly urine": parseInt(formData["Cloudy/Smelly urine"]),
    "Small amounts of urine": parseInt(formData["Small amounts of urine"]),
    "Nausea/Vomitting": parseInt(formData["Nausea/Vomitting"]),
    "Fever/Chills": parseInt(formData["Fever/Chills"]),
    "Total": parseInt(formData["Total"])
  }];
  const navigateTo=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch(`${MLBASE_URL}/predict5`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(munnadata)
      });
      const data = await response.json();
      setLoading(false);
      setPrediction(data.prediction[0]);
navigateTo(`/kidney-stone-results/${data.prediction[0]}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value) });

    if (value === '1') {
      setFormData(prevFormData => ({ ...prevFormData, Total: prevFormData.Total + 1 }));
    } else if (value === '0' && formData[name] === 1) {
      setFormData(prevFormData => ({ ...prevFormData, Total: prevFormData.Total - 1 }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden mt-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md w-full">
        <h1 className="text-2xl font-bold mb-4">Health Prediction Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 p-4 rounded">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="border border-gray-300 rounded p-2">
                {key !== 'Total' ? ( // Exclude Total from the input fields
                  <>
                    <label className="block mb-1 font-semibold">{key}</label>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={`${key}-yes`}
                        name={key}
                        value={1}
                        checked={value === 1}
                        onChange={handleInputChange}
                        className="mr-2 border border-gray-300 rounded px-3 py-1"
                      />
                      <label htmlFor={`${key}-yes`} className="mr-4">Yes</label>
                      <input
                        type="radio"
                        id={`${key}-no`}
                        name={key}
                        value={0}
                        checked={value === 0}
                        onChange={handleInputChange}
                        className="mr-2 border border-gray-300 rounded px-3 py-1"
                      />
                      <label htmlFor={`${key}-no`}>No</label>
                    </div>
                  </>
                ) : null}
              </div>
            ))}
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200" type="submit">{loading ? <span>Loading...</span> : <span>Predict</span>}</button>
          </div>
        </form>
        {prediction !== null && (
          <div className="mt-4">
            <p className="font-semibold">Prediction:</p>
            <p>{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
