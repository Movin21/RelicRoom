import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";

import { Card } from "@/components/ui/card";

interface User {
  _id: string;
  bidderId: string;
  auctionTitle: string;
  auctionCategory: string;
  auctionImage: string;
  bidPrice: string;
  firstname: string;
  address: string;
  contactnumber: string;
  status: string;
}

const TrackingDetails: React.FC = () => {
  const bidder = useSelector((state: any) => state.bidder.bidder);
  const bidderId = bidder ? bidder._id : null;

  const [feed, setdata] = useState<User[]>([]);

  console.log(feed);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/payment/Bidgetpay/${bidderId}`
        );
        const data = await response.json();
        console.log("dataa", data);

        if (response.ok) {
          setdata(data.bidder);
        } else {
          setdata([]);
        }
      } catch (error) {
        console.error("Error fetching bid data:", error);
      }
    };

    fetchData();
  }, [bidderId]);

  return (
    <>
      <div className="ml-64 mt-10">
        <Breadcrumb className="mb-2 ">
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/Notifi">Notification</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Item Tracking</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {feed.length > 0 ? (
        <div className="mt-6">
          <div className="flex justify-center items-center">
            <h3 className="text-2xl font-serif mb-4">Item Tracking</h3>
          </div>

          <ul>
            <>
              {feed.map((user, index) => (
                <li key={index} className="mb-2">
                  <div className="flex justify-center items-center">
                    <Card className="h-80 w-[1000px] bg-white shadow-sm shadow-black ">
                      <div className="flex justify-center items-center ">
                        <img
                          src={user.auctionImage}
                          alt=""
                          className=" w-56 h-28"
                        />
                        <span className="font-semibold mt-3  ml-2 w-80 break-words  ">
                          {" "}
                          {user.auctionTitle}
                        </span>{" "}
                        -
                      </div>

                      <div className="flex justify-center items-center gap-8 mt-6">
                        <span className="font-semibold ml-4">category:</span>
                        {user.auctionCategory}
                        <span className="font-semibold ml-4 ">
                          Wins Price:
                        </span>{" "}
                        ${user.bidPrice}
                      </div>

                      <div className="flex justify-center items-center gap-8 mt-6">
                        <span className="font-semibold ml-4">
                          Name: {user.firstname}
                        </span>{" "}
                        <span className="font-semibold ml-4 hidden lg:block">
                          Address: {user.address}
                        </span>{" "}
                        <span className="font-semibold ml-4">
                          Phone:{user.contactnumber}
                        </span>{" "}
                        <div className=" flex justify-center items-center bg-brownDark rounded-2xl w-44 h-10  bg-opacity-60 ">
                          <div className=" flex justify-center items-center font-semibold  hidden lg:block whitespace-nowrap ">
                            <div>Your Item :{user.status}</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </li>
              ))}
            </>
          </ul>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center ">
            <p className="text-2xl font-sourceSans3 mt-10 opacity-40">
              You have a no payment details yet
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default TrackingDetails;
