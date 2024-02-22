import mongoose, { Schema } from "mongoose";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
   {
      fullName: {
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

//  use for hash the password

// userSchema.pre("save", async function (next) {
//    if (!this.isModified("password")) return next();
//    this.password = await bcrypt.hash(this.password, 10);
//    return next();
// });

//  check password is correct

// userSchema.methods.isPasswordCorrect = async function (password) {
//    return bcrypt.compare(password, this.password);
// };

// generate acessToken

userSchema.methods.generateAcessToken = async function () {
   return jwt.sign(
      {
         _id: this._id,
         username: this.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: process.env.ACESS_TOKEN_EXPIRY,
      }
   );
};

//  generate Acess Token
userSchema.methods.generateRefreshToken = async function () {
   return jwt.sign(
      {
         _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
   );
};

export const User = mongoose.model("user", userSchema);
