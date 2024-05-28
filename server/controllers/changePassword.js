import bodyParser from "body-parser";
const { text } = pkg;
import pkg from "body-parser";
import HttpError from "../models/http-error.js";
import { User } from "../models/user.js";
import Randomstring from "randomstring";
import { sendEmail } from "../middlewares/nodemailer.js";
import bcrypt from "bcrypt";




function generateOTP() {
    return Randomstring.generate({
        length: 6,
        charset: 'numeric'
    });
}

let otp;
let email;
export const sendOTP = async(req, res,next) => {
     email = req.body.email;

    try {
              // Check if user with provided email exists
              const user = await User.findOne({ email });
              if (!user) {
                // return res.status(404).json({ message: 'User not found' });
                const error = new HttpError('User not found',404);
                return next(error);
              }
              //generating otp
               otp = generateOTP();
               console.log(otp);
              //sending otp to the resgistered mail
              const msg = `<p>DO NOT SHARE:Your IntelliDoc OTP is <strong>${otp} </strong>.</p>
              <p>Best regards,</p>
              <p>Team IntelliDoc</p>`;
              sendEmail(email, `Password Reset`, msg);

              res.json({
                success:true,
                messsage:"OTP send to your registered email"
            });
        }catch(err){
            const error = new HttpError('Internal server error',500);
                  return next(error);
        }

   
};

export const verifyOTP = async(req,res,next)=>{
    const {vOTP} = req.body;
    if(vOTP === otp){
      res.json({messsage:"OTP verified successful, create new password",
        success :true
      });
    }
    else{
        const error =  new HttpError("Wrong otp , please try again ", 401);
        return next (error);
    }
}

export const changePassword = async(req,res,next)=>{
    const {newPassword} = req.body;
    
    let hashedPassword;
    try{
      // console.log("password = ",password);
        hashedPassword = await bcrypt.hash(newPassword,10);
    } catch(err){
        const error = new HttpError('Error hashing password, try again ',500);
        return next(error);
    }
    
    // const createdUser = new User({
    //     name,
    //     email,
    //     password: hashedPassword
    // });
    console.log("hashedPass=",hashedPassword);
    try{
        const user = await User.findOneAndUpdate({ email }, { password: hashedPassword });
        if(!user){
            const error = new HttpError('User not found', 404);
            return next(error);
        }

        res.status(200).json({messsage:"Your password has been updated and saved", success: true});
    } catch(err){
        const error = new HttpError('Could not save your updated password.',500);
        return next(error); 
    }
};