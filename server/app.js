import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
config();

import cors from "cors";
import HttpError from "./models/http-error.js";
import { signup,login,logout,getUsers} from "./controllers/user-controller.js";
import { IsAuthorized } from "./middlewares/isAuthorized.js";
import { handleFileUpload } from "./middlewares/multer.js";

import { changePassword, sendOTP, verifyOTP } from "./controllers/changePassword.js";
import { submitFeedback ,getProfile} from "./controllers/profilePage.js";

const PORT = process.env.PORT;

// const googleClientId = process.env.clientId;
// const googleClientSecret = process.env.clientSecret;
// const callbackURL = 'http://localhost:9000/auth/google/callback';

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


app.use(bodyParser.json());
app.use(cookieParser());

app.post("/signup",signup);
app.post("/login",login);
// app.post("/forgotPassword",forgotPassword);
app.get("/logout",logout);
app.get("/getuser",IsAuthorized, getUsers);

app.post("/handleFileUpload",IsAuthorized, handleFileUpload);

app.post("/sendOTP",sendOTP);
app.post("/verifyOTP",verifyOTP);
app.put("/changePassword",changePassword);
app.get("/user-profile",IsAuthorized,getProfile);
app.post("/submit",IsAuthorized,submitFeedback)
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  });

  mongoose
  .connect(
     `mongodb+srv://${process.env.DB_username}:${process.env.DB_pass}@subhamdb.ubqol0o.mongodb.net/IntelliDoc?retryWrites=true&w=majority&appName=SubhamDB`
  )
  .then(() => {
    console.log("Server Running");
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });