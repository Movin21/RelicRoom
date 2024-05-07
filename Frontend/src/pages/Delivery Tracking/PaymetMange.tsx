import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

interface User {
  _id: string;
  bidderId: string;
  auctionTitle: string;
  auctionCategory: string;
  auctionDescription: string;
  auctionImage: string;
  bidPrice: string;
  firstname: string;
  address: string;
  contactnumber: string;
  status: string;
}

interface PDFDocumentProps {
  data: User[];
}

const PDFDocument: React.FC<PDFDocumentProps> = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Title</Text>
          <Text style={styles.headerCell}>Category</Text>
          <Text style={styles.headerCell}>Bid Price</Text>
          <Text style={styles.headerCell}>First Name</Text>
          <Text style={styles.headerCell}>Address</Text>
          <Text style={styles.headerCell}>Contact Number</Text>
        </View>
        {data.map((user, index) => (
          <View key={user._id} style={styles.tableRow}>
            <Text style={styles.cell}>{user.auctionTitle}</Text>
            <Text style={styles.cell}>{user.auctionCategory}</Text>
            <Text style={styles.cell}>${user.bidPrice}</Text>
            <Text style={styles.cell}>{user.firstname}</Text>
            <Text style={styles.cell}>{user.address}</Text>
            <Text style={styles.cell}>{user.contactnumber}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#0000ff",
    color: "#ffffff",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#bfbfbf",
    borderBottomWidth: 2,
    borderRightWidth: 0,
  },
  headerCell: {
    color: "#ffffff",
    margin: 5,
    flex: 1,
    textAlign: "left",
  },
  cell: {
    margin: 5,
    flex: 1,
    textAlign: "left",
  },
});

