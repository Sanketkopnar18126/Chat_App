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

//  get Mssg
const getMessage = asynchHandler(async (req, res) => {
   let conversatation = await Conversation.findOne({
      participants: { $all: [req?.user?._id, req?.params?.id] },
   });

   //  but if you used findOne then pt get {}
   // console.log("Conversation", conversatation);

   // console.log("Conversation", conversatation.messages);

   if (!conversatation) {
      throw apiError(500, "Not Found Conversation");
   }

   const getMessage = await Message.findById(conversatation.messages);

   // console.log("get ,ssg", getMessage);

   //  if you use find then you have to use map return type is [{}]

   // const getId = await conversatation?.map((id) => console.log(id.messages));
   // const message=await Message.findById(conversataion?.m)
   // console.log("GetId", getId?.messages);

   if (!getMessage) {
      throw new apiError(500, "Mssg Does Not exist at Db");
   }

   return res
      .status(200)
      .json(
         new apiResponse(200, { user: getMessage }, "Successfully mssg get")
      );
});

export { sendMessage, getMessage };
