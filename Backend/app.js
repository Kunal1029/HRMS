if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const connectDB = require("./ConnectDB/connectDb.js");
const userRoutes = require("./routes/userRoute")
const candidateRoutes = require("./routes/candidateRoute")
const employeeRoutes = require("./routes/employeeRoute")
const attendanceRoutes = require("./routes/attendanceRoute")
const leaveRoutes = require("./routes/leaveRouter")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./utils/middleware")
const FRONTEND_URL = process.env.FRONTEND_URL;
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/candidates", candidateRoutes)
app.use("/api/employee", employeeRoutes)
app.use("/api/attendance", attendanceRoutes)
app.use("/api/leave", leaveRoutes)

app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
