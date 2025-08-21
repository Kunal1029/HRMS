import { configureStore } from "@reduxjs/toolkit";
import helperReducer from "./slices/helperSlice";
import authReducer from "./slices/authSlice";
import candidateReducer from "./slices/candidateSlice";
import employeeReducer from "./slices/employeeSlice";
import attendanceReducer from "./slices/attendanceSlice";
import leaveReducer from "./slices/leaveSlice";

const store = configureStore({
    reducer: {
        helper: helperReducer,
        auth: authReducer,
        candidates: candidateReducer,
        employees: employeeReducer,
        attendance: attendanceReducer,
        leave: leaveReducer,
    },
});

export default store;
