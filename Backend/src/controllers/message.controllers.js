import { asynchHandler } from "../utils/asynchHandler.js";
import { Conversation } from "../models/conversation.models.js";
import { Message } from "../models/message.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
const sendMessage = asynchHandler(async (req, res) => {
   //    console.log("Welcome to mssg", req.params.id);
   const { message } = req.body;
   let conversation = await Conversation.findOne({
      participants: { $all: [req?.user?._id, req?.params.id] },
   });

   console.log("Conversation", conversation);

   //  create conversataion between them

   if (!conversation) {
      conversation = await Conversation.create({
         participants: [req?.user?._id, req?.params.id],
      });
   }

   console.log("Conversation create:", conversation);

   const newMessage = await Message.create({
      senderId: req?.user?._id,
      receiverId: req?.params?.id,
      message: message,
   });

   if (newMessage) {
      conversation.messages.push(newMessage?._id);
   } else {
      throw new apiError(400, "Unable to send message");
   }

   return res
      .status(200)
      .json(
         new apiResponse(200, { user: newMessage }, "Successfully mssg send")
      );
});

export { sendMessage };
