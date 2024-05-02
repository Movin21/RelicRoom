import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const LoginDashboard = () => {
  const navigate = useNavigate();

  const navigateToAuctioneerProfile = () => {
    navigate("/auctioneerLogin");
  };

  const navigateToBidderProfile = () => {
    navigate("/bidderLogin");
  };

  const navigateToVintageExpertProfile = () => {
    navigate("/vintageexpert/Login");
  };

  const navigateToRepairSpecialistProfile = () => {
    navigate("/repairSpacialist/logRS");
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <Card
        onClick={navigateToAuctioneerProfile}
        className="hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out flex flex-col items-center gap-4 px-6 py-8 bg-white shadow-md rounded-lg w-64 cursor-pointer"
      >
        <div className="text-lg font-semibold text-center">
          Auctioneer Profile
        </div>
        <div className="text-gray-600 text-center">
          Manage your auctions, listings, and seller activities.
        </div>
      </Card>

      <Card
        onClick={navigateToBidderProfile}
        className="hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out flex flex-col items-center gap-4 px-6 py-8 bg-white shadow-md rounded-lg w-64 cursor-pointer"
      >
        <div className="text-lg font-semibold text-center">Bidder Profile</div>
        <div className="text-gray-600 text-center">
          Track your bidding history, watchlist, and buyer activities.
        </div>
      </Card>

      <Card
        onClick={navigateToVintageExpertProfile}
        className="hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out flex flex-col items-center gap-4 px-6 py-8 bg-white shadow-md rounded-lg w-64 cursor-pointer"
      >
        <div className="text-lg font-semibold text-center">
          Vintage Expert Profile
        </div>
        <div className="text-gray-600 text-center">
          Provide expert opinions, valuations, and authentication services.
        </div>
      </Card>

      <Card
        onClick={navigateToRepairSpecialistProfile}
        className="hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out flex flex-col items-center gap-4 px-6 py-8 bg-white shadow-md rounded-lg w-64 cursor-pointer"
      >
        <div className="text-lg font-semibold text-center">
          Repair Specialist Profile
        </div>
        <div className="text-gray-600 text-center">
          Offer repair and restoration services for antique and vintage items.
        </div>
      </Card>
    </div>
  );
};

export default LoginDashboard;
