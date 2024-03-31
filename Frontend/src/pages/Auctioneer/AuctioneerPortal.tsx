import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Tabs, TabsContent } from "@/components/ui/tabs";

const AuctioneerPortal = () => {
  return (
  
    <div className="flex min-h-screen flex-col bg-muted/40">
            
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">

          <div className="relative ml-auto flex-1 md:grow-0">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>

              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                       
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      All
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Expired</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Ongoing
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              </header>
            </div>

          <div className="ml-4 mt-4 pl-60">
          <Dialog> 
            <Tabs value="all">
            <TabsContent value="all">

              <Card>
                <CardHeader>
                  <CardTitle>All Auctions</CardTitle>
                </CardHeader>
                <CardContent>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Auction Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Price
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Time Remaining
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          No of bids placed
                        </TableHead>
                      </TableRow>
                    </TableHeader>


                    <TableBody>
                      <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          {/* <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src="/placeholder.svg"
                            width="64"
                          /> */}
                        </TableCell>
                        <TableCell className="font-medium">
                          Laser Lemonade Machine
                        </TableCell>
                        <TableCell>
                        <Badge variant="secondary">Expired</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          $499.99
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          25
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          12
                        </TableCell>
                        <TableCell>
                        </TableCell>


                      </TableRow>
                      <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          {/* <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src="/placeholder.svg"
                            width="64"
                          /> */}
                        </TableCell>
                        <TableCell className="font-medium">
                          Hypernova Headphones
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Active</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          $129.99
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          100
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          35
                        </TableCell>
                        <TableCell>
                        </TableCell>


                      </TableRow>
                      <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          {/* <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src="/placeholder.svg"
                            width="64"
                          /> */}
                        </TableCell>
                        <TableCell className="font-medium">
                          AeroGlow Desk Lamp
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Active</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          $39.99
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          50
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          5
                        </TableCell>
                        <TableCell>
                        </TableCell>


                      </TableRow>
                      <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          {/* <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src="/placeholder.svg"
                            width="64"
                          /> */}
                        </TableCell>
                        <TableCell className="font-medium">
                          TechTonic Energy Drink
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">Expired</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          $2.99
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          0
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                         52
                        </TableCell>
                        <TableCell>
                        </TableCell>
                        </TableRow>

                    </TableBody>
                  </Table>
                </CardContent>
                 
              </Card>
 
            </TabsContent>
            </Tabs>
            </Dialog>  
            </div>
            <div className="flex">

    {/* Side Navigation */}
    <nav className="bg-gray-400 flex-col items-center gap-4 px-2 sm:py-5 mb-80">
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
      </div>
   
  )
}
export default AuctioneerPortal;