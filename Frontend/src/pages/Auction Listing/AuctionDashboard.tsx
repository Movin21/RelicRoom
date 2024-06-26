import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CountUp from "react-countup";

interface Auction {
  _id: string;
  auctionTitle: string;
  auctionDescription: string;
  auctionImages: string[];
  auctionCategory: string;
  auctionStartingPrice: number;
  auctionDuration: Date;
  currentBid: number;
  isExpired: boolean;
  viewCount: number;
  createdAt: Date;
}

const AuctionDashboard = () => {
  const auctioneer = useSelector((state: any) => state.auctioneer.auctioneer);

  const [totalAuctions, setTotalAuctions] = useState(0);
  const [ongoingAuctions, setOngoingAuctions] = useState(0);
  const [expiredAuctions, setExpiredAuctions] = useState(0);

  //Getting the auctions counts by auction id
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/auctions/auctioneer/${auctioneer._id}`
        );
        const auctions = response.data;
        const total = auctions.length;
        const ongoing = auctions.filter(
          (auction: Auction) => !auction.isExpired
        ).length;
        const expired = auctions.filter(
          (auction: Auction) => auction.isExpired
        ).length;
        setTotalAuctions(total);
        setOngoingAuctions(ongoing);
        setExpiredAuctions(expired);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchAuctions();
  }, [auctioneer._id]);

  return (
    <>
      <div className="flex">
        <h1 className="text-xl font-semibold font-nunitoSans mr-2 text-primary">
          Hi,
        </h1>
        <h1
          className="text-xl font-mono font-semibold "
          style={{ color: "#6F6200" }}
        >
          {auctioneer.companyname}
        </h1>
      </div>
      <div className="flex justify-center mt-8 ">
        <h1 className="text-3xl font-semibold font-akshar text-primary">
          Auction Summary
        </h1>
      </div>
      <section className="flex flex-col mt-10 items-center justify-center gap-3">
        <div className="grid grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-amethysta font-semibold text-primary text-center">
              Total Auctions
            </h2>
            <div
              className="text-5xl font-alatsi text-center mt-3"
              style={{ color: "#776900" }}
            >
              <CountUp end={totalAuctions} className="font-bold" />
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-amethysta font-semibold text-primary">
              Ongoing Auctions
            </h2>
            <div className="text-5xl font-alatsi text-blue-800 text-center mt-3">
              <CountUp end={ongoingAuctions} className="font-bold" />
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-amethysta font-semibold text-primary text-center">
              Expired Auctions
            </h2>
            <div className="text-5xl font-alatsi text-red-800 text-center mt-3">
              <CountUp end={expiredAuctions} className="font-bold" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuctionDashboard;
