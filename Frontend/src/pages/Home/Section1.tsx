import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import { useState } from "react";
import axios from "axios";
import { formatDuration, intervalToDuration } from "date-fns";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import visibilityIcon from "@iconify-icons/mdi/visibility";
import { useSelector } from "react-redux";

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
}

const Section1 = () => {
  const auctioneer = useSelector((state: any) => state.auctioneer.auctioneer);

  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [filteredAuctions, setFilteredAuctions] = useState<Auction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");
  const [auctionStatus, setAuctionStatus] = useState<
    "All" | "expired" | "ongoing"
  >("ongoing");

  useEffect(() => {
    fetchAllAuctions();
  }, []);

  const fetchAllAuctions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auctions");
      setAuctions(response.data.existingAuctions);
      setFilteredAuctions(response.data.existingAuctions);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };

  useEffect(() => {
    filterAuctions();
  }, [searchQuery, selectedCategory, auctions, sortOrder, auctionStatus]);

  const filterAuctions = () => {
    let filtered: Auction[] = auctions.filter((auction) => {
      if (
        selectedCategory !== "All" &&
        auction.auctionCategory !== selectedCategory
      ) {
        return false;
      }
      if (
        searchQuery.trim() !== "" &&
        !auction.auctionTitle.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      if (auctionStatus === "expired" && !auction.isExpired) {
        return false;
      }
      if (auctionStatus === "ongoing" && auction.isExpired) {
        return false;
      }
      return true;
    });

    // Sort by createdAt date
    if (sortOrder === "latest") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      filtered.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
    setFilteredAuctions(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleStatusChange = (status: "All" | "expired" | "ongoing") => {
    setAuctionStatus(status);
  };

  const calculateTimeLeft = (endDate: Date) => {
    const now = new Date();
    const duration = intervalToDuration({
      start: now,
      end: endDate,
    });
    return formatDuration(duration, {
      delimiter: ", ",
      format: ["days", "hours", "minutes"],
    });
  };

  const updateViewCount = async (auctionId: string) => {
    try {
      await axios.put(`http://localhost:3000/auctions/${auctionId}/views`);
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  };
  useEffect(() => {
    const slider = new Glide(".glide-06", {
      type: "carousel",
      focusAt: "center",
      perView: 5,
      autoplay: 3000,
      animationDuration: 700,
      gap: 24,

      breakpoints: {
        1024: {
          perView: 2,
        },
        640: {
          perView: 1,
        },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);

  return (
    <>
      {/*<!-- Component: Card Carousel --> */}
      <h1 className="text-3xl font-amethysta mt-20 mb-20 pl-10 font-semibold text-primary ml-9">
        Recommended auctions
      </h1>
      <div className="glide-06  relative w-full overflow-hidden rounded bg-white  shadow-slate-200 ">
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden" data-glide-el="track">
          <ul className="gap-6  whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            <div></div> <div></div>
            {/* Render each auction card in a single line */}
            {filteredAuctions.map((auction) => (
              <li key={auction._id} className="inline-block">
                <Link
                  to={`/auction/${auction._id}`}
                  onClick={() => {
                    console.log("Clicked Auction ID:", auction._id);
                    updateViewCount(auction._id);
                  }}
                >
                  <Card
                    key={auction._id}
                    className={`shadow-md transition-transform duration-300 transform hover:scale-105 ${
                      auction.isExpired ? "opacity-50" : ""
                    } rounded-none`}
                  >
                    <div className="overflow-hidden">
                      <img
                        src={auction.auctionImages[0]}
                        alt={`Image for ${auction.auctionTitle}`}
                        className="w-full h-56 object-cover"
                      />
                    </div>
                    <CardContent className="p-2">
                      <CardTitle className="p-1 font-sangbleu text-lg truncate max-w-xs">
                        {auction.auctionTitle}
                      </CardTitle>
                      <div>
                        <p className="font-bold text-sm font-sourceSans3">
                          Starting Price: ${auction.auctionStartingPrice}
                        </p>
                        <p className="font-bold text-sm mt-1 font-sourceSans3">
                          Category: {auction.auctionCategory}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="p-2 flex justify-between items-center">
                      {auction.isExpired ? (
                        <p className="mb-1 text-red-600 font-bold text-xs mr-4">
                          Expired
                        </p>
                      ) : (
                        <p className="mb-1 text-red-600 font-bold text-xs mr-4">
                          {calculateTimeLeft(auction.auctionDuration)} Left
                        </p>
                      )}

                      <p className=" text-gray-500 font-bold text-xs flex items-center  ">
                        <Icon icon={visibilityIcon} className="mr-2" />
                        <div className="mb-0.5">{auction.viewCount} Views</div>
                      </p>
                    </CardFooter>
                  </Card>
                </Link>
              </li>
            ))}
            <div></div>
            <div></div>
            <div></div>
          </ul>
        </div>
        {/*    <!-- Controls --> */}
        <div
          className="absolute left-0 top-40 flex h-0 w-full items-center justify-between px-4 "
          data-glide-el="controls"
        >
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir="<"
            aria-label="prev slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <title>prev slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </button>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir=">"
            aria-label="next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <title>next slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
        {/*    <!-- Indicators --> */}
        <div
          className="flex right-0 bottom-0  items-center justify-center gap-2 mb-10 "
          data-glide-el="controls[nav]"
        >
          <button
            className="group p-4"
            data-glide-dir="=0"
            aria-label="goto slide 1"
          >
            <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
          </button>
          <button
            className="group p-4"
            data-glide-dir="=1"
            aria-label="goto slide 2"
          >
            <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
          </button>
          <button
            className="group p-4"
            data-glide-dir="=2"
            aria-label="goto slide 3"
          >
            <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
          </button>
          <button
            className="group p-4"
            data-glide-dir="=3"
            aria-label="goto slide 4"
          >
            <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
          </button>
        </div>
      </div>

      {/*<!-- End Card Carousel --> */}
    </>
  );
};

export default Section1;
