import { sendEmail } from "../middlewares/nodemailer.js";
import { Profile } from "../models/profile.js";
const { text } = pkg;
import pkg from "body-parser";

import bodyParser from "body-parser";
export const submitFeedback =async(req,res)=>{
    const {email} = req.user;
    const {feedback}=req.body;
    const msg = `
      
      <p> Thank you for submitting your feedback!</p>
      <p> We appreciate you taking the time to share your thoughts with us. Your feedback helps us improve our web application and provide a better experience for all our users.</p>
      <p> We're thrilled to have you on board and look forward to assisting you on your journey towards better health and well-being. Feel free to explore the features, upload your data, and start benefiting from our services.</p>
      <p>If you have any further comments or suggestions, please feel free to reach out to us. We value your input and are committed to making our application the best it can be.</p>
      <p> Thanks again!</p>
      <p>Best regards,</p>
      <p>Team IntelliDoc</p>`;

     sendEmail(email, "Feedback submission!", msg);

     const profile = new Profile({
      feedback:feedback
     });
     await profile.save();
     res.json({success:true,
      message:"Feedback submitted successfully",
     });
  };

  export const getProfile = async(req,res)=>{
    const {email} = req.user;

    const result = await Profile.findOne({email:email}) ;
    console.log(result);
    res.json({message:"Profile fetched successfully",image_url: result});
 }