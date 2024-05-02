import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Dialog } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink, PDFViewer, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

interface Auction {
  _id: string;
  auctionTitle: string;
  auctionDescription: string;
  auctionImages: string[];
  auctionCategory: string;
  auctionStartingPrice: number;
  auctionDuration: Date;
  currentBid: number;
  isExpired: boolean;
  viewCount: number;
  createdAt: Date;
  winningBidPrice: number | null;
  winningBidderName: string | null;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'solid',
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderStyle: 'solid',
  },
  cell: {
    padding: 8,
    flex: 1,
    textAlign: 'center',
    border: '1px solid #ccc',
    fontSize: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20,
    marginTop:5,
  },
  
});
 
const AuctioneerReportG: React.FC = () => {
  const [data, setData] = useState<Auction[]>([]);
  const auctioneer = useSelector((state: any) => state.auctioneer.auctioneer);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/auctioneer/generateReport/${auctioneer._id}`);
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
        {({ blob, url, loading, error }) => (
          <Button className="w-40 mt-4 text-white ease-in-out bg-red-700 font-akshar hover:bg-red-500 hover:text-white tw-50">
            {loading ? 'Loading document...' : 'Download PDF'}
          </Button>
        )}
      </PDFDownloadLink>
    );
  };

  // Define the component to render the PDF
  const MyDocument: React.FC<{ data: Auction[] }> = ({ data }) => (
    <Document>
      <Page size="A3" style={styles.page}>
        <View style={styles.table}>
        <Text style={styles.title}>Auction Summary Report</Text>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.cell]}>Auction ID</Text>
            <Text style={[styles.cell, styles.cell]}>Auction Title</Text>
            {/* <Text style={[styles.cell, styles.cell]}>Description</Text> */}
            <Text style={[styles.cell, styles.cell]}>Category</Text>
            <Text style={[styles.cell, styles.cell]}>Starting Price</Text>
            <Text style={[styles.cell, styles.cell]}>Duration</Text>
            <Text style={[styles.cell, styles.cell]}>Current Bid</Text>
            <Text style={[styles.cell, styles.cell]}>View Count</Text>
            <Text style={[styles.cell, styles.cell]}>Created At</Text>
            <Text style={[styles.cell, styles.cell]}>Winning Bid Price</Text>
            <Text style={[styles.cell, styles.cell]}>Winning Bidder Name</Text>
          </View>
          {data.map((auction) => (
            <View style={styles.row} key={auction._id}>
              <Text style={styles.cell}>{auction._id}</Text>
              <Text style={styles.cell}>{auction.auctionTitle}</Text>
              {/* <Text style={styles.cell}>{auction.auctionDescription}</Text> */}
              <Text style={styles.cell}>{auction.auctionCategory}</Text>
              <Text style={styles.cell}>{auction.auctionStartingPrice}</Text>
              <Text style={styles.cell}>{new Date(auction.auctionDuration).toLocaleString()}</Text>
              <Text style={styles.cell}>{auction.currentBid}</Text>
              <Text style={styles.cell}>{auction.viewCount}</Text>
              <Text style={styles.cell}>{new Date(auction.createdAt).toLocaleString()}</Text>
              <Text style={styles.cell}>{auction.winningBidPrice}</Text>
              <Text style={styles.cell}>{auction.winningBidderName}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
  

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Card Component */}
        <div className="flex-1 ml-4 sm:mt-0">
          <Dialog>
            <Card>
              <CardHeader>
                <CardTitle className="text-4xl font-akshar text-secondary ">Auction Summary Report</CardTitle>
              </CardHeader>
              <CardContent>
              <Table>
                  <TableHeader>
                    <TableRow>
                    <TableHead className="hidden mb-2 text-xl font-semibold md:table-cell text-brownDark font-akshar">Auction ID</TableHead>
                      <TableHead className="hidden mb-2 text-xl font-semibold md:table-cell text-brownDark font-akshar">Auction Title</TableHead>
                      {/* <TableHead className="hidden mb-2 text-xl font-semibold md:table-cell text-brownDark font-akshar">Auction Images</TableHead> */}
                      {/* <TableHead className="hidden mb-2 text-xl font-semibold md:table-cell text-brownDark font-akshar">Description</TableHead> */}
                      <TableHead className="hidden mb-2 text-xl font-semibold md:table-cell text-brownDark font-akshar">Auction Category</TableHead>
                      <TableHead className="hidden mb-2 text-xl font-semibold md:table-cell text-brownDark font-akshar">Starting Price</TableHead>
                      <TableHead className="hidden mb-2 text-xl font-semibold md:table-cell text-brownDark font-akshar">Auction Duration</TableHead>
                      <TableHead className="hidden mb-2 text-xl font-semibold md:table-cell text-brownDark font-akshar">Current Bid</TableHead>
                      <TableHead className="hidden mb-2 text-xl font-semibold md:table-cell text-brownDark font-akshar">view Count</TableHead>
                      <TableHead className="hidden mb-2 text-xl font-semibold md:table-cell text-brownDark font-akshar">Created At</TableHead>
                      <TableHead className="hidden mb-2 text-xl font-semibold md:table-cell text-brownDark font-akshar">Winning Bid Price</TableHead>
                      <TableHead className="hidden mb-2 text-xl font-semibold md:table-cell text-brownDark font-akshar">Winning Bidder Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((auction) => (
                      <TableRow key={auction._id}>
                        <TableCell className="hidden md:table-cell font-akshar">{auction._id}</TableCell>
                        <TableCell className="hidden md:table-cell font-akshar">{auction.auctionTitle}</TableCell>
                        {/* <TableCell className="hidden md:table-cell font-akshar">
                          {auction.auctionImages.map((image, index) => (
                            <img key={index} src={image} alt={`Auction Image ${index}`} />
                          ))}
                        </TableCell> */}
                        {/* <TableCell className="hidden md:table-cell font-akshar">{auction.auctionDescription}</TableCell> */}
                        <TableCell className="hidden md:table-cell font-akshar">{auction.auctionCategory}</TableCell>
                        <TableCell className="hidden md:table-cell font-akshar">{auction.auctionStartingPrice}</TableCell>
                        <TableCell className="hidden md:table-cell font-akshar"> {new Date(auction.auctionDuration).toLocaleString()}</TableCell>
                        <TableCell className="hidden md:table-cell font-akshar">{auction.currentBid}</TableCell>
                        <TableCell className="hidden md:table-cell font-akshar"> {new Date(auction.createdAt).toLocaleString()}</TableCell>
                         {new Date(auction.createdAt).toLocaleString()}
                        <TableCell className="hidden md:table-cell font-akshar">{auction.winningBidPrice}</TableCell>
                        <TableCell className="hidden md:table-cell font-akshar">{auction.winningBidderName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-between mb-4">
                  {/* Button to trigger PDF download */}
                  {generatePDF()}
                  <Button className="w-40 mt-4 text-white ease-in-out font-akshar bg-primary hover:bg-secondary hover:text-white tw-50" onClick={handleBackToPortal}>Back Portal</Button>
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

