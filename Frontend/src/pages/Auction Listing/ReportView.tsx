import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";

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

interface Bid {
  _id: string;
  bidderId: string;
  auctionId: string;
  auctioneerId: string;
  bidPrice: number;
  createdAt: Date;
  updatedAt: Date;
  bidderName: string; // Added bidderName property to the Bid interface
}

const Report = () => {
  const auctioneer = useSelector((state: any) => state.auctioneer.auctioneer);
  const [auction, setAuction] = useState<Auction | null>(null);
  const [bids, setBids] = useState<Bid[]>([]); // Changed bid state to array of Bid
  const { id } = useParams<{ id: string }>();

  // Fetch the Selected Auction
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
      }
    };
    fetchAuction();
  }, [id]);

  // Fetch Bid Information
  useEffect(() => {
    const getBidInformation = async (auctionId: string | undefined) => {
      try {
        if (!auctionId) {
          console.error("Auction ID is undefined");
          return;
        }

        const response = await axios.get<{
          success: boolean;
          bids: Bid[];
        }>(`http://localhost:3000/bids/${auctionId}`);

        setBids(response.data.bids);
      } catch (error) {
        console.error("Error fetching bid information:", error);
      }
    };

    if (auction?._id) {
      // Ensure auction ID is available
      getBidInformation(auction._id);
    }
  }, [auction]); // Include auction in the dependency array

  // Render PDF document
  const MyDocument = () => (
    <Document>
      <Page style={{ padding: "2cm" }}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Auction Summary Report
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
          Auction Title: {auction?.auctionTitle}
        </Text>
        <Text style={{ fontSize: 14, marginBottom: 10 }}>
          Category: {auction?.auctionCategory}
        </Text>
        <Text style={{ fontSize: "14px", marginBottom: "10px" }}>
          Posted Date:{" "}
          {auction?.createdAt
            ? new Date(auction.createdAt).toLocaleString()
            : ""}
        </Text>
        <Text style={{ fontSize: 14, marginBottom: 10 }}>
          Starting At: ${auction?.auctionStartingPrice}
        </Text>
        <Text style={{ fontSize: 14, marginBottom: 10 }}>
          {auction?.isExpired ? "Winning Bid:" : "Current Bid:"} $
          {auction?.currentBid}
        </Text>
        <Text style={{ fontSize: 14, marginBottom: 10 }}>
          {auction?.isExpired ? "Winning Bidder:" : "Leading Bidder:"}{" "}
          {auction?.leadingBidderName}
        </Text>

        <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10 }}>
          Bids Information
        </Text>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
              Bidder Name
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
              Bid Price
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
              Bided Time and Date
            </Text>
          </View>
        </View>

        {bids.map((bid) => (
          <View key={bid._id} style={{ flexDirection: "row", marginTop: 5 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, marginBottom: 5 }}>
                {bid.bidderName}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, marginBottom: 5 }}>
                ${bid.bidPrice}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, marginBottom: 5 }}>
                {new Date(bid.createdAt).toLocaleString()}
              </Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );

  return (
    <div className="border border-gray-200 p-4 rounded-lg mb-4 font-sans">
      <h2 className="text-3xl font-bold  text-center font-sans mb-14">
        Auction Summary Report
      </h2>
      <h2 className="text-xl font-bold mb-2 ">
        Auction Title :{auction?.auctionTitle}
      </h2>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <span className="mr-2">Category:</span>
        <span className="font-semibold">{auction?.auctionCategory}</span>
      </div>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <span className="mr-2">Posted Date:</span>
        <span className="font-semibold">
          {auction?.createdAt
            ? new Date(auction.createdAt).toLocaleString()
            : ""}
        </span>
      </div>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <span className="mr-2">Starting At:</span>
        <span className="font-semibold">${auction?.auctionStartingPrice}</span>
      </div>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <span className="mr-2">
          {auction?.isExpired ? "Winning Bidder:" : "Leading Bidder:"}
        </span>
        <span className="font-semibold">
          {auction?.isExpired
            ? auction?.leadingBidderName
            : auction?.leadingBidderName}
        </span>
      </div>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <span className="mr-2">
          {auction?.isExpired ? "Winning Bid:" : "Current Bid:"}
        </span>
        <span className="font-semibold">
          ${auction?.isExpired ? auction?.currentBid : auction?.currentBid}
        </span>
      </div>
      {/* Render Bid Table */}
      {bids.length > 0 ? (
        <div>
          <h3 className="text-xl font-sans font-bold mb-5 mt-5">
            Bids Information
          </h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Bidder Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Bid Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Bided Time and Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-00">
              {bids.map((bid) => (
                <tr key={bid._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {bid.bidderName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${bid.bidPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(bid.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="items-center justify-center text-2xl font-manrope text-red-800 font-semibold mt-4 mb-5">
          No bids found for this auction
        </p>
      )}

      {/* PDF download link */}
      <div className="flex justify-end mt-4">
        {" "}
        {/* Container to position the button to the right */}
        <PDFDownloadLink
          document={<MyDocument />}
          fileName="auction_report.pdf"
          className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
        >
          {({ loading }) => "Download Report"}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default Report;
