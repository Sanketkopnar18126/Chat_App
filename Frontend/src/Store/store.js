import { persistStore, persistReducer } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import userReducer from "../Slice/user.slice.js";
import usersReducer from "../Slice/users.slice.js";
import userMessageReducer from "../Slice/usermessage.slice.js";
const rootReducer = combineReducers({
   userdata: userReducer,
   usersdata: usersReducer,
   userMessage: userMessageReducer,
});

const persistConfig = {
   key: "root",
   storage,
   version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
});
export const persistStor = persistStore(store);
