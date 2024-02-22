import { User } from "../models/user.models.js";
import { asynchHandler } from "../utils/asynchHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudiary.js";
import bcrypt from "bcryptjs";
// generate Access And Refresh Token

const generateAcessAndRefreshToken = async (userId) => {
   const user = await User.findById(userId);
   // console.log("UserGenerate Accesss and ref:", user);
   const acessToken = await user.generateAcessToken();
   // console.log("accesssToKEN", acessToken);
   const refreshToken = await user.generateRefreshToken();
   // console.log("RefreshToKEN", refreshToken);

   user.refreshToken = refreshToken;
   await user.save({ validateBeforeSave: false });
   return { acessToken, refreshToken };
};

// register User
const registerUser = asynchHandler(async (req, res) => {
   // console.log("reqBody", req?.body);

   const { username, password, fullname, gender } = req?.body;
   if (
      [fullname, password, gender, username].some(
         (fields) => fields?.trim() === undefined
      )
   ) {
      throw new apiError(404, "You have to fill all detais");
   }
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   let profileUrl;
   if (
      req.files &&
      Array.isArray(req.files.profile) &&
      req.files.profile.length > 0
   ) {
      profileUrl = await req.files.profile[0]?.path;
   }
   // console.log("profileUrl", profileUrl);
   // console.log("req", req);

   // console.log("reqFiles:....", req?.files?.profile[0].path);

   if (!profileUrl) {
      throw new apiError(404, "profileUrl  File required");
   }
   const existedUser = await User.findOne({
      $or: [{ username, fullname }],
   });

   // console.log("imgurls", profileUrl);
   const profile = await uploadOnCloudinary(profileUrl);
   console.log("Profile...", profile);

   if (!profile) {
      throw new apiError(400, "error at upload profile in cloudinary");
   }

   if (existedUser) {
      throw new apiError(404, "User alredy exist");
   }

   const user = await User.create({
      fullName: fullname.toLowerCase(),
      password: hashedPassword,
      username,
      profile: profile?.url || "https://avatar.iran.liara.run/public",
      gender,
   });

   // console.log("User Register", user);
   if (!user) {
      throw new apiError(404, "Something error occur to create User");
   }

   const userWithoutPassword = await User.findById(user?._id).select(
      "-password"
   );

   return res
      .status(200)
      .json(
         new apiResponse(200, userWithoutPassword, "User Successfully Created")
      );
});

const logIn = asynchHandler(async (req, res) => {
   const { username, password } = req.body;
   const user = await User.findOne({
      username: username,
   });
   if (!user) {
      throw new apiError(404, "User does not exist");
   }
   // console.log("Password", password);
   const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
   );
   // console.log("check isPasswordCorrect", isPasswordCorrect);
   if (!isPasswordCorrect) {
      throw new apiError(404, "Incorrect Password");
   }

   const { acessToken, refreshToken } = await generateAcessAndRefreshToken(
      user?._id
   );
   const logedIn = await User.findById(user?._id).select(
      "-password -refreshToken"
   );

   const options = {
      httpOnly: true,
      secure: true,
   };

   return res
      .status(200)
      .cookie("acessToken", acessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
         new apiResponse(
            200,
            { user: logedIn, acessToken, refreshToken },
            "User successfully login"
         )
      );
});

const logOut = asynchHandler(async (req, res) => {
   const user = await User.findByIdAndUpdate(
      req?.user?._id,
      {
         refreshToken: undefined,
      },
      {
         new: true,
      }
   );
   console.log("User", user);
   if (!user) {
      throw new apiError(404, "User does not exist");
   }
   const options = {
      httpOnly: true,
      secure: true,
   };
   return res
      .status(200)
      .clearCookie("acessToken", options)
      .clearCookie("refreshToken", options)
      .json(new apiResponse(200, {}, "User Sucessfully logout"));
});

export { registerUser, logIn, logOut };
