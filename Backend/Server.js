const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./DB Connection/DBConnection.js");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler.js");
const adminRouter = require("./Application/AdminPortal/routes/adminRoute.js");

const app = express();

app.use(express.json());
app.use(cors());
connectDB();

//adminPortalMiddleware
app.use("/admin", adminRouter);

//errorHandler
app.use(errorHandler);
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on Port ${process.env.PORT || 5000}`);
});
