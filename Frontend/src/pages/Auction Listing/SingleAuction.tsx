import React, { SetStateAction, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { formatDuration, intervalToDuration } from "date-fns";
import ImageGallery from "react-image-gallery";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { Breadcrumb, Button, Input } from "antd";
import "react-rater/lib/react-rater.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { Icon } from "@iconify/react";
import visibilityIcon from "@iconify-icons/mdi/visibility";
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
import { useSelector } from "react-redux";

interface Auction {
  auctioneerId: string;
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

const SingleAuction: React.FC = () => {
  const auctioneer = useSelector((state: any) => state.auctioneer.auctioneer);
  const bidder = useSelector((state: any) => state.bidder.bidder);

  const { id } = useParams<{ id: string }>();

  const [auction, setAuction] = useState<Auction | undefined>();
  const [auctioneername, setAuctioneername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState<string>("");
  const [bidValue, setBidValue] = useState<number>(0);
  const [alertMessage, setAlertMessage] = useState<string>("");

  //Fetch the Selected Auction
  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await axios.get<{
          success: boolean;
          auction: Auction;
        }>(`http://localhost:3000/auctions/${id}`);
        setAuction(response.data.auction);
      } catch (error) {
        console.error("Error fetching auction:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAuction();
    console.log(auctioneer);
    console.log(bidder);
  }, [id]);

  //Getting auction name accoding to the auction
  useEffect(() => {
    const fetchAuctioneer = async () => {
      try {
        const response = await axios.get<{
          [x: string]: SetStateAction<string>;
        }>(`http://localhost:3000/auctioneer/getOne/${auction?.auctioneerId}`);
        setAuctioneername(response.data.companyname);
      } catch (error) {
        console.error("Error fetching auction:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAuctioneer();
  }, [auction?.auctioneerId]);

  //Calculating the auction duration
  useEffect(() => {
    if (auction) {
      const interval = setInterval(() => {
        const now = new Date();
        const duration = intervalToDuration({
          start: now,
          end: new Date(auction.auctionDuration),
        });
        setRemainingTime(
          formatDuration(duration, {
            delimiter: ", ",
            format: ["days", "hours", "minutes", "seconds"],
          })
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [auction]);

  const handleBidValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBidValue(parseFloat(e.target.value));
  };

  //Updating the Current Bid
  const updateBid = async (newBid: number) => {
    try {
      await axios.put(`http://localhost:3000/auctions/update/${id}`, {
        newBid,
      });
      if (auction) {
        const updatedAuction = { ...auction, currentBid: newBid };
        setAuction(updatedAuction);
      }
    } catch (error) {
      console.error("Error updating bid in backend:", error);
    }
  };

  //Handling the Current Bid Validations
  const handlePlaceBid = () => {
    if (!auction) {
      return;
    }

    if (bidValue <= auction.auctionStartingPrice) {
      setAlertMessage("Bid value must be greater than the starting price.");
    } else if (bidValue <= auction.currentBid) {
      setAlertMessage("Bid value must be greater than the current bid.");
    } else {
      setAlertMessage("Are you sure you want to bid with the entered price?");
    }
  };

  // Update bid on Click Functions
  const handleConfirmBid = () => {
    const fetchBidModel = async () => {
      try {
        if (auction && auctioneer) {
          const response = await axios.post("http://localhost:3000/bids/save", {
            auctionId: auction._id,
            auctioneerId: auctioneer._id,
            bidderId: bidder._id,
            bidPrice: bidValue,
          });
        }
      } catch (error) {
        console.error("Error fetching auction:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBidModel();
    updateBid(bidValue);
  };

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb className="mt-4 mb-2 ml-10">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/auction/listedAuctions">Listed Auctions</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Single Auctions</Breadcrumb.Item>
      </Breadcrumb>

      <section className="container max-w-[1600px] py-5 flex relative">
        {isLoading ? (
          <div className="text-center">Loading auction...</div>
        ) : (
          auction && (
            <div className="flex items-start">
              <div className="w-3/6 mr-4 relative">
                <ImageGallery
                  showBullets={false}
                  showFullscreenButton={true}
                  showPlayButton={false}
                  items={auction.auctionImages.map((image) => ({
                    original: image,
                    thumbnail: image,
                  }))}
                  thumbnailPosition="bottom"
                  showNav={false}
                  showIndex={true}
                />
              </div>

              <div className="flex flex-col ml-10">
                <h2 className="text-3xl font-bold mb-10 font-amethysta">
                  {auction.auctionTitle}
                </h2>
                <p className="text-sm text-gray-500 mb-3 ">
                  Listed by: {auctioneername}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  Category: {auction.auctionCategory}
                </p>

                <p className="  text-gray-500  text-sm flex items-center mr-5 mb-3">
                  <Icon icon={visibilityIcon} className="mr-2" />
                  {auction.viewCount} Views
                </p>
                <p className="text-lg font-semibold mb-3">
                  Created Date: {new Date(auction.createdAt).toLocaleString()}
                </p>
                <p className="text-lg font-semibold mb-3">
                  Starting Bid: ${auction.auctionStartingPrice}
                </p>
                <p className="text-lg font-semibold mb-3">
                  Current Bid: ${auction.currentBid}
                </p>
                {auction.isExpired ? (
                  <p className="mt-12 text-3xl font-semibold mb-3 text-red-500">
                    Auction has been Expired !!!
                  </p>
                ) : (
                  <>
                    <p className="text-lg mb-5">
                      Remaining Time:{" "}
                      <span className="flex items-center font-amethysta">
                        {remainingTime.split(", ").map((time, index) => (
                          <span key={index} className="flex items-center">
                            <span className="text-xl font-bold mr-1">
                              {time}
                            </span>
                            {index !== remainingTime.split(", ").length - 1 && (
                              <span className="text-lg opacity-50 mr-1">:</span>
                            )}
                          </span>
                        ))}
                      </span>
                    </p>

                    <div className="flex justify-between items-center">
                      <Input
                        type="number"
                        placeholder="Enter bid value"
                        className="border border-gray-300 p-2 rounded-md mr-2 h-10 w-40"
                        value={bidValue}
                        onChange={handleBidValueChange}
                      />{" "}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            className="flex items-center justify-center bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 h-10"
                            onClick={handlePlaceBid}
                          >
                            <BiShoppingBag className="mr-2" />
                            Place Bid
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to bid?
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogDescription>
                            {alertMessage}
                          </AlertDialogDescription>
                          <AlertDialogFooter>
                            {alertMessage ===
                            "Are you sure you want to bid with the entered price?" ? (
                              <>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    handleConfirmBid();
                                  }}
                                >
                                  Confirm
                                </AlertDialogAction>
                              </>
                            ) : (
                              <AlertDialogCancel>
                                {alertMessage && "Cancel"}
                              </AlertDialogCancel>
                            )}
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <button className="flex items-center justify-center bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600">
                        <AiOutlineHeart className="mr-2" />
                        Add to Watchlist
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )
        )}
      </section>

      {auction && (
        <div className="mb-10 ml-10 w-2/4 ">
          <h1>Description:</h1>
          <h1 className="text-sm mt-7 font-bold">Item Details</h1>
          <p className="text-sm mt-2 ">{auction.auctionDescription}</p>
        </div>
      )}
    </>
  );
};

export default SingleAuction;
