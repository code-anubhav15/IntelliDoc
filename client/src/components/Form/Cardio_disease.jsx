import React, { useState } from 'react';
import { MLBASE_URL } from '../../Base_url';
import { useNavigate } from 'react-router-dom';
function App() {
  const [formData, setFormData] = useState({
    AGE: 50,
    GENDER: 2,
    HEIGHT: 168,
    WEIGHT: 62,
    AP_HIGH: 110,
    AP_LOW: 80,
    CHOLESTEROL: 1,
    GLUCOSE: 1,
    SMOKE: 0,
    ALCOHOL: 0,
    PHYSICAL_ACTIVITY: 1
  });

  const munnadata = [{
    "AGE": parseInt(formData.AGE),
    "GENDER": formData.GENDER,
    "HEIGHT": parseInt(formData.HEIGHT),
    "WEIGHT": parseInt(formData.WEIGHT),
    "AP_HIGH": parseInt(formData.AP_HIGH),
    "AP_LOW": parseInt(formData.AP_LOW),
    "CHOLESTEROL": parseInt(formData.CHOLESTEROL),
    "GLUCOSE": parseInt(formData.GLUCOSE),
    "SMOKE": parseInt(formData.SMOKE),
    "ALCOHOL": parseInt(formData.ALCOHOL),
    "PHYSICAL_ACTIVITY": parseInt(formData.PHYSICAL_ACTIVITY)
  }];
  

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

const navigateTo=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   setLoading(true);
    try {
      const response = await fetch(`${MLBASE_URL}/predict3`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(munnadata)
      });
      const data = await response.json();
      setPrediction(data.prediction[0]);
      navigateTo(`/cardio-disease-results/${data.prediction[0]}`);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-3xl font-bold text-center mb-8">Cardio Disease Prediction</h1>
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
    </div>
  );
}

export default App;
