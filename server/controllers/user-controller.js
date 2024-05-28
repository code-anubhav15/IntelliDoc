import {validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const { text } = pkg;
import pkg from "body-parser";


import HttpError from "../models/http-error.js";
import { User } from "../models/user.js";
import { sendEmail } from "../middlewares/nodemailer.js";
import { Profile } from "../models/profile.js";



export const getUsers = async(req,res,next)=>{
    try{
        const user2 = req.user;
        if(user2){
            res.json({
                message:"User is Authorized",
                success:true,
                user:user2
            })
        }
        else{
            res.json({
                message:"UnAuthorized",
                success:false
            })
        }
    } catch(err){
        const error = new HttpError('Fetching users failed, try again later',500);
        return next(error);
    }
};

export const signup = async(req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(
            new HttpError('Invalid inputs paassed, please check your data.',422)

        );
    }
    const {name,email,password}= req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email:email});
    } catch(err){
       const error = new HttpError('Signing up failed, try again later.',500);
       return next(error);
    }

    if(existingUser){
        const error = new HttpError('User already exists , login instead',422);
        return next(error);
    }

    let hashedPassword;
    try{
      // console.log("password = ",password);
        hashedPassword = await bcrypt.hash(password,10);
    } catch(err){
        const error = new HttpError('Error hashing password, try again ',500);
        return next(error);
    }
    
    const createdUser = new User({
        name,
        email,
        password: hashedPassword
    });
    console.log("hashedPass=",hashedPassword);
    try{
        await createdUser.save();
    } catch(err){
        const error = new HttpError('Signing up failed,please try again later.',500);
        return next(error); 
    }

    let token;
    try{
        token = jwt.sign(
           { email: createdUser.email,
            name:createdUser.name
           },
            'dont_share_token',
            {expiresIn : '1h'}
        );
    } catch (err){
        const error = new HttpError('Failed to create token,please try again',500);
        return next(error);
    }
    res.cookie('jwt',token,{httpOnly:true, maxAge:3600000*24});
    res.status(201).json({
        success:true,
        message:"Successfully registered",
       user:{ name: createdUser.name,
        email: createdUser.email
       },
        // password : hashedPassword,
        token:token
    });

    // Send email with new password
    const msg = `
      <p>Dear ${createdUser.name} ,</p>
      <p> Congratulations on signing up! 🎉 You've taken the first step towards harnessing the power of intelligent diagnosis with our cutting-edge platform.</p>
      <p> With IntelliDoc, you're empowered to receive accurate and efficient diagnoses based on your input, whether it's through images or filling out forms. Our advanced technology combines machine learning and expert knowledge to provide you with valuable insights and guidance.</p>
      <p> We're thrilled to have you on board and look forward to assisting you on your journey towards better health and well-being. Feel free to explore the features, upload your data, and start benefiting from our services.</p>
      <p> If you have any questions or need assistance, don't hesitate to reach out to our support team. We're here to ensure your experience with IntelliDoc is seamless and rewarding.</p>
      <p> Once again, welcome aboard, and thank you for choosing IntelliDoc!</p>
      <p>Best regards,</p>
      <p>Team IntelliDoc</p>`;
    sendEmail(createdUser.email, `Welcome to IntelliDoc!`, msg);
};

export const login = async(req,res,next)=>{
    const {email , password} = req.body;
    let existingUser;

    try{
        existingUser = await User.findOne({email :email});
    } catch(err){
        const error = new HttpError('Loging in failed,please try again later',500);
        return next(error);
    }

    if(!existingUser){
        const error = new HttpError('Invalid credentials, could not log you in ',403);
        return next(error);
    }

    let isValidPassword;
    try{
        isValidPassword = await bcrypt.compare(password, existingUser.password);

    } catch(err){
        const error = new HttpError('Could not log you in , check credentials and try again ',500);
        return next(error);
    }

    if(!isValidPassword){
        const error = new HttpError('Invalid creddentials, could not log you in.',403);
        return next(error);
    }

    let token;
  try {
    token = jwt.sign(
      {  email: existingUser.email ,
        name:existingUser.name
      },
      'dont_share_token',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed(token), please try again later.',
      500
    );
    return next(error);
  }
  res.cookie('jwt',token,{httpOnly:true, maxAge:3600000*24
  });
  res.json({
    success:true,
    message:"logging in successful",
  user: { name:existingUser.name,
    email: existingUser.email,},
    token:token
  });
};

export const logout = async (req, res) => {
    res.clearCookie("jwt").json({
        success: true,
        message: "Logout Successfully!"
    });
  }




  