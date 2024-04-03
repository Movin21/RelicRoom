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

interface Auctioneer {
  _id: string;
  companyname: string;
  industry: string;
  description: string;
  email: string;
  password: string;
  mobilenumber: string;
  address: string;
  country: string;
  termsconditions: boolean;
  isActive: boolean;
  type: string;
  profileImage: string;
}

interface Bidder {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  contactnumber: string;
  isActive: boolean;
}

interface VintageExpert {
  _id: string;
  firstname: string;
  secondname: string;
  email: string;
  expertisecategoryarea: string;
  workingexperience: boolean;
  isActive: boolean;
}

interface RepairSpecialist {
  _id: string;
  name: string;
  address: string;
  username: string;
  specialization: string;
  certificates: string;
  contactNumber: string;
  email: string;
  isActive: boolean;
}

export function AdminUsers() {
  const [auctioneers, setAuctioneers] = useState<Auctioneer[]>([]);
  const [bidders, setBidders] = useState<Bidder[]>([]);
  const [vintageExperts, setVintageExperts] = useState<VintageExpert[]>([]);
  const [repairSpecialists, setRepairSpecialists] = useState<
    RepairSpecialist[]
  >([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/users/auctioneers")
      .then((response) => {
        setAuctioneers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching auctioneers:", error);
      });

    axios
      .get("http://localhost:5000/admin/users/bidders")
      .then((response) => {
        setBidders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bidders:", error);
      });

    axios
      .get("http://localhost:5000/admin/users/vintageExperts")
      .then((response) => {
        setVintageExperts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vintage experts:", error);
      });

    axios
      .get("http://localhost:5000/admin/users/repairSpecialists")
      .then((response) => {
        setRepairSpecialists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching repair specialists:", error);
      });
  }, []);

  const deleteAuctioneerAccount = (auctioneerId: string) => {
    axios
      .delete(`http://localhost:5000/admin/users/auctioneers/${auctioneerId}`)
      .then(() => {
        setAuctioneers((prevAuctioneers) =>
          prevAuctioneers.filter(
            (auctioneer) => auctioneer._id !== auctioneerId
          )
        );
      })
      .catch((error) => {
        console.error("Error deleting auctioneer account:", error);
      });
  };

  const deleteBidderAccount = (bidderId: string) => {
    axios
      .delete(`http://localhost:5000/admin/users/bidders/${bidderId}`)
      .then(() => {
        setBidders((prevBidders) =>
          prevBidders.filter((bidder) => bidder._id !== bidderId)
        );
      })
      .catch((error) => {
        console.error("Error deleting bidder account:", error);
      });
  };

  const deleteVintageExpertAccount = (expertId: string) => {
    axios
      .delete(`http://localhost:5000/admin/users/vintageExperts/${expertId}`)
      .then(() => {
        setVintageExperts((prevVintageExperts) =>
          prevVintageExperts.filter((expert) => expert._id !== expertId)
        );
      })
      .catch((error) => {
        console.error("Error deleting vintage expert account:", error);
      });
  };

  const deleteRepairSpecialistAccount = (specialistId: string) => {
    axios
      .delete(
        `http://localhost:5000/admin/users/repairSpecialists/${specialistId}`
      )
      .then(() => {
        setRepairSpecialists((prevRepairSpecialists) =>
          prevRepairSpecialists.filter(
            (specialist) => specialist._id !== specialistId
          )
        );
      })
      .catch((error) => {
        console.error("Error deleting repair specialist account:", error);
      });
  };

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
                <Link to="#">Users</Link>
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
          />
        </div>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="auctioneer">
            <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">
                <TabsList>
                  <TabsTrigger value="auctioneer">Auctioneers</TabsTrigger>
                  <TabsTrigger value="bidder">Bidders</TabsTrigger>
                  <TabsTrigger value="vintageExpert">
                    Vintage Experts
                  </TabsTrigger>
                  <TabsTrigger value="repairSpecialist">
                    Repair Specialists
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            <TabsContent value="auctioneer">
              <Card>
                <CardHeader>
                  <CardTitle>Auctioneers</CardTitle>
                  <CardDescription>
                    Manage all auctioneers and view their data.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="md:table-cell">Email</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Address
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Account Status
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auctioneers.map((auctioneer) => (
                        <TableRow key={auctioneer._id}>
                          <TableCell>{auctioneer.companyname}</TableCell>
                          <TableCell>{auctioneer.description}</TableCell>
                          <TableCell>{auctioneer.email}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {auctioneer.address}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {auctioneer.isActive ? (
                              <Badge className="bg-green-500">Active</Badge>
                            ) : (
                              <Badge className="bg-red-500">Deactivated</Badge>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Button
                              onClick={() =>
                                deleteAuctioneerAccount(auctioneer._id)
                              }
                            >
                              Deactivate Account
                            </Button>
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
            <TabsContent value="bidder">
              <Card>
                <CardHeader>
                  <CardTitle>Bidders</CardTitle>
                  <CardDescription>
                    Manage all bidders and view their data.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Contact Number</TableHead>
                        <TableHead>Account Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bidders.map((bidder) => (
                        <TableRow key={bidder._id}>
                          <TableCell>{bidder.firstname}</TableCell>
                          <TableCell>{bidder.lastname}</TableCell>
                          <TableCell>{bidder.email}</TableCell>
                          <TableCell>{bidder.address}</TableCell>
                          <TableCell>{bidder.contactnumber}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {bidder.isActive ? (
                              <Badge className="bg-green-500">Active</Badge>
                            ) : (
                              <Badge className="bg-red-500">Deactivated</Badge>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Button
                              onClick={() => deleteBidderAccount(bidder._id)}
                            >
                              Deactivate Account
                            </Button>
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
            <TabsContent value="vintageExpert">
              <Card>
                <CardHeader>
                  <CardTitle>Vintage Experts</CardTitle>
                  <CardDescription>
                    Manage all vintage experts and view their data.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Expertise Area</TableHead>
                        <TableHead>Working Experience</TableHead>
                        <TableHead>Account Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vintageExperts.map((expert) => (
                        <TableRow key={expert._id}>
                          <TableCell>{expert.firstname}</TableCell>
                          <TableCell>{expert.secondname}</TableCell>
                          <TableCell>{expert.email}</TableCell>
                          <TableCell>{expert.expertisecategoryarea}</TableCell>
                          <TableCell>
                            {expert.workingexperience ? "Yes" : "No"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {expert.isActive ? (
                              <Badge className="bg-green-500">Active</Badge>
                            ) : (
                              <Badge className="bg-red-500">Deactivated</Badge>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Button
                              onClick={() =>
                                deleteVintageExpertAccount(expert._id)
                              }
                            >
                              Deactivate Account
                            </Button>
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
            <TabsContent value="repairSpecialist">
              <Card>
                <CardHeader>
                  <CardTitle>Repair Specialists</CardTitle>
                  <CardDescription>
                    Manage all repair specialists and view their data.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Specialization</TableHead>
                        <TableHead>Certificates</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Account Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {repairSpecialists.map((specialist) => (
                        <TableRow key={specialist._id}>
                          <TableCell>{specialist.name}</TableCell>
                          <TableCell>{specialist.address}</TableCell>
                          <TableCell>{specialist.username}</TableCell>
                          <TableCell>{specialist.specialization}</TableCell>
                          <TableCell>{specialist.certificates}</TableCell>
                          <TableCell>{specialist.email}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {specialist.isActive ? (
                              <Badge className="bg-green-500">Active</Badge>
                            ) : (
                              <Badge className="bg-red-500">Deactivated</Badge>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Button
                              onClick={() =>
                                deleteRepairSpecialistAccount(specialist._id)
                              }
                            >
                              Deactivate Account
                            </Button>
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
