import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Dialog } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

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
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 20,
    marginTop: 5,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'blue',
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 1.5,
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
        <View>
          <Text style={styles.title}>Auction Summary Report</Text>
          {data.map((auction) => (
            <View key={auction._id}>
              <Text style={styles.header}>Auction ID: {auction._id}</Text>
              <Text style={styles.paragraph}>Auction Title: {auction.auctionTitle}</Text>
              <Text style={styles.paragraph}>Category: {auction.auctionCategory}</Text>
              <Text style={styles.paragraph}>Starting Price: {auction.auctionStartingPrice}</Text>
              <Text style={styles.paragraph}>Created At: {new Date(auction.createdAt).toLocaleString()}</Text>
              <Text style={styles.paragraph}>Duration: {new Date(auction.auctionDuration).toLocaleString()}</Text>
              <Text style={styles.paragraph}>View Count: {auction.viewCount}</Text>
              <Text style={styles.paragraph}>Winning Bid Price: {auction.winningBidPrice}</Text>
              <Text style={styles.paragraph}>Winning Bidder Name: {auction.winningBidderName}</Text>
              <Text style={styles.paragraph}>----------------------------------------------------</Text>
            </View>
          ))}
        </View>
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
                <CardTitle className="text-4xl font-akshar text-secondary ">Auction Summary Report</CardTitle>
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
