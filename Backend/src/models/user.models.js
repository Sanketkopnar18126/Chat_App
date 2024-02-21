import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
   {
      firstname: {
         type: String,
         required: true,
      },
      username: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
         minlength: 6,
      },
      gender: {
         type: String,
         required: true,
         enu: ["male", "female"],
      },
      profile: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

export const User = mongoose.model("user", userSchema);
