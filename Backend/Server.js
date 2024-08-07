const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./DB Connection/DBConnection.js");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler.js");
const {
  updateMonthlyData,
} = require("./Application/AdminPortal/application/revenueCalculate.js");

//Import Routes
const auctionRoutes = require("./Application/Auction Listing/routes/auctions.js");
const bidRouts = require("./Application/Auction Listing/routes/bid.js");
const adminRouter = require("./Application/AdminPortal/routes/adminRoute.js");
const auctioneerRouter = require("./Application/Auctioneer/routes/auctioneerRoutes.js");
const rsRouter = require("./Application/Repair Specialist/routes/rsControl.js");
const vintageexpertRouter = require("./Application/Vintage Item Expert/routes/vintageitemexpertrouter.js");
const bidderRoutes = require("./Application/Bidder/routes/bidderRoutes.js");
const paymentRoutes = require("./Application/Delivery Tracking/PaymentRoute.js");

const app = express();

app.use(express.json());
app.use(cors());
connectDB();

// Running updateMonthlyData function at the start of each month

setInterval(() => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  if (currentDay === 19) {
    updateMonthlyData();
    console.log("Monthly Revenue Update Fetched !!");
  }
}, 86400000); // Check every 24 hours

//Route Middleware
app.use("/admin", adminRouter);
app.use("/auctions", auctionRoutes);
app.use("/bids", bidRouts);
app.use("/auctioneer", auctioneerRouter);
app.use("/bidder", bidderRoutes);
app.use("/repairSpecialist", rsRouter);
app.use("/vintageexpert", vintageexpertRouter);
app.use("/payment", paymentRoutes);

//errorHandler
app.use(errorHandler);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on Port ${process.env.PORT || 3000}`);
});