const PaymentMange: React.FC = () => {
  const [ItemDelete, setItemToDelete] = useState<string>("");

  console.log(ItemDelete);
  const [filter, setfilter] = useState<any[]>([]);
  const [query, setQuery] = useState<string>(" ");

  const [Feed, setFeed] = useState<User[]>([]);

  console.log(Feed);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/payment/PgetAll`);
        const data = await response.json();
        console.log("dataa", data);

        if (response.ok) {
          setFeed(data);
        } else {
          setFeed([]);
        }
      } catch (error) {
        console.error("Error fetching bid data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/payment/Pdelete/${ItemDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setFeed((prev) => prev.filter((User) => User._id !== ItemDelete));
        setShowAlert(true);
      } else {
        console.log(data.message);
        setShowAlert(false);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleStatusChange = async (FormmId: string, currentStatus: string) => {
    try {
      let newStatus;
      switch (currentStatus) {
        case "processing":
          newStatus = "On-the-way";
          break;
        case "On-the-way":
          newStatus = "delivered";
          break;
        case "delivered":
          newStatus = "processing";
          break;
        default:
          newStatus = "processing"; // Default to "Processing" if status is not recognized
      }

      const res = await fetch(
        `http://localhost:3000/payment/updatestatus/${FormmId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        // Update the status state immediately
        setFeed(
          Feed.map((User) => {
            if (User._id === FormmId) {
              return { ...User, status: newStatus };
            }
            return User;
          })
        );
      }
    } catch (error) {
      console.log("error");
    }
  };

  //search funtion
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...Feed]);
    } else {
      // If there's a query, filter the data
      const filteredData = Feed.filter(
        (User) =>
          (User.firstname &&
            User.firstname.toLowerCase().includes(query.toLowerCase())) ||
          (User.address &&
            User.address.toLowerCase().includes(query.toLowerCase()))
      );
      setfilter(filteredData);
    }
  }, [query, Feed]);

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb className="mb-2">
        <Breadcrumb.Item>
          <Link to="/auctioneerPortal">Auction Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {" "}
          <Link to="/Winsabidder">Delivery & Tracking</Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item> View Tracking Details</Breadcrumb.Item>
      </Breadcrumb>
      <div className="ml-8    flex justify-center items-center">
        <form>
          <input
            type="text"
            placeholder="  Search... "
            className=" w-[300px] h-10 rounded-lg shadow-xl"
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="flex justify-center hover:text-slate-500  items-center mt-4">
        <PDFDownloadLink
          document={<PDFDocument data={filter} />}
          fileName="report.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Generating PDF..." : "Download PDF"
          }
        </PDFDownloadLink>
      </div>

      {Feed.length > 0 ? (
        <div className="mt-6">
          <div className="flex justify-center items-center">
            <h3 className="text-2xl font-manrope mb-4">
              Manage Tracking Details
            </h3>
          </div>

          <ul>
            {filter && filter.length > 0 ? (
              <>
                {filter.map((User, index) => (
                  <li key={index} className="mb-4">
                    <div className="flex justify-center items-center">
                      <Card className="h-72 w-[1000px] bg-white shadow-sm shadow-black ">
                        <div className="flex justify-center items-center ">
                          <img
                            src={User.auctionImage}
                            alt=""
                            className=" w-56 h-28"
                          />
                          <span className="font-akshar mt-3  ml-2 w-80 break-words  ">
                            {" "}
                            {User.auctionTitle}
                          </span>{" "}
                          -
                        </div>

                        <div className="flex justify-center items-center gap-8 mt-6">
                          <span className="font-semibold ml-4">category:</span>{" "}
                          ${User.auctionCategory}
                          <span className="font-semibold ml-4 ">
                            Wins Price:
                          </span>{" "}
                          ${User.bidPrice}
                        </div>

                        <div className="flex justify-center items-center gap-8 mt-6">
                          <div>
                            <span className="font-semibold ml-4">Name:</span>
                            <span className="font-poppins ml-2">
                              {User.firstname}
                            </span>
                          </div>

                          <span className="font-poppins hidden lg:block">
                            Address: {User.address}
                          </span>

                          <div>
                            <span className="font-semibold ml-4">Phone:</span>
                            <span className="font-poppins ml-2 ">
                              {User.contactnumber}
                            </span>
                          </div>

                          <span className="font-poppins ml-4 hidden lg:block ">
                            Status:{User.status}
                          </span>
                        </div>

                        <div className="flex justify-center items-center gap-8 ">
                          <Button
                            type="submit"
                            onClick={() => {
                              setItemToDelete(User._id);
                              handleDeleteUser();
                            }}
                            className="font-sourceSans3 bg-primary hidden lg:block hover:bg-brownMedium lg:mt-4  mt-2   text-white font-bold w-28 h-8 rounded-xl focus:outline-none focus:shadow-outline"
                          >
                            delete
                          </Button>

                          <Button
                            onClick={() =>
                              handleStatusChange(User._id, User.status)
                            }
                            className="font-sourceSans3 bg-primary hidden lg:block hover:bg-brownMedium  lg:mt-4 mt-2   text-white font-bold w-28 h-8 rounded-xl focus:outline-none focus:shadow-outline"
                          >
                            {/* Use the updated status here */}
                            {User.status}
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </li>
                ))}
              </>
            ) : (
              <>
                <div className="flex justify-center items-center ">
                  <p className="text-2xl font-sourceSans3 mt-10 opacity-40">
                    No search details
                  </p>
                </div>
              </>
            )}
          </ul>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center ">
            <p className="text-2xl font-sourceSans3 mt-10 opacity-40">
              You have a no Payment details yet
            </p>
          </div>
        </>
      )}

      {showAlert && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 mt-32 flex justify-center items-center">
          <div className="bg-white p-10 rounded-lg shadow-lg">
            <p className="text-xl font-semibold ml-8 mb-4">Successfull</p>
            <p>Tarcking Detials Deleted</p>
            <button
              onClick={() => setShowAlert(false)}
              className="mt-4 bg-brownDark hover:bg-brownMedium text-white px-4 py-2 ml-[50px] rounded-xl  focus:outline-none focus:ring focus:border-blue-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentMange;
