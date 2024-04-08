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
export function AdminAuctions() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAuctions, setActiveAuctions] = useState<Auction[]>([]);
  const [expiredAuctions, setExpiredAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/auctions")
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
  }, []);

  const filteredAuctions = auctions.filter((auction) =>
    auction.auctionTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredActiveAuctions = activeAuctions.filter((auction) =>
    auction.auctionTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredExpiredAuctions = expiredAuctions.filter((auction) =>
    auction.auctionTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div>
        <Breadcrumb className="hidden md:flex ml-7 ">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="#">Analytics Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="#">Auctions</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
        <div className="relative  flex-1 md:grow-0 mt-2  ml-7">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="expired">Expired</TabsTrigger>
                </TabsList>
              </div>
            </div>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>All Posted Auctions</CardTitle>
                  <CardDescription>
                    Manage all auctions and view their performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span>Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="md:table-cell">
                          Starting Price
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Category
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAuctions.map((auction) => (
                        <TableRow key={auction._id}>
                          <TableCell className="hidden sm:table-cell">
                            <img
                              src={auction.auctionImages[0]}
                              alt={auction.auctionTitle}
                            />
                          </TableCell>
                          <TableCell className="font-amethysta">
                            {auction.auctionTitle}
                          </TableCell>
                          <TableCell>
                            {auction.isExpired ? (
                              <Badge
                                variant="outline"
                                className="bg-red-400 font-amethysta"
                              >
                                Expired
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-green-400 font-amethysta"
                              >
                                Active
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className=" font-amethysta hidden md:table-cell">
                            ${auction.auctionStartingPrice}
                          </TableCell>
                          <TableCell className="hidden md:table-cell font-amethysta">
                            {auction.auctionCategory}
                          </TableCell>
                          <TableCell className="hidden md:table-cell font-amethysta">
                            {new Date(auction.createdAt).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    This is Administrator Preview
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="active">
              <Card>
                <CardHeader>
                  <CardTitle>Active Auctions</CardTitle>
                  <CardDescription>
                    Manage all active auctions and view their performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span>Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Starting Price
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Current Bid
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          <span className="">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredActiveAuctions.map((auction) => (
                        <TableRow key={auction._id}>
                          <TableCell className="hidden sm:table-cell">
                            <img
                              src={auction.auctionImages[0]}
                              alt={auction.auctionTitle}
                            />
                          </TableCell>
                          <TableCell className="font-amethysta">
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
                          <TableCell className="font-amethysta hidden md:table-cell">
                            ${auction.auctionStartingPrice}
                          </TableCell>
                          <TableCell className="font-amethysta hidden md:table-cell">
                            {auction.auctionCategory}
                          </TableCell>
                          <TableCell className="font-amethysta hidden md:table-cell">
                            {new Date(auction.createdAt).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Button className="bg-red-500">Terminate</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    This is Administrator Preview
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="expired">
              <Card>
                <CardHeader>
                  <CardTitle>Expired Auctions</CardTitle>
                  <CardDescription>
                    Manage all expired auctions and view their performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span>Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Starting Price
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Current Bid
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExpiredAuctions.map((auction) => (
                        <TableRow key={auction._id}>
                          <TableCell className="font-amethysta hidden sm:table-cell">
                            <img
                              src={auction.auctionImages[0]}
                              alt={auction.auctionTitle}
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
                          <TableCell className=" font-amethysta hidden md:table-cell">
                            ${auction.auctionStartingPrice}
                          </TableCell>
                          <TableCell className="hidden md:table-cell font-amethysta ">
                            {auction.auctionCategory}
                          </TableCell>
                          <TableCell className="hidden md:table-cell font-amethysta">
                            {new Date(auction.createdAt).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    This is Administrator Preview
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
