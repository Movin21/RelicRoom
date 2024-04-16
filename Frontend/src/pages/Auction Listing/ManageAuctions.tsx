import axios from "axios";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

import { Input } from "@/components/ui/input";

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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

export function ManageAuctions() {
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

  useEffect(() => {
    // Fetch auctions for the logged-in auctioneer
    axios
      .get(`http://localhost:3000/admin/auctions/${auctioneerId}`)
      .then((response) => {
        setAuctions(response.data);
        setActiveAuctions(
          response.data.filter((auction: Auction) => !auction.isExpired)
        );
        setExpiredAuctions(
          response.data.filter((auction: Auction) => auction.isExpired)
        );
      })
      .catch((error) => {
        console.error("Error fetching auctions:", error);
      });
  }, [auctioneerId]); // Dependency on auctioneerId

  const handleDeleteConfirmation = (auctionId: string) => {
    axios
      .delete(`http://localhost:3000/auctions/delete/${auctionId}`)
      .then((response) => {
        // Update the state to remove the deleted auction
        setAuctions(auctions.filter((auction) => auction._id !== auctionId));

        // Reload the page after successful deletion
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting auction:", error);
      });
  };

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
                <Link to="/manageAuctions">Manage Auctions</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
        <div className="relative flex-1 md:grow-0 mt-2 ml-7">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="active">
            <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">
                <TabsList>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="expired">Expired</TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="active">
              <Card>
                <CardHeader>
                  <CardTitle>Active Auctions</CardTitle>
                  <CardDescription>
                    Manage all created active auctions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden md:table-cell">
                          <span>Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Auctioneer
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          <p className="ml-4 md:ml-0">{`Actions (Update/Delete)`}</p>
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
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-green-400 font-amethysta"
                            >
                              Active
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell font-amethysta">
                            {auctioneer.companyname}
                          </TableCell>
                          <TableCell className="hidden md:table-cell font-amethysta">
                            {new Date(auction.createdAt).toLocaleString()}
                          </TableCell>
                          <TableCell className="flex items-center">
                            <Link to={`/auction/updateAuction/${auction._id}`}>
                              <Button className="bg-blue-800 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2">
                                Update
                              </Button>
                            </Link>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button className="bg-red-800 text-white px-3 py-1 rounded-md hover:bg-red-600">
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your Auction and remove
                                    the data from our system.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteConfirmation(auction._id)
                                    }
                                    className="bg-red-800 text-white px-3 py-1 rounded-md hover:bg-red-600 ml-2"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
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
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Current Bid
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          <p className="ml-4 md:ml-0">{`Actions (Update/Delete)`}</p>
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
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-red-400 font-amethysta"
                            >
                              Expired
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell font-amethysta">
                            {auction.currentBid}
                          </TableCell>
                          <TableCell className="hidden md:table-cell font-amethysta">
                            {new Date(auction.createdAt).toLocaleString()}
                          </TableCell>
                          <TableCell className="flex items-center">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button className="bg-red-800 text-white px-3 py-1 rounded-md hover:bg-red-600">
                                  Remove
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your Auction and remove
                                    the data from our system.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteConfirmation(auction._id)
                                    }
                                    className="bg-red-800 text-white px-3 py-1 rounded-md hover:bg-red-600 ml-2"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
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

export default ManageAuctions;
