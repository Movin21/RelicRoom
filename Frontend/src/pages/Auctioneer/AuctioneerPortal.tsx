import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

const AuctioneerPortal = () => {
  const [data, setData] = useState<Auction[]>([]);
  const [filteredData, setFilteredData] = useState<Auction[]>([]);
  const [filterOption, setFilterOption] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const auctioneerId = "660bb03c5bb419eafdc37d28"; // Replace with the actual auctioneer ID

  useEffect(() => {
    fetchData();
  }, [filterOption, searchQuery]);

  const fetchData = async () => {
    try {
      let response;
      if (filterOption === "Ongoing") {
        response = await axios.get(`http://localhost:3000/auctioneer/getOngoingAuctions/${auctioneerId}`);
      } else if (filterOption === "Expired") {
        response = await axios.get(`http://localhost:3000/auctioneer/getExpiredAuctions/${auctioneerId}`);
      } else {
        response = await axios.get(`http://localhost:3000/auctioneer/getAllAuctions/${auctioneerId}`);
      }
      setData(response.data);
    } catch (error) {
      console.error("Error fetching auction data:", error);
    }
  };

  const handleFilterChange = (option: string) => {
    setFilterOption(option);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    setFilteredData(
      data.filter((auction) =>
        auction.auctionTitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      {/* Search and Filter Section */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background px-4 py-2 border-b">
        <div className="flex items-center justify-center flex-1 mr-4">
          <div className="relative mr-4">
            <Input
              type="search"
              placeholder="Search..."
              className="w-96 rounded-lg bg-background pl-8"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-32 gap-1">
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filterOption === "All"}
                onClick={() => handleFilterChange("All")}
              >
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterOption === "Expired"}
                onClick={() => handleFilterChange("Expired")}
              >
                Expired
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterOption === "Ongoing"}
                onClick={() => handleFilterChange("Ongoing")}
              >
                Ongoing
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <nav className="flex flex-col gap-4 px-2 py-5 mb-8 bg-gray-400 rounded-lg justify-start items-start">
          <ul className="flex flex-col gap-2">
            <li>
              <Link to="#" className="nav-link">
                Auctioneer Dashboard
              </Link>
            </li>
            <li>
              <Link to="/auctioneerProfile" className="nav-link">
                My Profile
              </Link>
            </li>
            <li>
              <Link to="#" className="nav-link">
                Post Auctions
              </Link>
            </li>
            <li>
              <Link to="#" className="nav-link">
                Delivery Tracking
              </Link>
            </li>
            <li>
              <Link to="#" className="nav-link">
                Generate Report
              </Link>
            </li>
            <hr className="border-gray-600 my-4" />
            <li>
              <Link to="#" className="nav-link">
                Logout
              </Link>
            </li>
          </ul>
        </nav>

        {/* Card Component */}
        <div className="ml-4 mt-4 sm:mt-0 flex-1">
          <Dialog>
            <Card>
              <CardHeader>
                <CardTitle>All Auctions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden md:table-cell">
                        Auction Image
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Auction Title
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Description
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Starting Price
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Created At
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Auction Duration
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        No of bids placed
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredData.map((auction, index) => (
                      <TableRow key={index}>
                        <TableCell className="hidden sm:table-cell">
                          {auction.auctionImages.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Auction Image ${index}`}
                            />
                          ))}
                        </TableCell>

                        <TableCell className="hidden md:table-cell">
                          {auction.auctionTitle}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {auction.auctionDescription}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {auction.auctionStartingPrice}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {new Date(auction.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {new Date(auction.auctionDuration).toLocaleString()}
                        </TableCell>

                        <TableCell className="hidden md:table-cell">
                          {auction.currentBid}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AuctioneerPortal;
