import { createSlice } from "@reduxjs/toolkit";

const User = createSlice({
   name: "userdata",
   initialState: {
      currentUser: null,
      loading: false,
   },

   reducers: {
      // SignIn
      signInStart: (state) => {
         state.loading = true;
      },
      signInSuccess: (state, action) => {
         state.currentUser = action.payload;
         state.loading = false;
      },

      signInFailed: (state) => {
         state.loading = false;
      },

      // LogOut

      signOutStart: (state) => {
         state.loading = true;
      },

      signOutSuccess: (state, action) => {
         state.currentUser = action.payload;
         state.loading = false;
      },

      signOutFailed: (state) => {
         state.loading = false;
      },
   },
});

export const {
   signInFailed,
   signInStart,
   signInSuccess,
   signUpStart,
   signUpFailed,
   signUpSuccess,
   signOutStart,
   signOutSuccess,
   signOutFailed,
} = User.actions;
export default User.reducer;
