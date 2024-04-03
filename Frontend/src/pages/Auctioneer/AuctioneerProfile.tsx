import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const AuctioneerProfile = () => {
  return (
    <div className="flex">
      {/* Side Navigation */}
      <nav className="flex flex-col items-center gap-4 px-2 py-5 bg-gray-400 rounded-lg w-48">
        <ul className="flex flex-col gap-2">
          <li>
          <Link to="/auctioneerPortal">
            <svg
                 className="w-5 h-5 mr-2"
                 width="15"
                 height="15"
                 viewBox="0 0 15 15"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.8 1L2.74967 0.99997C2.52122 0.999752 2.32429 0.999564 2.14983 1.04145C1.60136 1.17312 1.17312 1.60136 1.04145 2.14983C0.999564 2.32429 0.999752 2.52122 0.99997 2.74967L1 2.8V5.2L0.99997 5.25033C0.999752 5.47878 0.999564 5.67572 1.04145 5.85017C1.17312 6.39864 1.60136 6.82688 2.14983 6.95856C2.32429 7.00044 2.52122 7.00025 2.74967 7.00003L2.8 7H5.2L5.25033 7.00003C5.47878 7.00025 5.67572 7.00044 5.85017 6.95856C6.39864 6.82688 6.82688 6.39864 6.95856 5.85017C7.00044 5.67572 7.00025 5.47878 7.00003 5.25033L7 5.2V2.8L7.00003 2.74967C7.00025 2.52122 7.00044 2.32429 6.95856 2.14983C6.82688 1.60136 6.39864 1.17312 5.85017 1.04145C5.67572 0.999564 5.47878 0.999752 5.25033 0.99997L5.2 1H2.8ZM2.38328 2.01382C2.42632 2.00348 2.49222 2 2.8 2H5.2C5.50779 2 5.57369 2.00348 5.61672 2.01382C5.79955 2.05771 5.94229 2.20045 5.98619 2.38328C5.99652 2.42632 6 2.49222 6 2.8V5.2C6 5.50779 5.99652 5.57369 5.98619 5.61672C5.94229 5.79955 5.79955 5.94229 5.61672 5.98619C5.57369 5.99652 5.50779 6 5.2 6H2.8C2.49222 6 2.42632 5.99652 2.38328 5.98619C2.20045 5.94229 2.05771 5.79955 2.01382 5.61672C2.00348 5.57369 2 5.50779 2 5.2V2.8C2 2.49222 2.00348 2.42632 2.01382 2.38328C2.05771 2.20045 2.20045 2.05771 2.38328 2.01382Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
            Dashboard
          </Link>
          </li>
          <li>
            <Link to="#" className="nav-link">My Profile</Link>
          </li>
          <li>
            <Link to="#" className="nav-link">Post Auctions</Link>
          </li>
          <li>
            <Link to="#" className="nav-link">Delivery Tracking</Link>
          </li>
          <li>
            <Link to="#" className="nav-link">Generate Report</Link>
          </li>
          <hr className="border-gray-600 my-4" />
          <li>
            <Link to="#" className="nav-link">Logout</Link>
          </li>
        </ul>
      </nav>

      {/* Auctioneer Profile Card */}
      <div className="flex justify-center items-center flex-1">
        <Card className="w-[500px]">
          <CardContent>
          <form>
          <div className="grid w-full items-center gap-4">

      
            <Avatar className="mx-auto">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>


            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Company Name</Label>
              <Input id="companyname"/>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry"/>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email"/>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password"/>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input id="address"/>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="contactnumber">Contact Number</Label>
              <Input id="contactnumber"/>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="country">Country</Label>
              <Input id="country"/>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input id="description"/>
            </div>

          </div>
        
        </form>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button>Close Account</Button>
            <Button variant="outline">Edit Info</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AuctioneerProfile;
