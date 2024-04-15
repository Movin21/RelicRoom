import React from "react";

const AuctionDashboard = () => {
  return (
    <>
      <div className="flex flex-row ">
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
            <div className="text-black font-al text-4xl font-bold ml-5 mt-2"></div>
          </div>

          <div className="text-gray-400 mt-3">Live Auction Count</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mb-3 w-100 mr-3">
          <div className="flex items-center">
            <div className="text-brownMedium font-akshar font-bold text-lg ">
              Expired Auctions
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
            <div className="text-black font-al text-4xl font-bold ml-5 mt-2"></div>
          </div>

          <div className="text-gray-400 mt-3">Expired Auction Count</div>
        </div>
      </div>
    </>
  );
};

export default AuctionDashboard;
