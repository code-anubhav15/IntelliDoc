import React, { useContext } from 'react';
import { FaArrowCircleRight, FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../Base_url';
import { Context } from '../..';
import axios from 'axios';
import toast from 'react-hot-toast';
import logo from '../../assests/MediBuddy.jpg';
import { Newspaper } from "lucide-react";
import { motion } from "framer-motion";

export default function SidebarOne() {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/logout`, { withCredentials: true });
      console.log(response.data);
      toast.success(response.data.message);
      setIsAuthorized(false);
      setUser(null);
      navigateTo('/');
    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col overflow-y-auto border-r bg-white px-5 py-8 md:w-64 lg:w-72 overflow-hidden" // Adjusted width for responsiveness
    >
      <Link to={'/'}>
        <div className="flex items-center">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            src={logo}
            alt="Logo"
            className="w-8 h-8 mr-2"
          />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl font-bold text-gray-800"
          >
            IntelliDoc
          </motion.h1>
        </div>
      </Link>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <Link
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to='/'
            >
              <FaHome className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Home</span>
            </Link>
          </div>
          <div className="space-y-3 ">
            <Link
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to='/Diagnosis'
            >
              <Newspaper className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Diagnosis</span>
            </Link>
          </div>
          <div className="space-y-3 ">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to='/logout'
            >
             <FaArrowCircleRight className='mr-2' /> Logout
            </motion.button>
          </div>
        </nav>
      </div>
    </motion.aside>
  );
}
