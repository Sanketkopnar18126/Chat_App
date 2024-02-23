import { persistStore, persistReducer } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import userReducer from "../Slice/user.slice.js";
const rootReducer = combineReducers({
   userdata: userReducer,
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
