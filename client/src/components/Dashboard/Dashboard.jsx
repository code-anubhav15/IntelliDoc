import React, { useContext, useState, useEffect } from 'react';
import profilePic from '../../assests/defaultProfile.png';
import Sidebar from './Sidebar.jsx'
import { FaPencilAlt } from 'react-icons/fa';
import { Context } from '../../index.js';
import axios from 'axios';
import { BASE_URL } from '../../Base_url.js';
import toast from 'react-hot-toast';

const UserProfile = () => {
  const { isAuthorized, setIsAuthorized, user, setUser, profileImg, setProfileImg } = useContext(Context);
  const [imgUrl, setImgUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [feedback, setFeedback] = useState('');
const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Fetch image URL upon component mount
    if(profileImg!==null){
    // fetchImageUrl();
    }
  }, []);

  const fetchImageUrl = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user-profile`, {
        withCredentials: true,
      });
      if(response.data.image_url){
      // setImgUrl(response.data.image_url);
      setProfileImg(response.data.image_url);}
      // toast.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) return;
    setLoading1(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
  
    try {
      const response = await axios.post(
        `${BASE_URL}/handleFileUpload`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading1(false);
      setProfileImg(response.data.imageUrl);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback) {
      toast.error('Please enter your feedback');
      return;}
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/submit`, { feedback }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      // Clear the feedback textarea after submission
      toast.success(response.data.message);
      setLoading(false);
      setFeedback('');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        {/* Profile Info */}
        <div className="flex items-center mb-4">
          <div className="relative">
            <img src={profileImg || profilePic} alt="Profile" className="w-24 h-24 rounded-full mr-4" />
            {/* Button */}
            <label htmlFor="imageInput" className="absolute bottom-12 right-4 bg-blue-600 text-white font-bold px-2 py-1 rounded-full flex items-center justify-center hover:bg-blue-700 cursor-pointer">
  <input type="file" id="imageInput" className="hidden" onChange={(e) => { setSelectedFile(e.target.files[0]) }} />
  <span><FaPencilAlt /></span>
</label>
<button onClick={uploadImage} className="block w-full p-2 mt-2 font-sm bg-blue-600 text-white font-bold rounded hover:bg-blue-700">
  {loading1 ? "Loading..." : "Upload"}
</button>

            
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        {/* Additional Text */}
        <p className="text-lg mb-6">Welcome to your profile page! Here, you can view your personal information and provide feedback.</p>
        {/* Feedback Section */}
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-bold mb-4">Feedback</h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full h-32 px-4 py-2 mb-4 border rounded-md"
            placeholder="Enter your feedback here..."
          ></textarea>
          <button onClick={handleFeedbackSubmit} className="block w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">{loading ? "Loading..." : "Submit"}</button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
