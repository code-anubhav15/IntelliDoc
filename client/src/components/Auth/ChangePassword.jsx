import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../Base_url';
import axios from 'axios';
import passwordImage from '../../assests/proposal.jpg'; // Import your image
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
const navigateTo = useNavigate();
  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.put(`${BASE_URL}/changePassword`, { newPassword }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log(data);
      toast.success(data.message);
      navigateTo('/login')
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
        <div className="md:w-1/2 flex flex-col items-center justify-center p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold mb-4">Change Password</h1>
          <p className="text-gray-600 mb-4">Create a new password for your account.</p>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 py-2 w-64 mb-4"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 py-2 w-64 mb-4"
          />
          <button
            onClick={changePassword}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>
  );
}

export default ChangePassword;
