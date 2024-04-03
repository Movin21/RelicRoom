import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatDuration, intervalToDuration } from "date-fns";

interface Auction {
  _id: string;
  auctionTitle: string;
  auctionCategory: string;
  auctionDescription: string;
  auctionImages: string[];
  auctionStartingPrice: number;
  auctionDuration: Date;
  currentBid: number;
  isExpired: boolean;
  viewCount: number;
  createdAt: Date;
}

const SingleAuction: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [auction, setAuction] = useState<Auction>();

  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const fetchAuction = async () => {
      isLoading(true);
      try {
        const response = await axios.get<Auction>(
          `http://localhost:3000/auctions/${id}`
        );
        console.log("Response data:", response.data);
        setAuction(response.data); // Set auction state with response data
        isLoading(false);
      } catch (error) {
        console.error("Error fetching auction:", error);
      }
    };
    fetchAuction();
  }, [id]);

  const calculateTimeLeft = (endDate: Date) => {
    const now = new Date();
    const duration = intervalToDuration({
      start: now,
      end: endDate,
    });
    return formatDuration(duration, {
      delimiter: ",",
      format: ["days", "hours", "minutes"],
    });
  };

  if (!auction) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>{auction.auctionTitle}</h2>
      <div>
        {auction?.auctionImages && auction.auctionImages.length > 0 && (
          <img src={auction.auctionImages[0]} alt={auction.auctionTitle} />
        )}
      </div>
      <p>Description: {auction.auctionDescription}</p>
      <p>Starting Price: ${auction.auctionStartingPrice}</p>
      <p>Category: {auction.auctionCategory}</p>
      <p>
        Remaining Time: {calculateTimeLeft(new Date(auction.auctionDuration))}
      </p>
      {/* Add other auction details as needed */}
    </div>
  );
};

export default SingleAuction;
