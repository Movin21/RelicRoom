'use client';
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from "@/components/ui/command"
  import { Link } from "react-router-dom";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
const AuctioneerProfile = () => {
  return( 
    <div className="flex">
    {/* Side Navigation */}
    <nav className="bg-gray-400 flex-col items-center gap-4 px-2 sm:py-5 mb-5 mt-5">
  <Command>
  <CommandList>
    <CommandGroup >
      <CommandItem>
      <Link
        to="#"> 
        {/* <Calendar className="mr-2 h-4 w-4" /> */}
        <span>Auctioneer Dashboard</span>
        </Link>
      </CommandItem>
      <CommandItem>
      <Link
        to="#"> 
        {/* <Calendar className="mr-2 h-4 w-4" /> */}
        <span>My Profile</span>
        </Link>
      </CommandItem>
      <CommandItem>
      <Link
        to="#"> 
        {/* <Calendar className="mr-2 h-4 w-4" /> */}
        <span>Post Auctions</span>
        </Link>
      </CommandItem>
    </CommandGroup>
    <CommandGroup >
    <CommandItem>
    <Link
        to="#"> 
        {/* <Calendar className="mr-2 h-4 w-4" /> */}
        <span>Delivery Tracking</span>
        </Link>
      </CommandItem>
      <CommandItem>
      <Link
        to="#"> 
        {/* <Calendar className="mr-2 h-4 w-4" /> */}
        <span>Generate Report</span>
        </Link>
      </CommandItem>
      <CommandSeparator/>
      <CommandItem>
      <Link
        to="#"> 
        {/* <Calendar className="mr-2 h-4 w-4" /> */}
        <span>Logout</span>
        </Link>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
</nav>



</div>



)};

export default AuctioneerProfile;

