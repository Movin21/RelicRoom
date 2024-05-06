import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface User {
  _id: string;
  bidderId: string;
  auctionTitle: string;
  auctionCategory: string;
  auctionDescription: string;
  auctionImage: string;
  bidPrice: string;
}

const Notifcation: React.FC = () => {
  const bidder = useSelector((state: any) => state.bidder.bidder);
  const bidderId = bidder ? bidder._id : null;

  const firstname = bidder ? bidder.firstname : "";
  const contactnumber = bidder ? bidder.contactnumber : "";
  const address = bidder ? bidder.address : "";

  console.log(address);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const navigate = useNavigate();

  const [Feed, setFeed] = useState<User[]>([]);
  const [selectedItem, setSelectedItem] = useState<User | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [expiryDateError, setExpiryDateError] = useState<string>("");
  const [cardNumberError, setCardNumberError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/payment/Bidget/${bidderId}`
        );
        const data = await response.json();
        console.log("dataa", data);

        if (response.ok) {
          setFeed(data.bidder);
        } else {
          setFeed([]);
        }
      } catch (error) {
        console.error("Error fetching bid data:", error);
      }
    };

    fetchData();
  }, [bidderId]);

  const handlePaymentSubmit = async () => {
    if (!selectedItem) return;

    const payload = {
      auctionTitle: selectedItem.auctionTitle,
      auctionCategory: selectedItem.auctionCategory,
      auctionImage: selectedItem.auctionImage,
      bidPrice: selectedItem.bidPrice,
      cardNumber,
      expiryDate,
      cvc,
      bidderId,
      firstname,
      contactnumber,
      address,
    };
    console.log("biider", payload);

    try {
      const response = await axios.post(
        "http://localhost:3000/payment/Pcreate",
        payload
      );
      if (response.data.success) {
        setShowPaymentPopup(false);
        navigate(`/trackig`);
      } else {
        alert("faliil ");
        setPaymentError("Error making payment pleace try again");
      }
    } catch (error) {
      console.error("Error making payment:", error);
      setPaymentError("Error making payment pleace try again");
    }
  };

  //expirydate
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setExpiryDate(value);

    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!regex.test(value)) {
      setExpiryDateError("Invalid format. Please use (mm/yy) format.");
    } else {
      setExpiryDateError("");
    }
  };

  //card Number
  const handleChangeCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCardNumber(value);

    // Regular expression to match only numbers
    const regex = /^[0-9]*$/;

    if (!regex.test(value)) {
      setCardNumberError("Invalid format. Please enter numbers only.");
    } else {
      setCardNumberError("");
    }
  };

  return (
    <>
      <div className="ml-64 mt-10">
        <Breadcrumb className="mb-2 ">
          <Breadcrumb.Item>
            <Link to="/bidderProfile">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Notification</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {Feed.length > 0 ? (
        <div className="mt-6">
          <div className="flex justify-center items-center">
            <h3 className="text-2xl font-serif mb-2">Notification</h3>
          </div>
          <div className=" lg:ml-[1000px] ml-80 md:ml-[800px] mb-4">
            <Link to="/trackig">
              <Button className="font-nunitoSans bg-brownDark  hover:bg-brownMedium lg:ml-20 lg:mt-4 mt-2   text-white font-bold w-40 h-8 rounded-xl focus:outline-none focus:shadow-outline">
                ViewItem Tracking
              </Button>
            </Link>
          </div>

          <ul>
            {Feed.map((User, index) => (
              <li key={index} className="mb-2">
                <div className="flex justify-center items-center">
                  <Card className="h-56 w-[1000px] bg-white shadow-sm shadow-black ">
                    <div className="flex justify-center items-center gap-10">
                      <img
                        src={User.auctionImage}
                        alt=""
                        className=" w-56 h-28"
                      />
                      <span className="font-akshar mt-3  ml-2 w-80 break-word  ">
                        {User.auctionTitle}
                      </span>
                    </div>

                    <div className="flex justify-center items-center mt-4 gap-4">
                      <div className="flex justify-center items-center  ">
                        <span className="font-semibold ml-4">category:</span>
                        <span className="font-semibold ml-2">
                          {User.auctionCategory}
                        </span>
                      </div>

                      <div className="flex justify-center items-center">
                        <span className="font-semibold">Wins Price:</span>

                        <span className="font-semibold ml-2">
                          ${User.bidPrice}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center ml-[-50px] items-center">
                      <Button
                        type="submit"
                        onClick={() => {
                          setSelectedItem(User);
                          setShowPaymentPopup(true);
                        }}
                        className="font-nunitoSans bg-brownDark hidden lg:block hover:bg-brownMedium lg:ml-20 lg:mt-4 mt-2   text-white font-bold w-60 h-8 rounded-3xl focus:outline-none focus:shadow-outline"
                      >
                        Payment
                      </Button>
                    </div>
                  </Card>
                </div>
              </li>
            ))}
          </ul>

          {showPaymentPopup && selectedItem && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <Card className="w-[500px] bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center items-center">
                  <h2 className="text-xl font-semibold mb-4 w-56 truncate">
                    {" "}
                    {selectedItem.auctionTitle}
                  </h2>
                </div>
                <div className="flex justify-center items-center">
                  <img
                    src={selectedItem.auctionImage}
                    alt=""
                    className=" w-20 h-20"
                  />
                </div>

                <h2 className="text-xl font-semibold mb-4 w-56s truncate">
                  {" "}
                  {selectedItem.auctionDescription}
                </h2>
                <div className="flex items-center justify-center">
                  <h2 className="text-xl font-semibold mb-4 ">
                    Winning price:${selectedItem.bidPrice}
                  </h2>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Card Number:
                  </label>
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    maxLength={16}
                    onChange={handleChangeCard}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                  {cardNumberError && (
                    <p className="text-red-500">{cardNumberError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Expiry Date:
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    placeholder="(mm/yy)"
                    maxLength={5}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                  {expiryDateError && (
                    <p className="text-red-500">{expiryDateError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    CVC:
                  </label>
                  <input
                    type="text"
                    placeholder="***"
                    maxLength={3}
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div className="flex justify-center items-center">
                  {paymentError && (
                    <p className="text-red-500 mb-4">{paymentError}</p>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={handlePaymentSubmit}
                  className="font-poppins bg-brownDark hover:bg-brownMedium mt-4 text-white font-bold w-full h-12 rounded-xl focus:outline-none focus:shadow-outline"
                >
                  Submit Payment
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowPaymentPopup(false)}
                  className="font-poppins bg-brownDark hover:bg-brownMedium mt-4 text-white font-bold w-full h-12 rounded-xl focus:outline-none focus:shadow-outline"
                >
                  Close
                </Button>
              </Card>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center ">
            <p className="text-2xl font-sourceSans3 mt-10 opacity-40">
              You have Not Notification yet
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Notifcation;
