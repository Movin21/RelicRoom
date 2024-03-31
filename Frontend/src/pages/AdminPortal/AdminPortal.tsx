import RevenueChart from "./Charts/RevenueCharts";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminPortal = () => {
  const [users, setUsers] = useState(0);
  const [auctions, setAuctions] = useState(0);
  const [revenue, setRevenue] = useState(0);
  useEffect(() => {
    // Define a function to fetch data
    const fetchData = async () => {
      try {
        // Example API endpoints, replace with your actual API endpoints
        const usersResponse = await axios.get(
          "http://localhost:3000/admin/users/count"
        );
        const revenueResponse = await axios.get(
          "http://localhost:3000/admin/revenue"
        );
        const auctionsResponse = await axios.get(
          "http://localhost:3000/admin/countAuctions"
        );

        // Update state with fetched data
        setUsers(usersResponse.data);
        setAuctions(auctionsResponse.data);
        setRevenue(revenueResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="flex flex-row ">
        <div className="bg-white rounded-lg shadow-md p-4 mb-3 w-100 mr-3">
          <div className="flex items-center">
            <div className="text-brownMedium font-akshar font-bold text-lg ">
              Total Users
            </div>
            <div className="ml-52 bg-blue-500 text-white rounded-full px-2 py-1 text-sm">
              <svg
                width="24"
                height="30"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-black  text-4xl font-bold ml-5 mt-2">
              {users} +
            </div>
          </div>

          <div className="text-gray-400 mt-1">
            Auctioneers | Bidders | Vinatge Experts | <br />
            Repair Speialists
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mb-3 w-100 mr-3">
          <div className="flex items-center">
            <div className="text-brownMedium font-akshar font-bold text-lg ">
              Total Auctions
            </div>
            <div className="ml-44 bg-brownDark text-white rounded-full px-2 py-1 text-sm">
              <svg
                width="24"
                height="30"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                aria-labelledby="title"
                aria-describedby="desc"
                role="img"
              >
                <title>Auction</title>

                <path
                  data-name="layer1"
                  fill="white"
                  d="M34 51h30v12H34z"
                ></path>
                <path
                  data-name="layer2"
                  d="M35.2 35.5l10.2-10.2 2.6-2.5a2 2 0 0 0-2.9-2.8L29.6 4.4a2 2 0 0 0-2.8-2.8L14 14.3a2 2 0 1 0 2.8 2.8l6.4 6.4L.6 46.1A2 2 0 1 0 3.4 49L26 26.3l6.4 6.4a2 2 0 1 0 2.8 2.8z"
                  fill="white"
                ></path>
                <path
                  data-name="layer1"
                  d="M36 47a2 2 0 0 0 2 2h22a2 2 0 0 0 0-4H38a2 2 0 0 0-2 2z"
                  fill="white"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-black font-al text-4xl font-bold ml-5 mt-2">
              {auctions}
            </div>
          </div>

          <div className="text-gray-400 mt-3">Live Auction Count</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mb-3 w-100 mr-3">
          <div className="flex items-center">
            <div className="text-brownMedium font-akshar font-bold text-lg ">
              Revenue
            </div>
            <div className="ml-52 bg-green-400 text-white rounded-full px-2 py-1 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                id="IconChangeColor"
                height="30"
                width="24"
              >
                <path
                  d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z"
                  id="mainIconPathAttribute"
                  fill="#ffffff"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-black  text-4xl font-bold ml-5 mt-2">
              $ {revenue}
            </div>
          </div>

          <div className="text-gray-400 mt-3">
            5% Commision from the Auctions
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
        <div className="text-brownMedium text-1xl md:text-3xl font-bold mb-2 md:mb-4">
          Revenue
        </div>
        <RevenueChart />
      </div>
    </>
  );
};

export default AdminPortal;
