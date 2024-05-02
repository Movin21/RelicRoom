const express = require("express");
const adminRouter = express.Router();
const {
  createAdmin,
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  LoginAdmin,
  revenueChart,
} = require("../application/adminApplication.js");
const {
  getAllAuctions,
  markExpired,
  markFlagged,
  countAllAuctions,
} = require("../application/auctionReveiw.js");
const {
  getAllUsers,
  getAllAuctioneers,
  getAllBidders,
  getAllVintageExperts,
  getAllRepairSpecialists,
  deactivateAuctioneer,
  deactivateBidder,
  deactivateVintageExpert,
  deactivateRepairSpecialist,
  deleteAuctioneer,
  deleteBidder,
  deleteVintageExpert,
  deleteRepairSpecialist,
  countAuctioneers,
  countBidders,
  countVintageExperts,
  countRepairSpecialists,
  countAllUsers,
  userChart,
} = require("../application/userApplication.js");
const { totalCount } = require("../application/revenueCalculate.js");
/**************************************ADMIN USER ROUTES***************************************/
// Route to create a new admin user and get a admin user
adminRouter.route("/adminUser").get(getAllAdmins).post(createAdmin);
adminRouter.route("/adminUserLogin").post(LoginAdmin);

// Route to get, update, and delete an admin user by ID
adminRouter
  .route("/adminUser/:id")
  .get(getAdmin)
  .patch(updateAdmin)
  .delete(deleteAdmin);

/**************************************AUCTION ROUTES***************************************/
// Route to get all the auctions
adminRouter.route("/auctions").get(getAllAuctions);
// Route to expire the auctions
adminRouter.route("/auctions/expire/:id").patch(markExpired);
// Route to flag Auctions
adminRouter.route("/auctions/flag/:id").patch(markFlagged);

/**************************************USER ROUTES***************************************/
//get the all Auctionners
adminRouter.route("/users/auctioneers").get(getAllAuctioneers);
//get the all Bidders
adminRouter.route("/users/bidders").get(getAllBidders);
//get the all Vintage Experts
adminRouter.route("/users/vintageExperts").get(getAllVintageExperts);
//get the all Repair Specialists
adminRouter.route("/users/RepairSpecialists").get(getAllRepairSpecialists);
// deactivate an Auctioneer
adminRouter
  .route("/users/auctioneers/:id")
  .patch(deactivateAuctioneer)
  .delete(deleteAuctioneer);

// deactivate a Bidder
adminRouter
  .route("/users/bidders/:id")
  .patch(deactivateBidder)
  .delete(deleteBidder);

// deactivate a Vintage Expert
adminRouter
  .route("/users/vintageExperts/:id")
  .patch(deactivateVintageExpert)
  .delete(deleteVintageExpert);

// deactivate a Repair Specialist
adminRouter
  .route("/users/repairSpecialists/:id")
  .patch(deactivateRepairSpecialist)
  .delete(deleteRepairSpecialist);

//count Auctionners
adminRouter.route("/users/auctioneerCount").get(countAuctioneers);
//count Bidders
adminRouter.route("/users/bidderCount").get(countBidders);
//count Vintage Experts
adminRouter.route("/users/vintageExpertCount").get(countVintageExperts);
//count Repair Specialists
adminRouter.route("/users/RepairSpecialistCount").get(countRepairSpecialists);
//count all users
adminRouter.route("/users/count").get(countAllUsers);
//user Chart
adminRouter.route("/users/chart").get(userChart);
//revenue chart
adminRouter.route("/revenue/chart").get(revenueChart);
//Revenue Data
adminRouter.route("/revenue").get(totalCount);
//AuctionData
adminRouter.route("/countAuctions").get(countAllAuctions);
module.exports = adminRouter;
