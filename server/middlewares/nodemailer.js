import nodemailer from "nodemailer";
import {config} from "dotenv";
config();

export async function sendEmail(to, subject, text) {
    const transporter = nodemailer.createTransport({
     host: 'smtp.gmail.com',
     port: 587,
     secure: false,
      auth: {
        user: process.env.your_Email, // your email
        pass:  process.env.app_pass// your email password
      }
    });
  
    const mailOptions = {
      from: process.env.your_Email, // your email
      to: to,
      subject: subject,
      html: text
    };
     
    try{
      await transporter.sendMail(mailOptions);
    } catch(err){
      const error = new HttpError('Internal server error',500);
      return next(error);
    }
    
  }