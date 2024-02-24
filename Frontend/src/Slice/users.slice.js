import { createSlice } from "@reduxjs/toolkit";

const users = createSlice({
   name: "usersdata",
   initialState: {
      users: null,
   },
   reducers: {
      setUser: (state, action) => {
         state.users = action.payload;
      },
   },
});
export const { setUser } = users.actions;
export default users.reducer;
