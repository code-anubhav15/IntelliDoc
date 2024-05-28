import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { config } from "dotenv";
import HttpError from '../models/http-error.js';
import {Profile} from "../models/profile.js"

config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.YOUR_CLOUD_NAME,
  api_key: process.env.YOUR_API_KEY,
  api_secret: process.env.YOUR_API_SECRET
});

// Configure Multer for file upload
const storage = multer.diskStorage({});

// Function to filter file types
const fileFilter = (req, file, cb) => {
  // Accept only files with the following extensions: jpg, png, jpeg
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true); // Allow upload
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and JPEG files are allowed.'), 401); // Reject upload
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // 5MB file size limit
  fileFilter: fileFilter // Apply file filter
}).single('image');

// Function to handle file upload
export const handleFileUpload = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).send('Multer error: ' + err.message);
      } else if (err) {
        return res.status(500).send('Unknown error occurred during file upload: ' + err.message);
      }

      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }

      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      try {
        const { email } = req.user;
        const profile = new Profile({ email: email, img_url: result.secure_url });
        const savedProfile = await profile.save();
        console.log('Profile saved successfully:', savedProfile);
      } catch (error) {
        console.error('Error saving profile:', error);
        // Handle the error or return a response to the client
      }
      

      // Respond with the Cloudinary URL of the uploaded image
      res.status(200).json({ success: true,message:"Image uploaded!", imageUrl: result.secure_url });
    });
  } catch (err) {
    const error = new HttpError('Error uploading file.', 500);
    return next(error);
  }
};