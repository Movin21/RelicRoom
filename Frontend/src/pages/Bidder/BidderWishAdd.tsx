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
  //Getting the States of Auctioneer and Bidder
  const auctioneer = useSelector((state: any) => state.auctioneer.auctioneer);
  const bidder = useSelector((state: any) => state.bidder.bidder);
  const bidderId = bidder ? bidder._id : null;

  const { wishid } = useParams<{ wishid: string }>();

  const [auction, setAuction] = useState<Auction | undefined>();
  const [auctioneername, setAuctioneername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState<string>("");
  const [bidValue, setBidValue] = useState<number>(0);
  const [alertMessage, setAlertMessage] = useState<string>("");
  console.log(auction);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  //Fetch the Selected Auction
  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await axios.get<{
          success: boolean;
          auction: Auction;
        }>(`http://localhost:3000/auctions/${wishid}`);
        setAuction(response.data.auction);
      } catch (error) {
        console.error("Error fetching auction:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAuction();
  }, [wishid]);

  // Update both bid and leading bidder
  const updateBidAndLeadingBidder = async (
    newBid: number,
    leadingBidder: string
  ) => {
    try {
      console.log("leadingBidder", leadingBidder);
      await axios.put(
        `http://localhost:3000/auctions/updateBidAndLeadingBidder/${wishid}`,
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

  //Getting auction name according to the auctioneer
  useEffect(() => {
    const fetchAuctioneer = async () => {
      try {
        const response = await axios.get<{
          [x: string]: SetStateAction<string>;
        }>(`http://localhost:3000/auctioneer/getOne/${auction?.auctioneerId}`);
        setAuctioneername(response.data.companyname);
      } catch (error) {
        console.error("Error fetching auctioneer:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (auction?.auctioneerId) { // Add a condition to prevent unnecessary calls
      fetchAuctioneer();
    }
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
    const fetchBidderName = async () => {
      try {
        const response = await axios.get<{
          [x: string]: string;
        }>(`http://localhost:3000/bidder/getOne/${bidder?._id}`);
        updateBidAndLeadingBidder(bidValue, response.data.firstname);
      } catch (error) {
        console.error("Error fetching bidder:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBidderName();
  };

  const informWinner = async (auction: Auction) => {
    const auctionData = {
      bidderId: bidderId,
      auctionTitle: auction.auctionTitle,
      currentBid: auction.currentBid,
      isExpired: auction.isExpired,
      auctionImages: auction.auctionImages[0],
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/bidder/wishcreate`,
        auctionData
      );
      console.log("Notification sent successfully", response.data);

      setShowAlert(true);
    } catch (error) {
      console.error("Error sending notification:", error);
      // alert("Item has been added to Wishlist !");
      setShowAlert(true);
    }
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

      <section className="container max-w-[1600px]  py-5 flex flex-col md:flex-row relative ">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-[100vh] text-primary dark:text-gray-100 dark:bg-primarys">
            <div>
              <h1 className="text-xl md:text-7xl font-bold flex items-center">
                L
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  className="animate-spin"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z"></path>
                </svg>{" "}
                ading . . .
              </h1>
            </div>
          </div>
        ) : (
          auction && (
            <>
              {/* Image Box */}
              <div className="w-full md:w-3/6 relative md:mr-4 ml-6">
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
              <div className="flex flex-col flex-1 ml-10 mt-4 md:mt-0">
                <h2 className="text-3xl font-bold mb-5 font-sangbleu w-full">
                  {auction.auctionTitle}
                </h2>
                <label className="text-xl font-semibold mb-5 font-akshar w-full">
                  {auction && auction.isExpired
                    ? "This item is Expired "
                    : "This item is Ongoing. Do you want to save ? "}{" "}
                </label>

                <button
                  type="submit"
                  onClick={() => auction && informWinner(auction)}
                  className="flex items-center justify-center bg-red-800 text-white px-3 py-2 rounded-md hover:bg-red-600 w-full md:w-auto md:ml-2"
                >
                  <AiOutlineHeart className="mr-2" />
                  Add to Wishlist
                </button>
              </div>
            </>
          )
        )}
      </section>

      {showAlert && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 mt-32 flex justify-center items-center">
          <div className="bg-white p-10 rounded-lg shadow-lg">
            <p className="text-xl font-semibold ml-14 mb-4">Notification</p>
            <p>Successfully informed the winner</p>
            <button
              onClick={() => setShowAlert(false)}
              className="mt-4 bg-brownDark hover:bg-brownMedium text-white px-4 py-2 ml-20 rounded  focus:outline-none focus:ring focus:border-blue-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleAuction;
