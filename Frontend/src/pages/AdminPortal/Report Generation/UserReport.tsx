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

// Define interface for user data
interface UserData {
  name: string;
  value: number;
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
    marginBottom: 20,
    fontFamily: "Roboto",
    textAlign: "justify",
  },
});

// Create Document Component
export const UserReport = (): JSX.Element => {
  const [userData, setUserData] = useState<UserData[]>([]);

  // Function to fetch data using Axios
  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.get<UserData[]>(
        "http://localhost:3000/admin/users/chart"
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  // Function to rank roles based on value
  const rankRolesByValue = (): UserData[] => {
    return userData.slice().sort((a, b) => b.value - a.value);
  };

  // Function to calculate user density for each user
  const calculateUserDensity = (): number[] => {
    const totalUsers = userData.reduce((total, user) => total + user.value, 0);
    return userData.map((user) => (user.value / totalUsers) * 100);
  };

  const rankedUsers = rankRolesByValue();
  const userDensities = calculateUserDensity();

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
        <Text style={styles.title}>User Analysis Report</Text>

        {/* Description */}
        <Text style={styles.description}>
          This report provides insights into the distribution of users and their
          respective values. User density represents the percentage of users
          compared to the total user count.
        </Text>

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>User Distribution</Text>
          {userData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.value}</Text>
              <Text style={styles.tableCell}>
                {userDensities[index].toFixed(2)}%
              </Text>
            </View>
          ))}
        </View>

        {/* Ranked Users */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Ranked Users</Text>
          {rankedUsers.map((user, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{index + 1}.</Text>
              <Text style={styles.tableCell}>{user.name}</Text>
              <Text style={styles.tableCell}>{user.value}</Text>
              <Text style={styles.tableCell}>
                {userDensities[index].toFixed(2)}%
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
