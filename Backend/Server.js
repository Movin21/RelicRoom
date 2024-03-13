const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./DB Connection/DBConnection.js");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler.js");
<<<<<<< Updated upstream
 const adminRouter = require("./Application/AdminPortal/routes/adminRoute.js");
=======

//Import Routes
const auctionRoutes = require("./Application/Auction Listing/routes/auctions.js");
const bidRouts = require("./Application/Auction Listing/routes/bid.js");
// const adminRouter = require("./Application/AdminPortal/routes/adminRoute.js");
>>>>>>> Stashed changes

const app = express();

app.use(express.json());
app.use(cors());
connectDB();

<<<<<<< Updated upstream
//adminPortalMiddleware
 app.use("/admin", adminRouter);
=======
//Route Middleware
// app.use("/admin", adminRouter);
app.use("/auctions", auctionRoutes);
app.use("/bids", bidRouts);
>>>>>>> Stashed changes

//errorHandler
app.use(errorHandler);
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on Port ${process.env.PORT || 5000}`);
});
