const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./DB Connection/DBConnection.js");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler.js");

//Import Routes
const auctionRoutes = require("./Application/Auction Listing/routes/auctions.js");
const bidRouts = require("./Application/Auction Listing/routes/bid.js");
const adminRouter = require("./Application/AdminPortal/routes/adminRoute.js");
const auctioneerRouter = require("./Application/Auctioneer/routes/auctioneerRoutes.js");
const vintageexpertRouter = require("./Application/Vintage Item Expert/routes/vintageitemexpertrouter.js");
const customerCareRouter = require("./Application/Customer Care/routes/customerCareRouter.js");
const bidderRoutes = require("./Application/Bidder/routes/bidderRoutes.js");
const rsRouter = require("./Application/Repair Specialist/routes/rsControl.js");

const app = express();

app.use(express.json());
app.use(cors());
connectDB();

//Route Middleware
app.use("/admin", adminRouter);
app.use("/auctions", auctionRoutes);
app.use("/bids", bidRouts);
app.use("/auctioneer", auctioneerRouter);
app.use("/customerCare", customerCareRouter);
app.use("/bidder", bidderRoutes);
app.use("/repairSpecialist", rsRouter);
app.use("/vintageexpert", vintageexpertRouter);

//errorHandler
app.use(errorHandler);
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on Port ${process.env.PORT || 5000}`);
});
