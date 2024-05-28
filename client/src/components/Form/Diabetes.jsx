import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MLBASE_URL } from '../../Base_url';
import { useNavigate } from 'react-router-dom';
const Form = () => {
  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: ''
  });
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const munnadata = [{
    "Pregnancies": parseInt(formData.Pregnancies),
    "Glucose": parseInt(formData.Glucose),
    "BloodPressure": parseInt(formData.BloodPressure),
    "SkinThickness": parseInt(formData.SkinThickness),
    "Insulin": parseInt(formData.Insulin),
    "BMI": parseFloat(formData.BMI),
    "DiabetesPedigreeFunction": parseFloat(formData.DiabetesPedigreeFunction),
    "Age": parseInt(formData.Age)
  }];
  const navigateTo = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${MLBASE_URL}/predict2`, munnadata, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setLoading(false);
      navigateTo(`/diabetes-results/${response.data.prediction[0]}`);
      setPrediction(response.data.prediction);
      toast.success(response.data.prediction);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-3xl font-bold text-center mb-8">Diabetes Prediction</h1>
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
};

export default Form;
