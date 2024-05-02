import React, { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import axios from "axios";
import logo from "../../../assets/Logo/Logo.png";

// Import fonts
Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf",
});

// Define interface for revenue data
interface RevenueData {
  _id: string;
  month: string;
  revenue: number;
  cost: number;
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  letterhead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 50,
    marginRight: 10,
  },
  companyInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Oswald",
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "Roboto",
    textAlign: "justify",
  },
});

// Create Document Component
export const FinancialReport = (): JSX.Element => {
  const [auctions, setAuctions] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  // Function to fetch data using Axios
  const fetchData = async () => {
    try {
      const revenueResponse = await axios.get(
        "http://localhost:3000/admin/revenue"
      );
      const auctionsResponse = await axios.get(
        "http://localhost:3000/admin/countAuctions"
      );
      const RevenueResponse = await axios.get(
        "http://localhost:3000/admin/revenue/chart"
      );

      setAuctions(auctionsResponse.data);
      setRevenue(revenueResponse.data.totalValue);
      setRevenueData(RevenueResponse.data);
      setTotalCost(
        RevenueResponse.data.reduce(
          (total: any, item: { cost: any }) => total + item.cost,
          0
        )
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  // Calculate profit percentage
  const profitPercentage = ((revenue - totalCost) / revenue) * 100;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Letterhead */}
        <View style={styles.letterhead}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} src={logo} />
            <View style={styles.companyInfo}></View>
          </View>
          <View style={styles.companyInfo}>
            <Text style={{ fontSize: 12, fontFamily: "Roboto" }}>
              123 Main Street
            </Text>
            <Text style={{ fontSize: 12, fontFamily: "Roboto" }}>
              New York, NY 10001
            </Text>
            <Text style={{ fontSize: 12, fontFamily: "Roboto" }}>
              Phone: (123) 456-7890
            </Text>
            <Text style={{ fontSize: 12, fontFamily: "Roboto" }}>
              Email: info@relicroom.com
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Financial Analysis Report</Text>

        {/* Description */}
        <Text style={styles.description}>
          This report provides a comprehensive overview of the financial
          performance of Relic Room, a specialized vintage auctions website. It
          includes key metrics such as total revenue, number of auctions,
          monthly income breakdown, and profit percentage. This information is
          crucial for understanding the business's financial health and making
          informed decisions.
        </Text>

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Summary</Text>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Total Revenue</Text>
            <Text style={styles.tableCell}>${revenue.toFixed(2)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Total Auctions</Text>
            <Text style={styles.tableCell}>{auctions}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Profit Percentage</Text>
            <Text style={styles.tableCell}>{profitPercentage.toFixed(2)}%</Text>
          </View>
        </View>

        {/* Monthly Income Section */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Monthly Income</Text>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Month
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Revenue
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>Cost</Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Profit %
            </Text>
          </View>
          {revenueData.map((item) => (
            <View key={item._id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.month}</Text>
              <Text style={styles.tableCell}>${item.revenue.toFixed(2)}</Text>
              <Text style={styles.tableCell}>${item.cost.toFixed(2)}</Text>
              <Text style={styles.tableCell}>
                {(((item.revenue - item.cost) / item.revenue) * 100).toFixed(2)}
                %
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
