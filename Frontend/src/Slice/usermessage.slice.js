import { createSlice } from "@reduxjs/toolkit";

const userMessage = createSlice({
   name: "usermessage",
   initialState: {
      userMessage: null,
   },
   reducers: {
      setMessageData: (state, action) => {
         state.userMessage = action.payload;
      },
   },
});

export const { setMessageData } = userMessage.actions;
export default userMessage.reducer;
