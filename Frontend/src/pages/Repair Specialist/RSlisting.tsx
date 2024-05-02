import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import logo from "../../assets/Logo/Logo.png";



interface RepairSpecialist {
  _id: string;
  name: string;
  address: string;
  specialization: string;
  contactNumber: string;
  email: string;
 
}

interface UserData {
  name: string;
  address: string;
  specialization: string;
  contactNumber: string;
  email: string;
}
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
    fontFamily: "Oswald",
    textAlign: "center", // Align text to center
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
const MyDocument: React.FC<{ userData: UserData }> = ({ userData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.letterhead}>
          <View style={styles.logoContainer}>
          </View>  
            <View style={styles.companyInfo}></View>
          </View>
      <Text style={styles.title}>Repair Specialist Data</Text>
      <View style={styles.section}>
        
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Name</Text>
          <Text style={styles.tableCell}>{userData.name}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Address</Text>
          <Text style={styles.tableCell}>{userData.address}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Specialization</Text>
          <Text style={styles.tableCell}>{userData.specialization}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Contact</Text>
          <Text style={styles.tableCell}>{userData.contactNumber}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>E-mail</Text>
          <Text style={styles.tableCell}>{userData.email}</Text>
        </View>
      </View>
      
    </Page>
  </Document>
);


const RepairSpecialistList: React.FC = () => {
  const [repairSpecialists, setRepairSpecialists] = useState<
    RepairSpecialist[]
  >([]);
  const [filteredSpecialists, setFilteredSpecialists] = useState<
    RepairSpecialist[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  

  useEffect(() => {
    axios
      .get<{ success: boolean; existingRs: RepairSpecialist[]; error: string }>(
        "http://localhost:3000/repairSpecialist/get"
      )
      .then((response) => {
        if (response.data.success) {
          setRepairSpecialists(response.data.existingRs);
          setFilteredSpecialists(response.data.existingRs);
          setError(null);
        } else {
          setError(response.data.error || "Unknown error occurred");
        }
      })
      .catch((error) => {
        console.error("Error fetching repair specialist data:", error);
        setError("Failed to fetch repair specialist data");
      });
  }, []);

  useEffect(() => {
    const filtered = repairSpecialists.filter(
      (rs) =>
        rs.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rs.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSpecialists(filtered);
  }, [repairSpecialists, searchQuery]);

  const generatePDFReport = (rs: RepairSpecialist) => {
    const reportData = {
      name: rs.name,
      address: rs.address,
      specialization: rs.specialization,
      contactNumber: rs.contactNumber,
      email: rs.email,
       // Add a default value for the 'value' property
    };
    
    return (
      <PDFDownloadLink
        document={<MyDocument userData={reportData} />}
        fileName={`${reportData.name}_Report.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Create a Booking"
        }
      </PDFDownloadLink>
    );

    

    

    
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Search by Name or Specialization"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "600px", padding: "8px", fontSize: "16px" }}
        />
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredSpecialists.map((rs) => (
          <div key={rs._id} className="m-4">
            
            <div className="max-w-xs rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{rs.name}</div>
                <p className="text-gray-700 text-base">
                  <strong>Address:</strong> {rs.address}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>Specialization:</strong> {rs.specialization}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>Contact:</strong> {rs.contactNumber}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>Email:</strong> {rs.email}
                </p>
              </div>
              <div className="px-6 py-4">
                <Button
                  type="submit"
                  className="w-full text-white bg-primary hover:bg-secondary ease-in-out hover:text-white tw-50 mt-4"
                  variant="outline"
                >
                  {generatePDFReport(rs)}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepairSpecialistList;
