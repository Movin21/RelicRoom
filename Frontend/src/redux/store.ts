import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "../pages/AdminPortal/slice/adminSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import persistStore from "redux-persist/es/persistStore";
import bidderSlice from "@/pages/Bidder/slice/bidderSlice";
import auctioneerSlice from "@/pages/Auctioneer/slice/auctioneerSlice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const rootReducer = combineReducers({
  admin: adminSlice,
  bidder: bidderSlice,
  auctioneer: auctioneerSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
