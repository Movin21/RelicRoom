import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import { Breadcrumb } from "antd";

import moment from "moment";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Auction {
  auctionTitle: string;
  auctionCategory: string;
  auctionDescription: string;
  auctionImages: string[];
}

interface Bidder {
  _id: string;
  firstname: string;
  email: string;
  contactnumber: string;
  bidPrice: number;
  createdAt: string;
}

const Inform: React.FC = () => {
  const { winsid } = useParams<{ winsid: string }>();

  const [auction, setAuction] = useState<Auction | undefined>();

  const [isLoading, setIsLoading] = useState(true);
  const [lastThreeBidders, setLastThreeBidders] = useState<Bidder[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  //inform detials

  const informWinner = async (bidder: Bidder, auction: Auction) => {
    const auctionData = {
      bidderId: bidder._id,
      auctionTitle: auction.auctionTitle,
      auctionCategory: auction.auctionCategory,
      auctionDescription: auction.auctionDescription,
      auctionImage: auction.auctionImages[0],
      bidPrice: bidder.bidPrice.toString(),
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/payment/Icreate`,
        auctionData
      );
      console.log("Notification sent successfully", response.data);

      setShowAlert(true);
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("eeerer");
      setShowAlert(false);
    }
  };

  //fech the auciton

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await axios.get<{
          success: boolean;
          auction: Auction;
        }>(`http://localhost:3000/auctions/${winsid}`);
        setAuction(response.data.auction);
      } catch (error) {
        console.error("Error fetching auction:", error);
      } finally {
        setIsLoading(false);
      }
    };

    //get last three bidders

    const fetchLastThreeBidders = async () => {
      try {
        const response = await axios.get<any[]>(
          `http://localhost:3000/bids/last3bidders/${winsid}`
        );
        const transformedBidders: Bidder[] = response.data.map((bid: any) => ({
          _id: bid.bidderId._id,
          firstname: bid.bidderId.firstname,
          email: bid.bidderId.email,
          contactnumber: bid.bidderId.contactnumber,

          bidPrice: bid.bidPrice,
          createdAt: bid.createdAt,
        }));
        setLastThreeBidders(transformedBidders);
      } catch (error) {
        console.error("Error fetching last three bidders:", error);
      }
    };

    fetchAuction();
    fetchLastThreeBidders();
  }, [winsid]);

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb className="mt-4 mb-2 ml-10">
        <Breadcrumb.Item>
          <Link to="/auctioneerPortal">Auction Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {" "}
          <Link to="/Winsabidder">Delivery and tracking </Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item> Last Three Bidders</Breadcrumb.Item>
      </Breadcrumb>

      <section className="container max-w-[1600px]  py-5 flex flex-col md:flex-row relative ">
        {isLoading ? (
          <div className="text-center w-full">Loading auction...</div>
        ) : (
          auction && (
            <>
              {/* Image Box */}
              <div className="w-20 md:w-56  relative md:mr-3 ml-6">
                <ImageGallery
                  showBullets={false}
                  showFullscreenButton={true}
                  showPlayButton={false}
                  items={[
                    {
                      original: auction.auctionImages[0],
                    },
                  ]}
                  thumbnailPosition="bottom"
                  showNav={false}
                  showIndex={true}
                />
              </div>

              {/* Other Content */}
              <div className="flex flex-col flex-1 ml-10 mt-4 md:mt-0">
                <h2 className="text-xl font-bold mb-5 font-sangbleu w-full">
                  {auction.auctionTitle}
                </h2>

                <p className="text-sm text-gray-500 mb-2 font-sourceSans3 font-semibold">
                  Category: {auction.auctionCategory}
                </p>

                <p className="text-sm text-gray-500 mb-2 font-sourceSans3 font-semibold w-96 truncate">
                  Description: {auction.auctionDescription}
                </p>
              </div>
            </>
          )
        )}
      </section>
      <div>
        {lastThreeBidders.length > 0 ? (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Wins Bidders</h3>
            <ul>
              {lastThreeBidders.map((bidder, index) => (
                <li key={index} className="mb-2">
                  <Card className="h-16 w-full bg-white shadow-sm shadow-black ">
                    <span className="font-semibold mt-3  ml-2">
                      Bidder Name:
                    </span>{" "}
                    {bidder.firstname} -
                    <span className="font-semibold ml-4">Bid Price:</span> $
                    {bidder.bidPrice}
                    <span className="font-semibold ml-4">Bid time:</span>{" "}
                    {moment(bidder.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                    <span className="font-semibold ml-4 mt-3  w-10 truncate  ">
                    Email
                    </span>{" "}
                    {bidder.email}
                    <span className="font-semibold ml-4   ">
                      Contact:{" "}
                    </span>{" "}
                    {bidder.contactnumber}
                    <Button
                      type="submit"
                      onClick={() => auction && informWinner(bidder, auction)}
                      className="font-nunitoSans  bg-brownDark hover:bg-brownMedium lg:ml-20 lg:mt-4 mt-2    text-white font-bold w-20 h-8 rounded-xl focus:outline-none focus:shadow-outline"
                      

                    >
                      Inform
                    </Button>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center mb-10 mt-2">
              <p className="text-3xl font-akshar opacity-60  ">
                The Auction has a no winners yet
              </p>
            </div>
          </>
        )}
      </div>
      {showAlert && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 mt-18 flex justify-center items-center">
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

export default Inform;
