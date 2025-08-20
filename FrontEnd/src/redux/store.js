import {configureStore} from "@reduxjs/toolkit";
import helperReducer from "../redux/slices/helperSlice";
import authReducer from "../redux/slices/authSlice";


const store = configureStore({
    reducer:{
        helper: helperReducer,
        auth: authReducer,
    }
})

export default store;