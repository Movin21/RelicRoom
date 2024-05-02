import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDuration, intervalToDuration } from "date-fns";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import visibilityIcon from "@iconify-icons/mdi/visibility";
import { useSelector } from "react-redux";
import NoSearchResultFound from "./shared/NoSearchResultFound";

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
  const auctioneer = useSelector((state: any) => state.auctioneer.auctioneer);

  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [filteredAuctions, setFilteredAuctions] = useState<Auction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");
  const [auctionStatus, setAuctionStatus] = useState<
    "All" | "expired" | "ongoing"
  >("ongoing");
  console.log(auctions);

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
  }, [searchQuery, selectedCategory, auctions, sortOrder, auctionStatus]);

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
      if (auctionStatus === "expired" && !auction.isExpired) {
        return false;
      }
      if (auctionStatus === "ongoing" && auction.isExpired) {
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

  const handleStatusChange = (status: "All" | "expired" | "ongoing") => {
    setAuctionStatus(status);
  };

  const calculateTimeLeft = (endDate: Date) => {
    const now = new Date();
    const duration = intervalToDuration({
      start: now,
      end: endDate,
    });
    return formatDuration(duration, {
      delimiter: ", ",
      format: ["days", "hours", "minutes"],
    });
  };

  const updateViewCount = async (auctionId: string) => {
    try {
      await axios.put(`http://localhost:3000/auctions/${auctionId}/views`);
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-2">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Auctions</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="text-3xl font-bold mb-5 text-primary">All Auctions</h1>
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
        <div className="w-full sm:w-auto relative">
          <select
            className={`w-full sm:w-48 border border-gray-300 p-2 rounded-md appearance-none ${
              selectedCategory !== "All" ? "pl-6" : ""
            }`}
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
        <div className="w-full sm:w-auto relative">
          <select
            className={`w-full sm:w-48 border border-gray-300 p-2 rounded-md appearance-none ${
              selectedCategory !== "All" ? "pl-6" : ""
            }`}
            value={auctionStatus}
            onChange={(e) =>
              handleStatusChange(
                e.target.value as "All" | "expired" | "ongoing"
              )
            }
          >
            {" "}
            <option value="ongoing">Ongoing Auctions</option>
            <option value="All">All Auctions</option>
            <option value="expired">Expired Auctions</option>
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
      {filteredAuctions.length === 0 ? (
        <NoSearchResultFound />
      ) : (
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {filteredAuctions.map((auction) => (
            <Link
              to={`/auction/${auction?._id}`}
              key={auction?._id}
              onClick={() => {
                console.log("Clicked Auction ID:", auction._id);
                updateViewCount(auction._id);
              }}
            >
              <Card
                key={auction._id}
                className={`shadow-md transition-transform duration-300 transform hover:scale-105 ${
                  auction.isExpired ? "opacity-50" : ""
                } rounded-none`}
              >
                <div className="overflow-hidden">
                  <img
                    src={auction.auctionImages[0]}
                    alt={`Image for ${auction.auctionTitle}`}
                    className="w-full h-56 object-cover"
                  />
                </div>
                <CardContent className="p-2">
                  <CardTitle className="p-1 font-sangbleu text-lg truncate max-w-xs">
                    {auction.auctionTitle}
                  </CardTitle>
                  <div>
                    <p className="font-bold text-sm font-sourceSans3">
                      Starting Price: ${auction.auctionStartingPrice}
                    </p>
                    <p className="font-bold text-sm mt-1 font-sourceSans3">
                      Category: {auction.auctionCategory}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-2 flex justify-between items-center">
                  {auction.isExpired ? (
                    <p className="mb-1 text-red-600 font-bold text-xs mr-4">
                      Expired
                    </p>
                  ) : (
                    <p className="mb-1 text-red-600 font-bold text-xs mr-4">
                      {calculateTimeLeft(auction.auctionDuration)} Left
                    </p>
                  )}

                  <p className=" text-gray-500 font-bold text-xs flex items-center  ">
                    <Icon icon={visibilityIcon} className="mr-2" />
                    <div className="mb-0.5">{auction.viewCount} Views</div>
                  </p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuctionList;
