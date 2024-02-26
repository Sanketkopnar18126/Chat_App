import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asynchHandler } from "../utils/asynchHandler.js";

const usersData = asynchHandler(async (req, res) => {
   const getAllUser = await User.find({ _id: { $ne: req?.user?._id } }).select(
      "-password"
   );
   // console.log(getAllUser);
   // console.log(getAllUser);
   if (!getAllUser) {
      throw new apiError(500, "Users does not exist");
   }

   return res
      .status(200)
      .json(
         new apiResponse(200, { user: getAllUser }, "Successfully mssg get")
      );
});

// const searchUser = asynchHandler(async (req, res) => {
//    try {
//       const limit = parseInt(req.query.limit) || 9;
//       const startIndex = parseInt(req.query.startIndex) || 0;

//       const searchTerm = req.query.searchTerm || "";

//       const users = await User.find({
//          fullName: { $regex: searchTerm, $options: "i" },
//       })
//          .skip(startIndex)
//          .limit(limit);

//       return res
//          .status(200)
//          .json(new apiResponse(200, users, "Successfully retrieved listings"));
//    } catch (error) {
//       console.error("Error at getting search by user:", error);
//       return res
//          .status(500)
//          .json(new apiResponse(500, null, "Internal Server Error"));
//    }
// });

export { usersData };
