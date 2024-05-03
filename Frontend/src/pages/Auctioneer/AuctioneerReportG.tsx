import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Dialog } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet,Font, Image, } from '@react-pdf/renderer';
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

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

interface Auction {
  _id: string;
  auctionTitle: string;
  auctionCategory: string;
  auctionStartingPrice: number;
  createdAt: Date;
  auctionDuration: Date;
  viewCount: number;
  winningBidPrice: number;
  winningBidderName: string;
}

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

const AuctioneerReportG: React.FC = () => {
  const [data, setData] = useState<Auction[]>([]);
  const auctioneer = useSelector((state: any) => state.auctioneer.auctioneer);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Auction[]>(`http://localhost:3000/auctioneer/generateReport/${auctioneer._id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching auction data:", error);
      }
    };

    fetchData();
  }, [auctioneer._id]);

  const handleBackToPortal = () => {
    navigate("/auctioneerPortal");
  };

  const generatePDF = () => {
    return (
      <PDFDownloadLink document={<MyDocument data={data} />} fileName="auction_report.pdf">
        {({ loading }) => (
          <Button className="font-akshar w-40 text-white bg-red-700 hover:bg-red-500 tw-50 mt-4">
            {loading ? 'Loading document...' : 'Download PDF'}
          </Button>
        )}
      </PDFDownloadLink>
    );
  };

  const MyDocument: React.FC<{ data: Auction[] }> = ({ data }) => (
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
        <Text style={styles.subtitle}>Auction Details</Text>
         
          {data.map((auction) => (
            <View key={auction._id}>
              <Text style={styles.description}>Auction ID: {auction._id}</Text>
              <Text style={styles.description}>Auction Title: {auction.auctionTitle}</Text>
              <Text style={styles.description}>Category: {auction.auctionCategory}</Text>
              <Text style={styles.description}>Starting Price: {auction.auctionStartingPrice}</Text>
              <Text style={styles.description}>Created At: {new Date(auction.createdAt).toLocaleString()}</Text>
              <Text style={styles.description}>Duration: {new Date(auction.auctionDuration).toLocaleString()}</Text>
              <Text style={styles.description}>View Count: {auction.viewCount}</Text>
              <Text style={styles.description}>Winning Bid Price: {auction.winningBidPrice}</Text>
              <Text style={styles.description}>Winning Bidder Name: {auction.winningBidderName}</Text>
              <Text style={styles.description}>-------------------------------------------------------------------</Text>
            </View>
          ))}
      </Page>
    </Document>
  );

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <div className="flex flex-1">
        <div className="ml-4 sm:mt-0 flex-1">
          <Dialog>
            <Card>
              <CardHeader>
                <CardTitle className="font-akshar text-secondary text-4xl ">Auction Summary Report</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeader className="hidden md:table-cell text-brownDark font-akshar text-xl font-semibold mb-2">Auction ID</TableHeader>
                      <TableHeader className="hidden md:table-cell text-brownDark font-akshar text-xl font-semibold mb-2">Auction Title</TableHeader>
                      <TableHeader className="hidden md:table-cell text-brownDark font-akshar text-xl font-semibold mb-2">Auction Category</TableHeader>
                      <TableHeader className="hidden md:table-cell text-brownDark font-akshar text-xl font-semibold mb-2">Starting Price</TableHeader>
                      <TableHeader className="hidden md:table-cell text-brownDark font-akshar text-xl font-semibold mb-2">Created At</TableHeader>
                      <TableHeader className="hidden md:table-cell text-brownDark font-akshar text-xl font-semibold mb-2">Auction Duration</TableHeader>
                      <TableHeader className="hidden md:table-cell text-brownDark font-akshar text-xl font-semibold mb-2">view Count</TableHeader>
                      <TableHeader className="hidden md:table-cell text-brownDark font-akshar text-xl font-semibold mb-2">Winning Bid Price</TableHeader>
                      <TableHeader className="hidden md:table-cell text-brownDark font-akshar text-xl font-semibold mb-2">Winning Bidder Name</TableHeader>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((auction) => (
                      <TableRow key={auction._id}>
                        <TableCell className="hidden md:table-cell font-akshar">{auction._id}</TableCell>
                        <TableCell className="hidden md:table-cell font-akshar">{auction.auctionTitle}</TableCell>
                        <TableCell className="hidden md:table-cell font-akshar">{auction.auctionCategory}</TableCell>
                        <TableCell className="hidden md:table-cell font-akshar">{auction.auctionStartingPrice}</TableCell>
                        <TableCell className="hidden md:table-cell font-akshar"> {new Date(auction.createdAt).toLocaleString()}</TableCell>
                        <TableCell className="hidden md:table-cell font-akshar"> {new Date(auction.auctionDuration).toLocaleString()}</TableCell>
                        <TableCell className="hidden md:table-cell font-akshar">  {auction.viewCount}</TableCell>
                        <TableCell className="hidden md:table-cell font-akshar">{auction.winningBidPrice}</TableCell>
                        <TableCell className="hidden md:table-cell font-akshar">{auction.winningBidderName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                  {generatePDF()}
                  <Button className="font-akshar w-full sm:w-auto text-white bg-primary hover:bg-secondary mt-4 sm:mt-0" onClick={handleBackToPortal}>
                    Back to Portal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AuctioneerReportG;
