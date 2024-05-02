import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

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

const Winsabidder: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [filteredAuctions, setFilteredAuctions] = useState<Auction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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
  }, [searchQuery, selectedCategory, auctions]);

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

    setFilteredAuctions(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="container mx-auto p-5">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-2">
        <Breadcrumb.Item>
          <Link to="/auctionDashboard">Auction Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item> Delivery and tracking</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="text-3xl font-bold mb-5 text-primary">
        All Auctions Winners
      </h1>
      <h1 className="text-medium font-bold mb-1 text-primary font-akshar">
        FILTER BY
      </h1>
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="w-full sm:w-auto relative">
          <input
            type="text"
            placeholder="Search auctions..."
            className={`w-full sm:w-64 border border-gray-300 p-2 rounded-md appearance-none ${
              selectedCategory !== "All" ? "pl-6" : ""
            }`}
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

        <div className="w-full sm:w-auto relative">
          <select
            className={`w-full sm:w-48 border border-gray-300 p-2 rounded-md appearance-none ${
              selectedCategory !== "All" ? "pl-6" : ""
            }`}
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

        <div className="ml-[200px] hidden lg:block">
          <Link to="/MangePaymet">
            <Button
              type="submit"
              className="font-nunitoSans bg-brownDark hover:bg-brownMedium lg:ml-48  text-white font-bold w-44 h-8 rounded-xl focus:outline-none focus:shadow-outline"
            >
              ViewTracking Details
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {filteredAuctions.length === 0 ? (
          <p className="text-gray-700">No results found</p>
        ) : (
          filteredAuctions.map((auction) => (
            <Card key={auction._id}>
              <div className="overflow-hidden">
                <div className="flex justify-center items-center ">
                  <img
                    src={auction.auctionImages[0]}
                    alt={`Image for ${auction.auctionTitle}`}
                    className="w-48 h-44 object-cover rounded-xl"
                  />
                </div>
              </div>
              <CardContent className="p-2">
                <CardTitle className="p-1 font-sangbleu text-lg truncate max-w-xs">
                  {auction.auctionTitle}
                </CardTitle>
              </CardContent>
              <CardFooter className="p-2 flex justify-between items-center">
                <Link to={`/auctionwins/${auction?._id}`} key={auction?._id}>
                  <Button
                    type="submit"
                    className="font-nunitoSans bg-brownDark hover:bg-brownMedium lg:ml-20 ml-48 text-white font-bold w-20 h-8 rounded focus:outline-none focus:shadow-outline"
                  >
                    Winners
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Winsabidder;
