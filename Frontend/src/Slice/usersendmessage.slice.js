import { createSlice } from "@reduxjs/toolkit";

const userSendMessage = createSlice({
   name: "userSendmessage",
   initialState: {
      userSendMessage: null,
   },
   reducers: {
      setSendMessageData: (state, action) => {
         state.userSendMessage = action.payload;
      },
   },
});

export const { setSendMessageData } = userSendMessage.actions;
export default userSendMessage.reducer;
