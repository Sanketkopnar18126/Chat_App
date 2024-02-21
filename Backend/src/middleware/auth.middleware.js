import { asynchHandler } from "../utils/asynchHandler.js";
import { apiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
export const verifyJWT = asynchHandler(async (req, res) => {
   try {
      const token =
         req?.cookies?.acessToken ||
         req.header("Authorization").replace("Bearer ", "");
      console.log("Token", token);
      if (!token) {
         throw new apiError(500, "Unauthorize Token");
      }

      const decodedInformation = jwt.verify(
         token,
         process.env.ACCESS_TOKEN_SECRET
      );
      console.log("Decoded information", decodedInformation);
      const user = await User.findById(decodedInformation?._id).select(
         "-password -refreshToken"
      );
      if (!user) {
         throw new apiError(404, "Invalid User In verify Jwt");
      }
   } catch (error) {
      console.log("error occur to verify Jwt:", error);
      throw new apiError(400, error?.message || "Invalid acess token");
   }
});
