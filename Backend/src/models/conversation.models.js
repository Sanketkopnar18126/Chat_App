import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema(
   {
      participants: [
         {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
         },
      ],

      messages: [
         {
            type: Schema.Types.ObjectId,
            ref: "Message",
            required: true,
            default: [],
         },
      ],
   },
   { timestamps: true }
);

export const Conversation = mongoose.model("conversation", conversationSchema);
