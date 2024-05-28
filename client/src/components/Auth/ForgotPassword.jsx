import React, { useState } from 'react';
import { BASE_URL } from '../../Base_url';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Library } from 'lucide-react';

function ForgotPassword() {
  const [otpSent, setOtpSent] = useState(false);
  const [vOTP, setVotp] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const otpSendFunction = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/sendOTP`, { email }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(data);
      toast.success(data.message);
      setOtpSent(true);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/verifyOTP`, { email, vOTP }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log(data);
      toast.success(data.message);
      navigate("/changePassword");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data);
    }
  };

  return (
    <div className=' flex flex-col items-center h-screen justify-center p-8 rounded-lg shadow-xl'>
      <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
      <p className="mb-4 w-80">Enter your email address and we will send you a link to reset your password.</p>
      <div className="bg-white rounded-lg shadow-md p-6 w-80"> {/* Adjusted width to 80 */}
        <form onSubmit={(e) => otpSendFunction(e)} className="mb-4">
          <label htmlFor="email" className="block mb-2">Email:</label>
          <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 py-2 w-full mb-2" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 w-full">Send OTP</button>
        </form>
        {otpSent && (
          <div>
            <p className="mb-2">OTP sent successfully</p>
            <form onSubmit={(e) => verifyOTP(e)} className="mb-4">
              <input type="number" name="otp" id="otp" placeholder="Enter your OTP" onChange={(e) => setVotp(e.target.value)} className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 py-2 w-full mb-2" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 w-full">Submit</button>
            </form>
          </div>
        )}
        <div className="text-center mt-4">
          <Link to={'/login'} className="text-blue-500 hover:text-blue-600">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
