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
  leadingBidderName: string;
}

const SingleAuction: React.FC = () => {
  //Getting the States of Auctoneer and Bidder
  const auctioneer = useSelector((state: any) => state.auctioneer.auctioneer);
  const bidder = useSelector((state: any) => state.bidder.bidder);

  const { id } = useParams<{ id: string }>();

  const [auction, setAuction] = useState<Auction | undefined>();
  const [auctioneername, setAuctioneername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState<string>("");
  const [bidValue, setBidValue] = useState<number>(0);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [leadingBiddername, setLeadingBiddername] = useState<string>("");

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
  }, [id]);

  // Update both bid and leading bidder
  const updateBidAndLeadingBidder = async (
    newBid: number,
    leadingBidder: string
  ) => {
    try {
      await axios.put(
        `http://localhost:3000/auctions/updateBidAndLeadingBidder/${id}`,
        {
          newBid,
          leadingBidder,
        }
      );
      if (auction) {
        const updatedAuction = {
          ...auction,
          currentBid: newBid,
          leadingBidderName: leadingBidder,
        };
        setAuction(updatedAuction);
      }
    } catch (error) {
      console.error("Error updating bid and leading bidder in backend:", error);
    }
  };

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
    //Saving the bid details to the Bid Model
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

    //Getting the Leading bidder name
    const fetchbidderName = async () => {
      try {
        const response = await axios.get<{
          [x: string]: SetStateAction<string>;
        }>(`http://localhost:3000/bidder/getOne/${bidder?._id}`);
        setLeadingBiddername(response.data.firstname);
      } catch (error) {
        console.error("Error fetching auction:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchbidderName();
    updateBidAndLeadingBidder(bidValue, leadingBiddername);
  };

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb className="mt-4 mb-2 ml-10">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/auction/listedAuctions">Auctions</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Single Auctions</Breadcrumb.Item>
      </Breadcrumb>

      <section className="container max-w-[1600px]  py-5 flex relative ">
        {isLoading ? (
          <div className="text-center w-100 h-100">Loading auction...</div>
        ) : (
          auction && (
            <div className="flex items-start">
              {/* Image Box */}
              <div className="w-3/6 mr-4 relative ml-6">
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

              {/* Other Content */}
              <div className="flex flex-col flex-1 ml-10">
                <p className="text-sm text-gray-500 mb-3  font-semibold font-sourceSans3">
                  Listed by: {auctioneername}
                </p>
                <h2 className="text-3xl font-bold mb-5 font-sangbleu w-4/6">
                  {auction.auctionTitle}
                </h2>
                <p className="  text-gray-500  text-sm flex items-center font-semibold font-sourceSans3  mb-2">
                  <Icon icon={visibilityIcon} className="mr-1" />
                  {auction.viewCount} Views
                </p>

                <p className="text-sm text-gray-500 mb-2 font-sourceSans3 font-semibold">
                  Category: {auction.auctionCategory}
                </p>

                <p className="text-sm  text-gray-500 font-semibold  mb-3 font-sourceSans3">
                  Created Date: {new Date(auction.createdAt).toLocaleString()}
                </p>
                <p className="text-lg  font-semibold mb-3 font-sourceSans3">
                  Starting At: ${auction.auctionStartingPrice}
                </p>
                <p className="text-lg font-semibold mb-3 font-sourceSans3">
                  Current Bid: ${auction.currentBid}
                </p>
                <p className="text-lg font-semibold mb-3 font-sourceSans3">
                  Leading bidder:
                  {auction.leadingBidderName}
                </p>
                {auction.isExpired ? (
                  <p className="mt-12 text-3xl font-semibold mb-3 text-red-600 font-sourceSans3">
                    Auction has been Expired !!!
                  </p>
                ) : (
                  <>
                    <p className="text-lg font-semibold mb-3 font-sourceSans3 mt-5">
                      Auction closes in:{" "}
                      <div className="flex items-center font-amethysta mt-2">
                        {remainingTime.split(", ").map((time, index) => (
                          <div key={index} className="flex items-center">
                            <div className="bg-gray-200 w-16 h-16 flex items-center justify-center mr-2 rounded-xs">
                              <span className="font-bold flex flex-col items-center">
                                <div className="text-2xl font-amethysta">
                                  {time.split(" ")[0]?.padStart(2, "0")}
                                </div>
                                <div className="text-xs text-gray-500 font-poppins font-bold uppercase mt-1">
                                  {time.split(" ")[1]}
                                </div>
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {time.split(" ")[2]?.padStart(2, "0")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </p>

                    <div className="flex mt-5 ">
                      <Input
                        type="number"
                        placeholder="Enter bid value"
                        className="border border-gray-300 p-2 rounded-md mr-1 h-10 w-40"
                        value={bidValue}
                        onChange={handleBidValueChange}
                      />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            className="flex items-center justify-center bg-blue-800 text-white px-5 py-2 rounded-md hover:bg-blue-600 h-10 ml-5"
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
                      <button className="flex items-center justify-center bg-red-800 text-white px-3 py-2 rounded-md hover:bg-red-600 h-10 w-2/5 ml-5">
                        <AiOutlineHeart className="mr-2" />
                        Add to Wishlist
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
        <div className="mb-10 ml-20 w-2/4 ">
          <h1 className="text-lg font-semibold  font-sourceSans3">
            Item Description:
          </h1>
          <p className="text-sm  mt-2 font-sangbleu">
            {auction.auctionDescription}
          </p>
        </div>
      )}
    </>
  );
};

export default SingleAuction;
