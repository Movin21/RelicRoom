import React from "react";
import { Link } from "react-router-dom";
import { TbReportAnalytics } from "react-icons/tb";
import { RiAuctionFill } from "react-icons/ri";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";
const SideMenu = () => {
  return (
    <div className="w-64 shadow bg-white text-black rounded-lg h-full mb-20 py-6">
      <div className="flex flex-col mx-4">
        <nav>
          <ul className="space-y-2">
            <h2 className="text-brownDark font-akshar text-xl font-semibold mb-2">
              Dashboard Navigations
            </h2>
            <li>
              <Link
                to="/auctionDashboard"
                className="flex items-center px-4 py-2 rounded-md bg-white hover:bg-brownMedium transition-colors duration-200 hover:text-white"
              >
                <MdOutlineAnalytics className="mr-2 w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/auction/postAuction"
                className="flex items-center px-4 py-2 rounded-md bg-white hover:bg-brownMedium transition-colors duration-200 hover:text-white"
              >
                <MdOutlinePostAdd className="mr-2 w-5 h-5" />
                <span>Create Auction</span>
              </Link>
            </li>
            <li>
              <Link
                to="/manageAuctions"
                className="flex items-center px-4 py-2 rounded-md bg-white hover:bg-brownMedium transition-colors duration-200 hover:text-white"
              >
                <RiAuctionFill className="mr-2 w-5 h-5" />
                <span>Manage Auctions</span>
              </Link>
            </li>
            <li>
              <Link
                to="/auctionDashboard"
                className="flex items-center px-4 py-2 rounded-md bg-white hover:bg-brownMedium transition-colors duration-200 hover:text-white"
              >
                <TbReportAnalytics className="mr-2 w-5 h-5" />
                <span>Generate Reports</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;
