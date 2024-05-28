import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

import { Schema } from "mongoose";

const profileSchema = new Schema({
    // name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    img_url: { type: String ,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }
});

profileSchema.plugin(uniqueValidator);

export  const Profile = mongoose.model("Profile", profileSchema);