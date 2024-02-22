import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asynchHandler } from "../utils/asynchHandler.js";

const usersData = asynchHandler(async (req, res) => {
   const getAllUser = await User.find({ _id: { $ne: req?.user?._id } }).select(
      "-password"
   );
   //    console.log(getAllUser);
   if (!getAllUser) {
      throw new apiError(500, "Users does not exist");
   }

   return res
      .status(200)
      .json(
         new apiResponse(200, { user: getAllUser }, "Successfully mssg get")
      );
});

export { usersData };
