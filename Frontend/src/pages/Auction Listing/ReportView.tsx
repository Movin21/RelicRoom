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
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

import logo from "../../assets/Logo/Logo.png";

// Import fonts
Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf",
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: "2cm",
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#000000",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Oswald",
    textAlign: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Align logo to the left
    marginBottom: 20,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Oswald",
  },
  description: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: "Roboto",
    textAlign: "justify",
  },
  section: {
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    borderBottomStyle: "solid",
    paddingBottom: 5,
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    marginBottom: 5,
    fontFamily: "Roboto",
    textAlign: "center",
  },
  logo: {
    width: 155,
    height: 50,
    marginRight: 10,
  },
  letterhead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  companyInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

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
      <Page size="A4" style={styles.page}>
        {/* Letterhead */}
        <View style={styles.letterhead}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} src={logo} />
          </View>
          <View style={styles.companyInfo}>
            <Text style={{ fontSize: 12 }}>123 Main Street</Text>
            <Text style={{ fontSize: 12 }}>New York, NY 10001</Text>
            <Text style={{ fontSize: 12 }}>Phone: (123) 456-7890</Text>
            <Text style={{ fontSize: 12 }}>Email: info@relicroom.com</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Auction Summary Report</Text>

        {/* Auction Details */}
        <Text style={styles.subtitle}>Auction Details</Text>
        <Text style={{ ...styles.description }}>
          Auction Title: {auction?.auctionTitle}
        </Text>
        <Text style={styles.description}>
          Category: {auction?.auctionCategory}
        </Text>
        <Text style={styles.description}>
          Posted Date:{" "}
          {auction?.createdAt
            ? new Date(auction.createdAt).toLocaleString()
            : ""}
        </Text>
        <Text style={styles.description}>
          Starting At: ${auction?.auctionStartingPrice}
        </Text>
        <Text style={styles.description}>
          {auction?.isExpired ? "Winning Bid:" : "Current Bid:"} $
          {auction?.currentBid}
        </Text>
        <Text style={styles.description}>
          {auction?.isExpired ? "Winning Bidder:" : "Leading Bidder:"}{" "}
          {auction?.leadingBidderName}
        </Text>

        {/* Bids Information */}
        <Text style={{ ...styles.subtitle, marginTop: 20, marginBottom: 10 }}>
          Bids Information
        </Text>
        <View style={{ ...styles.tableRow, marginTop: 10 }}>
          <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>
            Bidder Name
          </Text>
          <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>
            Bid Price
          </Text>
          <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>
            Bided Time and Date
          </Text>
        </View>
        {bids.map((bid) => (
          <View key={bid._id} style={{ ...styles.tableRow, marginTop: 5 }}>
            <Text style={styles.tableCell}>{bid.bidderName}</Text>
            <Text style={styles.tableCell}>${bid.bidPrice}</Text>
            <Text style={styles.tableCell}>
              {new Date(bid.createdAt).toLocaleString()}
            </Text>
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
