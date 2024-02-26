import { asynchHandler } from "../utils/asynchHandler.js";
import { Conversation } from "../models/conversation.models.js";
import { Message } from "../models/message.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

// Send Mssg

const sendMessage = asynchHandler(async (req, res) => {
   //    console.log("Welcome to mssg", req.params.id);
   const { message } = req.body;
   let conversation = await Conversation.findOne({
      participants: { $all: [req?.user?._id, req?.params.id] },
   });

   // console.log("Conversation", conversation);

   //  create conversataion between them

   if (!conversation) {
      conversation = await Conversation.create({
         participants: [req?.user?._id, req?.params.id],
      });
   }

   // console.log("Conversation create:", conversation);

   const newMessage = await Message.create({
      senderId: req?.user?._id,
      receiverId: req?.params?.id,
      message: message,
   });
   // console.log("newmssg", newMessage);

   // if (newMessage) {
   //    conversation.messages.push(newMessage?._id);
   // } else {
   //    throw new apiError(400, "Unable to send message");
   // }
   if (newMessage) {
      await conversation.messages.push(newMessage?._id);
      await conversation.save();
   }
   // console.log("conversataionMssg:", conversation);

   return res
      .status(200)
      .json(
         new apiResponse(200, { user: newMessage }, "Successfully mssg send")
      );
});

const getMessage = asynchHandler(async (req, res) => {
   try {
      let conversation = await Conversation.findOne({
         participants: { $all: [req?.user?._id, req?.params?.id] },
      });
      // console.log("conversation", conversation);

      if (!conversation) {
         return res
            .status(500)
            .json(new apiResponse(500, {}, "Conversation not found"));
      }
      const getMessage = await Message.find({
         _id: { $in: conversation.messages },
      });

      // console.log("getmssg", getMessage);

      if (!getMessage) {
         throw new apiError(500, "Mssg Does Not Exist in the Database");
      }

      return res
         .status(200)
         .json(
            new apiResponse(200, { user: getMessage }, "Successfully mssg get")
         );
   } catch (error) {
      // Handle other errors or log them as needed
      console.error("Error in getMessage:", error);
      // return res.status(500).json(new apiResponse(500, null, "Internal Server Error"));
   }
});

export { sendMessage, getMessage };
