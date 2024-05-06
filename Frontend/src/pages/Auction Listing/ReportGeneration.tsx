import axios from "axios";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Auction {
  _id: string;
  auctioneerId: string; // Added auctioneerId field
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

export function ReportGeneration() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAuctions, setActiveAuctions] = useState<Auction[]>([]);
  const [expiredAuctions, setExpiredAuctions] = useState<Auction[]>([]);
  const [auctioneerId, setAuctioneerId] = useState(""); // State variable for auctioneer ID
  const auctioneer = useSelector((state: any) => state.auctioneer.auctioneer);

  useEffect(() => {
    // Set the auctioneerId after the auctioneer state is updated
    if (auctioneer) {
      setAuctioneerId(auctioneer._id);
    }
  }, [auctioneer]);

  //GEt all the auctions by auctioneer id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/admin/auctions/${auctioneerId}`
        );
        setAuctions(response.data);
        setActiveAuctions(
          response.data.filter((auction: Auction) => !auction.isExpired)
        );
        setExpiredAuctions(
          response.data.filter((auction: Auction) => auction.isExpired)
        );
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchData();
  }, [auctioneerId]);

  // Filter auctions based on search query and auctioneer ID
  const filteredAuctions = auctions.filter(
    (auction) =>
      auction.auctioneerId === auctioneerId &&
      auction.auctionTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredActiveAuctions = activeAuctions.filter(
    (auction) =>
      auction.auctioneerId === auctioneerId &&
      auction.auctionTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredExpiredAuctions = expiredAuctions.filter(
    (auction) =>
      auction.auctioneerId === auctioneerId &&
      auction.auctionTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div>
        <Breadcrumb className="hidden md:flex ml-7 ">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/auctionDashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/auction/generateReports">Generate Reports</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="active">
            <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">
                <TabsList>
                  <TabsTrigger value="active">Ongoing</TabsTrigger>
                  <TabsTrigger value="expired">Expired</TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="active">
              <Card>
                <CardHeader>
                  <CardTitle>Ongoing Auctions</CardTitle>
                  <CardDescription>View all expired auctions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden md:table-cell">
                          <span>Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>

                        <TableHead>
                          <p>{`View Report`}</p>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredActiveAuctions.map((auction) => (
                        <TableRow key={auction._id}>
                          <TableCell className="hidden md:table-cell">
                            <img
                              src={auction.auctionImages[0]}
                              alt={auction.auctionTitle}
                              className="w-20"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {auction.auctionTitle}
                          </TableCell>

                          <TableCell className="flex items-center">
                            <Link to={`/auction/ReportView/${auction._id}`}>
                              <Button className="bg-blue-800 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2">
                                View Report
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    This is Auctioneer Preview
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="expired">
              <Card>
                <CardHeader>
                  <CardTitle>Expired Auctions</CardTitle>
                  <CardDescription>View all expired auctions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden md:table-cell">
                          <span>Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>
                          <p>{`View Report`}</p>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExpiredAuctions.map((auction) => (
                        <TableRow key={auction._id}>
                          <TableCell className="hidden md:table-cell">
                            <img
                              src={auction.auctionImages[0]}
                              alt={auction.auctionTitle}
                              className="w-20"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {auction.auctionTitle}
                          </TableCell>

                          <TableCell className="flex items-center">
                            <Link to={`/auction/ReportView/${auction._id}`}>
                              <Button className="bg-blue-800 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2">
                                View Report
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    This is Auctioneer Preview
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

export default ReportGeneration;
