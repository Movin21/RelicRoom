import React, { useState, useEffect } from "react";
import axios from "axios";
import "./auction.css";
import { formatDuration, intervalToDuration } from "date-fns"; // Importing date-fns functions for time calculation

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

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

const AuctionList: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [filteredAuctions, setFilteredAuctions] = useState<Auction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");

  useEffect(() => {
    fetchAllAuctions();
  }, []);

  const fetchAllAuctions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auctions");
      setAuctions(response.data.existingAuctions);
      setFilteredAuctions(response.data.existingAuctions);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };

  useEffect(() => {
    filterAuctions();
  }, [searchQuery, selectedCategory, auctions, sortOrder]);

  const filterAuctions = () => {
    let filtered: Auction[] = auctions.filter((auction) => {
      if (
        selectedCategory !== "All" &&
        auction.auctionCategory !== selectedCategory
      ) {
        return false;
      }
      if (
        searchQuery.trim() !== "" &&
        !auction.auctionTitle.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    // Sort by createdAt date
    if (sortOrder === "latest") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      filtered.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
    setFilteredAuctions(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const now = new Date();

  const calculateTimeLeft = (endDate: Date) => {
    const duration = intervalToDuration({
      start: now,
      end: endDate,
    });
    return formatDuration(duration, {
      delimiter: ", ",
      format: ["days", "hours", "minutes"],
    });
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">All Auctions</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search auctions..."
            className="w-full pl-8 pr-3 border border-gray-300 p-2 rounded-md"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
            <Link to="">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </div>

        <div className="relative flex-1 ml-40 w-2">
          <select
            className="w-full border border-gray-300 p-2 rounded-md appearance-none"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="All">All Categories</option>
            <option value="art">Art</option>
            <option value="clothing">Clothing</option>
            <option value="furniture">Furniture</option>
            <option value="jewelry">Jewelry</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 pointer-events-none">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        <div className="relative flex-1">
          <select
            className="w-full border border-gray-300 p-2 rounded-md appearance-none ml-3"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 pointer-events-none">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-15">
        {filteredAuctions.length === 0 ? (
          <p className="text-gray-700">No results found</p>
        ) : (
          filteredAuctions.map((auction) => (
            <Card
              key={auction._id}
              className="mt-10 shadow-md transition-transform duration-300 transform hover:scale-105"
            >
              <div className="rounded-t-lg overflow-hidden">
                <img
                  src={auction.auctionImages[0]}
                  alt={`Image for ${auction.auctionTitle}`}
                  className="w-full h-60 object-cover"
                />
              </div>
              <CardTitle className="mt-3 p-3">{auction.auctionTitle}</CardTitle>
              <CardContent className="p-3">
                <div>
                  <p className="mb-1">
                    Starting Price: ${auction.auctionStartingPrice}
                  </p>
                  <p className="mb-1">Category: {auction.auctionCategory}</p>
                </div>
              </CardContent>
              <CardFooter className="p-3 flex justify-between items-center">
                <p className="mb-1 text-red-500 font-bold font-poppins">
                  Time Left: {calculateTimeLeft(auction.auctionDuration)}
                </p>
                <button className="text-white bg-primary hover:bg-secondary ease-in-out hover:text-white px-6 py-1 rounded-md">
                  Bid
                </button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AuctionList;
