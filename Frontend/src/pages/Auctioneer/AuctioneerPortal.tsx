import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./slice/auctioneerSlice";

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
  const auctioneer = useSelector((state: any) => state.auctioneer.auctioneer);
  const dispatch = useDispatch();


  const auctioneerId = auctioneer._id;  
  console.log(auctioneerId);

  useEffect(() => {
    fetchData();
  }, [filterOption, searchQuery]);

  const fetchData = async () => {
    try {
      let response;
      if (filterOption === "Ongoing") {
        response = await axios.get(`http://localhost:3000/auctioneer/getOngoingAuctions/${auctioneer._id}`);
      } else if (filterOption === "Expired") {
        response = await axios.get(`http://localhost:3000/auctioneer/getExpiredAuctions/${auctioneer._id}`);
      } else {
        response = await axios.get(`http://localhost:3000/auctioneer/getAllAuctions/${auctioneer._id}`);
      }
      console.log(response.data);
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

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      {/* Search and Filter Section */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background px-4 py-2 border-b">
        <div className="flex items-center justify-center flex-1 mr-4">
          <div className="relative mr-4">
            <Input
              type="search"
              placeholder="Search..."
              className=" font-akshar w-96 rounded-lg bg-background pl-8"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-32 gap-1 font-akshar">
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap font-akshar">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="font-akshar">Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filterOption === "All"}
                onClick={() => handleFilterChange("All")}
                className="font-akshar"
              >
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterOption === "Expired"}
                onClick={() => handleFilterChange("Expired")}
                className="font-akshar"
              >
                Expired
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterOption === "Ongoing"}
                onClick={() => handleFilterChange("Ongoing")}
                className="font-akshar"
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
        <nav className="flex flex-col items-center gap-4 px-2 py-5 bg-white shadow-lg w-64  mb-4">
          <ul className="flex flex-col gap-2">
            <li>
          <Link to="#" >
          <div className="flex items-center mb-2">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="font-bold text-secondary ">
          <path d="M2.8 1L2.74967 0.99997C2.52122 0.999752 2.32429 0.999564 2.14983 1.04145C1.60136 1.17312 1.17312 1.60136 1.04145 2.14983C0.999564 2.32429 0.999752 2.52122 0.99997 2.74967L1 2.8V5.2L0.99997 5.25033C0.999752 5.47878 0.999564 5.67572 1.04145 5.85017C1.17312 6.39864 1.60136 6.82688 2.14983 6.95856C2.32429 7.00044 2.52122 7.00025 2.74967 7.00003L2.8 7H5.2L5.25033 7.00003C5.47878 7.00025 5.67572 7.00044 5.85017 6.95856C6.39864 6.82688 6.82688 6.39864 6.95856 5.85017C7.00044 5.67572 7.00025 5.47878 7.00003 5.25033L7 5.2V2.8L7.00003 2.74967C7.00025 2.52122 7.00044 2.32429 6.95856 2.14983C6.82688 1.60136 6.39864 1.17312 5.85017 1.04145C5.67572 0.999564 5.47878 0.999752 5.25033 0.99997L5.2 1H2.8ZM2.38328 2.01382C2.42632 2.00348 2.49222 2 2.8 2H5.2C5.50779 2 5.57369 2.00348 5.61672 2.01382C5.79955 2.05771 5.94229 2.20045 5.98619 2.38328C5.99652 2.42632 6 2.49222 6 2.8V5.2C6 5.50779 5.99652 5.57369 5.98619 5.61672C5.94229 5.79955 5.79955 5.94229 5.61672 5.98619C5.57369 5.99652 5.50779 6 5.2 6H2.8C2.49222 6 2.42632 5.99652 2.38328 5.98619C2.20045 5.94229 2.05771 5.79955 2.01382 5.61672C2.00348 5.57369 2 5.50779 2 5.2V2.8C2 2.49222 2.00348 2.42632 2.01382 2.38328C2.05771 2.20045 2.20045 2.05771 2.38328 2.01382ZM9.8 1L9.74967 0.99997C9.52122 0.999752 9.32429 0.999564 9.14983 1.04145C8.60136 1.17312 8.17312 1.60136 8.04145 2.14983C7.99956 2.32429 7.99975 2.52122 7.99997 2.74967L8 2.8V5.2L7.99997 5.25033C7.99975 5.47878 7.99956 5.67572 8.04145 5.85017C8.17312 6.39864 8.60136 6.82688 9.14983 6.95856C9.32429 7.00044 9.52122 7.00025 9.74967 7.00003L9.8 7H12.2L12.2503 7.00003C12.4788 7.00025 12.6757 7.00044 12.8502 6.95856C13.3986 6.82688 13.8269 6.39864 13.9586 5.85017C14.0004 5.67572 14.0003 5.47878 14 5.25033L14 5.2V2.8L14 2.74967C14.0003 2.52122 14.0004 2.32429 13.9586 2.14983C13.8269 1.60136 13.3986 1.17312 12.8502 1.04145C12.6757 0.999564 12.4788 0.999752 12.2503 0.99997L12.2 1H9.8ZM9.38328 2.01382C9.42632 2.00348 9.49222 2 9.8 2H12.2C12.5078 2 12.5737 2.00348 12.6167 2.01382C12.7995 2.05771 12.9423 2.20045 12.9862 2.38328C12.9965 2.42632 13 2.49222 13 2.8V5.2C13 5.50779 12.9965 5.57369 12.9862 5.61672C12.9423 5.79955 12.7995 5.94229 12.6167 5.98619C12.5737 5.99652 12.5078 6 12.2 6H9.8C9.49222 6 9.42632 5.99652 9.38328 5.98619C9.20045 5.94229 9.05771 5.79955 9.01382 5.61672C9.00348 5.57369 9 5.50779 9 5.2V2.8C9 2.49222 9.00348 2.42632 9.01382 2.38328C9.05771 2.20045 9.20045 2.05771 9.38328 2.01382ZM2.74967 7.99997L2.8 8H5.2L5.25033 7.99997C5.47878 7.99975 5.67572 7.99956 5.85017 8.04145C6.39864 8.17312 6.82688 8.60136 6.95856 9.14983C7.00044 9.32429 7.00025 9.52122 7.00003 9.74967L7 9.8V12.2L7.00003 12.2503C7.00025 12.4788 7.00044 12.6757 6.95856 12.8502C6.82688 13.3986 6.39864 13.8269 5.85017 13.9586C5.67572 14.0004 5.47878 14.0003 5.25033 14L5.2 14H2.8L2.74967 14C2.52122 14.0003 2.32429 14.0004 2.14983 13.9586C1.60136 13.8269 1.17312 13.3986 1.04145 12.8502C0.999564 12.6757 0.999752 12.4788 0.99997 12.2503L1 12.2V9.8L0.99997 9.74967C0.999752 9.52122 0.999564 9.32429 1.04145 9.14983C1.17312 8.60136 1.60136 8.17312 2.14983 8.04145C2.32429 7.99956 2.52122 7.99975 2.74967 7.99997ZM2.8 9C2.49222 9 2.42632 9.00348 2.38328 9.01382C2.20045 9.05771 2.05771 9.20045 2.01382 9.38328C2.00348 9.42632 2 9.49222 2 9.8V12.2C2 12.5078 2.00348 12.5737 2.01382 12.6167C2.05771 12.7995 2.20045 12.9423 2.38328 12.9862C2.42632 12.9965 2.49222 13 2.8 13H5.2C5.50779 13 5.57369 12.9965 5.61672 12.9862C5.79955 12.9423 5.94229 12.7995 5.98619 12.6167C5.99652 12.5737 6 12.5078 6 12.2V9.8C6 9.49222 5.99652 9.42632 5.98619 9.38328C5.94229 9.20045 5.79955 9.05771 5.61672 9.01382C5.57369 9.00348 5.50779 9 5.2 9H2.8ZM9.8 8L9.74967 7.99997C9.52122 7.99975 9.32429 7.99956 9.14983 8.04145C8.60136 8.17312 8.17312 8.60136 8.04145 9.14983C7.99956 9.32429 7.99975 9.52122 7.99997 9.74967L8 9.8V12.2L7.99997 12.2503C7.99975 12.4788 7.99956 12.6757 8.04145 12.8502C8.17312 13.3986 8.60136 13.8269 9.14983 13.9586C9.32429 14.0004 9.52122 14.0003 9.74967 14L9.8 14H12.2L12.2503 14C12.4788 14.0003 12.6757 14.0004 12.8502 13.9586C13.3986 13.8269 13.8269 13.3986 13.9586 12.8502C14.0004 12.6757 14.0003 12.4788 14 12.2503L14 12.2V9.8L14 9.74967C14.0003 9.52122 14.0004 9.32429 13.9586 9.14983C13.8269 8.60136 13.3986 8.17312 12.8502 8.04145C12.6757 7.99956 12.4788 7.99975 12.2503 7.99997L12.2 8H9.8ZM9.38328 9.01382C9.42632 9.00348 9.49222 9 9.8 9H12.2C12.5078 9 12.5737 9.00348 12.6167 9.01382C12.7995 9.05771 12.9423 9.20045 12.9862 9.38328C12.9965 9.42632 13 9.49222 13 9.8V12.2C13 12.5078 12.9965 12.5737 12.9862 12.6167C12.9423 12.7995 12.7995 12.9423 12.6167 12.9862C12.5737 12.9965 12.5078 13 12.2 13H9.8C9.49222 13 9.42632 12.9965 9.38328 12.9862C9.20045 12.9423 9.05771 12.7995 9.01382 12.6167C9.00348 12.5737 9 12.5078 9 12.2V9.8C9 9.49222 9.00348 9.42632 9.01382 9.38328C9.05771 9.20045 9.20045 9.05771 9.38328 9.01382Z" 
          fill="currentColor" 
          fill-rule="evenodd" 
          clip-rule="evenodd">
          </path>
          </svg>
          <span className=" text-secondary font-akshar text-xl font-semibold  ml-2"> Auctioneer Dashboard</span> 
          </div>
          </Link>
            </li>
            <li>
              <Link to="/auctioneerProfile" >
              <div className="flex items-center mb-2">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="font-bold text-brownDark">
                <path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" 
                fill="currentColor" 
                fill-rule="evenodd" 
                clip-rule="evenodd">
                </path>
                </svg>
                <span className="text-brownDark font-akshar text-xl font-semibold  ml-2">My Profile</span>   
                </div>
              </Link>
            </li>
            <li>
              <Link to="#" >
              <div className="flex items-center mb-2">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="font-bold text-brownDark">
                <path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V4.70711L9.29289 2H3.5ZM2 2.5C2 1.67157 2.67157 1 3.5 1H9.5C9.63261 1 9.75979 1.05268 9.85355 1.14645L12.7803 4.07322C12.921 4.21388 13 4.40464 13 4.60355V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5ZM4.75 7.5C4.75 7.22386 4.97386 7 5.25 7H7V5.25C7 4.97386 7.22386 4.75 7.5 4.75C7.77614 4.75 8 4.97386 8 5.25V7H9.75C10.0261 7 10.25 7.22386 10.25 7.5C10.25 7.77614 10.0261 8 9.75 8H8V9.75C8 10.0261 7.77614 10.25 7.5 10.25C7.22386 10.25 7 10.0261 7 9.75V8H5.25C4.97386 8 4.75 7.77614 4.75 7.5Z" 
                fill="currentColor" 
                fill-rule="evenodd" 
                clip-rule="evenodd">
                </path>
                </svg>
                <span className="text-brownDark font-akshar text-xl font-semibold  ml-2">Post Auctions</span>
                </div>  
              </Link>
            </li>
            <li>
              <Link to="#" >
              <div className="flex items-center mb-2">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="font-bold text-brownDark">
                <path d="M10 3.5C10 4.70948 9.14112 5.71836 8 5.94999V13.5C8 13.7761 7.77614 14 7.5 14C7.22386 14 7 13.7761 7 13.5V5.94999C5.85888 5.71836 5 4.70948 5 3.5C5 2.11929 6.11929 1 7.5 1C8.88071 1 10 2.11929 10 3.5Z" 
                fill="currentColor" 
                fill-rule="evenodd" 
                clip-rule="evenodd">
                </path>
                </svg>
                <span className="text-brownDark font-akshar text-xl font-semibold  ml-2">Delivery Tracking</span> 
                </div>
              </Link>
            </li>
            <li>
              <Link to="/AuctioneerReportG" >
              <div className="flex items-center mb-2">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="font-bold text-brownDark ">
                <path d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z" 
                fill="currentColor" 
                fill-rule="evenodd" 
                clip-rule="evenodd">
                </path>
                </svg>
                <span className="text-brownDark font-akshar text-xl font-semibold  ml-2">Generate Report</span> 
                </div>
              </Link>
            </li>
            <hr className="border-gray-600 my-4 " />
            <li>
              <Link to="/auctioneerLogin" onClick={handleLogout}> 
              <div className="flex items-center mb-2">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="font-bold text-brownDark">
                <path d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z" 
                fill="currentColor" 
                fill-rule="evenodd" 
                clip-rule="evenodd">
                </path>
                </svg>
                <span className="text-brownDark font-akshar text-xl font-semibold  ml-2">Logout</span> 
                </div>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Card Component */}
        <div className="ml-4  sm:mt-0 flex-1">
          <Dialog>
            <Card>
              <CardHeader>
                <CardTitle className="font-akshar text-secondary text-4xl ">My Auctions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden md:table-cell  text-brownDark font-akshar text-xl font-semibold mb-2">
                        Auction Image
                      </TableHead>
                      <TableHead className="hidden md:table-cell  text-brownDark font-akshar text-xl font-semibold mb-2">
                        Auction Title
                      </TableHead>
                      <TableHead className="hidden md:table-cell  text-brownDark font-akshar text-xl font-semibold mb-2">
                        Description
                      </TableHead>
                      <TableHead className="hidden md:table-cell  text-brownDark font-akshar text-xl font-semibold mb-2">
                        Starting Price
                      </TableHead>
                      <TableHead className="hidden md:table-cell  text-brownDark font-akshar text-xl font-semibold mb-2">
                        Created At
                      </TableHead>
                      <TableHead className="hidden md:table-cell  text-brownDark font-akshar text-xl font-semibold mb-2">
                        No of bids placed
                      </TableHead>
                    </TableRow>
                  </TableHeader>
 
                  <TableBody>
                    {filteredData.map((auction, index) => (
                      <TableRow key={index}>
                        <TableCell className="hidden sm:table-cell font-akshar">
                          {auction.auctionImages.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Auction Image ${index}`}
                            />
                          ))}
                        </TableCell>

                        <TableCell className="hidden md:table-cell font-akshar">
                          {auction.auctionTitle}
                        </TableCell>
                        <TableCell className="hidden md:table-cell font-akshar">
                          {auction.auctionDescription}
                        </TableCell>
                        <TableCell className="hidden md:table-cell font-akshar">
                          {auction.auctionStartingPrice}
                        </TableCell>
                        <TableCell className="hidden md:table-cell font-akshar">
                          {new Date(auction.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell className="hidden md:table-cell font-akshar">
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
