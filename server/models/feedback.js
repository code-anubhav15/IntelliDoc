import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

import { Schema } from "mongoose";

const feedbackSchema = new Schema({
    text :{type: String, required :true}
});

feedbackSchema.plugin(uniqueValidator);

export  const Feedback = mongoose.model("Feedback", feedbackSchema);