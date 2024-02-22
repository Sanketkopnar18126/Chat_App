import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema(
   {
      senderId: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      receiverId: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      message: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

export const Message = mongoose.model("message", messageSchema);
