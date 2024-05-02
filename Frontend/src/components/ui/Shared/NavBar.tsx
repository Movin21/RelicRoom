import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo/Logo.png";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

function NavBar() {
  return (
    <div>
      {/* Upper Navbar */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 bg-gray-100">
        <div>
          <Link to="/">
            <img
              src={Logo}
              alt="RelicRoom Logo"
              className="max-w-[10rem] w-full"
            />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Menubar>
            <MenubarMenu>
              <div className="font-akshar text-primary font-bold ">
                <MenubarTrigger className="border-none text-lg cborder-none hover:none">
                  <Link
                    to="#"
                    className="hover:underline transition-all duration-300 text-medium"
                  >
                    Create Account
                  </Link>
                </MenubarTrigger>
              </div>
              <MenubarContent>
                <MenubarItem
                  className={`font-akshar text-primary hover:text-secondary `}
                >

                  <Link to="/bidderSignup">Bidder Account</Link>

                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem
                  className={`font-akshar text-primary hover:text-secondary `}
                >
                  <Link to="/auctioneerRegister">Auctioneer Account</Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem
                  className={`font-akshar text-primary hover:text-secondary `}
                >
                  <Link to="/repairSpacialist/saveRs">
                    Repair Spacialist Account
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem
                  className={`font-akshar text-primary hover:text-secondary `}
                >
                  <Link to="/vintageexpert/Register">Vintage Expert</Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <div className="font-akshar text-primary text-medium">
            <HoverCard>
              <HoverCardTrigger>
                <Link
                  to="/loginDashboard"
                  className="hover:underline text-medium"
                >
                  Login
                </Link>
              </HoverCardTrigger>
              <HoverCardContent>Login to the Account</HoverCardContent>
            </HoverCard>
          </div>
          <Avatar>
            <Link to="#">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Link>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      {/* Second Navbar  */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-2">
        <NavigationMenu className="mb-4 md:mb-0">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`font-akshar text-lg md:text-xl lg:stext-lg text-primary hover:text-secondary hover:bg-white ${navigationMenuTriggerStyle()}`}
              >
                <Link to="auction/listedAuctions">Auctions</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`font-akshar text-lg md:text-xl lg:text-lg text-primary hover:text-secondary hover:bg-white ${navigationMenuTriggerStyle()}`}
              >
                <Link to="/complaint">Customer Care</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`font-akshar text-lg md:text-lg lg:text-lg text-primary hover:text-secondary hover:bg-white `}
              >
                <Link
                  className={`font-akshar text-lg md:text-xl lg:text-lg text-primary hover:text-secondary hover:bg-white ${navigationMenuTriggerStyle()}`}
                  to=""
                >
                  Services
                  <span>
                    <div
                      className={`ml-2 transition-all group-hover:rotate-180`}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </span>
                </Link>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={`font-akshar text-lg md:text-lg lg:text-lg text-primary hover:text-secondary`}
              >
                <DropdownMenuSeparator />
                <Link to="/blog/PostView">
                  <DropdownMenuItem
                    className={`font-akshar text-lg md:text-xl lg:text-lg text-primary hover:text-secondary`}
                  >
                    Blog Space
                  </DropdownMenuItem>
                </Link>
                <Link to="/repairSpacialist/rslist">
                  <DropdownMenuItem
                    className={`font-akshar text-lg md:text-xl lg:text-lg text-primary hover:text-secondary`}
                  >
                    Repair Specialists
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`font-akshar text-lg md:text-xl lg:text-lg text-primary hover:text-secondary hover:bg-white ${navigationMenuTriggerStyle()}`}
              >
                <Link to="#">About Us</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search here.."
            className="flex-1 w-full md:w-60 transition-all duration-300 border border-gray-300 px-4 py-1 focus:outline-none focus:border-1 focus:border-primary hover:w-48 lg:hover:w-80 text-lg md:text-xl lg:text-lg"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 group-hover:text-primary">
            <Link to="">
              <svg
                width="20"
                height="20"
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
      </div>
    </div>
  );
}

export default NavBar;
