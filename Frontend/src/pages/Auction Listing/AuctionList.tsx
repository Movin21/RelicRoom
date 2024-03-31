import React, { useState, useEffect } from "react";
import axios from "axios";
import "./auction.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">All Auctions</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/3">
          <input
            type="text"
            placeholder="Search auctions..."
            className="w-full border border-gray-300 p-2 rounded-md"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-1/3">
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="All">All Categories</option>
            <option value="art">Art</option>
            <option value="clothing">Clothing</option>
            <option value="furniture">Furniture</option>
            <option value="jewelry">Jewelry</option>
          </select>
        </div>
        <div className="w-1/3">
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {filteredAuctions.length === 0 ? (
          <p className="text-gray-700">No results found</p>
        ) : (
          filteredAuctions.map((auction) => (
            <Card key={auction._id} className="shadow-md">
              <CardContent>
                <div className="flex justify-center ">
                  <img
                    src={auction.auctionImages[0]}
                    alt={`Image for ${auction.auctionTitle}`}
                    className="w-full object-cover "
                  />
                </div>
                <CardTitle className="mt-3">{auction.auctionTitle}</CardTitle>
                <div>
                  <p>Starting Price: ${auction.auctionStartingPrice}</p>
                  <p>Category: {auction.auctionCategory}</p>
                  <p>
                    Created At:{" "}
                    {new Date(auction.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AuctionList;
