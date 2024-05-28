import React, { useState } from 'react';
import { MLBASE_URL } from '../../Base_url';
import { useNavigate } from 'react-router-dom';
function App() {
  const initialFormData = {
    "Age": '',
    "Gender": '',
    "Total_Bilirubin": '',
    "Direct_Bilirubin": '',
    "Alkaline_Phosphotase": '',
    "Alamine_Aminotransferase": '',
    "Aspartate_Aminotransferase": '',
    "Total_Protiens": '',
    "Albumin": '',
    "Albumin_and_Globulin_Ratio":''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
const navigateTo = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${MLBASE_URL}/predict6`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([formData])
      });
      const data = await response.json();
      setLoading(false);
      setPrediction(data.prediction[0]);
      navigateTo(`/liver-disease-results/${data.prediction[0]}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'Gender' ? value : parseFloat(value) });
  };

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-3xl font-bold text-center mb-8">Liver Disease Prediction</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="border border-gray-300 rounded p-2">
              <>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={key}>
                  {key}
                </label>
                {key === 'Gender' ? (
                  <select
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-black"
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                  > <option value="">Select</option>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </select>
                ) : (
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-black"
                    id={key}
                    name={key}
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                  />
                )}
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
      {prediction !== null && (
        <div className="mt-4 text-center">
          <p className="font-semibold">Prediction:</p>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default App;
