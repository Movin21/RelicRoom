import{configureStore} from "@reduxjs/toolkit";
import adminSlice from "../pages/AdminPortal/slice/adminSlice";

export const store = configureStore({
    reducer: {
        admin: adminSlice
    }
})