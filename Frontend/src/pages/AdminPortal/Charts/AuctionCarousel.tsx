import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
const AuctionCarousel = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    fetchAllAuctions();
  }, []);

  const fetchAllAuctions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/auctions");
      setAuctions(
        response.data.filter((auction: Auction) => !auction.isExpired)
      );
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };

  return (
    <div className="w-full h-[400px] bg-white rounded-lg shadow-md mt-3 mr-5 p-6">
      <div className="text-brownMedium text-2xl font-bold mb-2 font-akshar">
        Featuring Auctions
      </div>
      <Carousel className="w-[450px] h-[250px] flex items-center justify-center mt-9">
        <CarouselContent className="pl-7">
          {auctions.map((auction: Auction) => (
            <CarouselItem key={auction._id}>
              <div className="flex flex-col items-center">
                <img
                  className="w-[320px] h-[250px]"
                  src={auction.auctionImages[0]}
                  alt="Auction Image"
                />
                <div className="mt-2 first-line:font-sangbleu text-xl font-bold w-[300px] truncate">
                  {auction.auctionTitle}
                </div>
                <div className="flex justify-between w-[300px] mt-2">
                  <div className="font-poppins flex flex-row text-sm">
                    View Count:
                    <p className="font-amethysta ml-1 text-blue-400 font-bold ">
                      {auction.viewCount}
                    </p>
                  </div>
                  <div className="font-poppins flex flex-row text-sm">
                    Price:
                    <p className="font-amethysta ml-1  text-red-400 font-bold">
                      $ {auction.auctionStartingPrice}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-10" />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default AuctionCarousel;
