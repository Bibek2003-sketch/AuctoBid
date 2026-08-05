import Swal from "sweetalert2";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaClock, FaGavel, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getAuctionById, placeBid } from "../../api/auctionApi";

import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";

import LiveBidNotification from "../../components/LiveBidNotification/LiveBidNotification";

import LiveActivityFeed from "../../components/LiveActivityFeed/LiveActivityFeed";

import socket from "../../socket";
function AuctionDetails() {
  // Get the id from the URL
  const { id } = useParams();

  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [liveBid, setLiveBid] = useState(null);
  // live activity state, this stores an array of every bids received through socket.io
  const [activities, setActivities] = useState([]);

  // prevent showing the auction ended popup multiple times. onece thepopup has been shown, this becomes true and the popup will not be shown again.
  const [auctionEndedPopupShown, setAuctionEndedPopupShown] = useState(false);

  // check whether the auction has ended. if the current time is greater than the auctions's end time, this variable becomes true.
  // it is used to disable bidding when the auction has ended.

  const isAuctionEnded = auction && new Date() >= new Date(auction.endTime);
  useEffect(() => {
    

    socket.emit("joinAuction", {
      auctionId: id,
    });

    
    fetchAuction();
    return () => {
      socket.emit("leaveAuction", {
        auctionId: id,
      });
      
    };
  }, [id]);

  const fetchAuction = async () => {
    try {
      const data = await getAuctionById(id);
      setAuction(data.auction);
      

      setActivities(
        data.auction.bidHistory
        .slice() // make copy of the array so we don't mutate the original
        .reverse()  // newest first
        .map((bid) => ({
          bidder: bid.bidder.name,
          amount: bid.amount,
          time: new Date(bid.bidTime),
        }))
      )
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect for newBid socket connection
  useEffect(() => {
    const handleNewBid = (data) => {
      console.log("Live bid:", data);

      // Update auction instantly
      setAuction((prev) => ({
        ...prev,
        currentBid: data.currentBid,
        highestBidder: data.highestBidder,
        bidHistory: data.bidHistory,
      }));

      // Show notification
      setLiveBid({
        bidder: data.bidder,
        amount: data.amount,
      });

      // Hide notification after 3 seconds
      setTimeout(() => {
        setLiveBid(null);
      }, 3000);

      // add the newest activity at the top of the list
      // prev = previous activities array
      // Add the newest activity to the top.
      //
      // slice(0,10) keeps only the latest 10 bids.
      //
      // Without slice(), after hundreds of bids,
      // the array keeps growing forever.
      //
      // This saves memory and keeps the UI fast.
      setActivities((prev) =>
        [
          // new activity at the top
          {
            bidder: data.bidder,
            amount: data.amount,
            time: new Date(),
          },

          // keep all previous activities
          ...prev,
        ].slice(0, 10),
      );
    };

    socket.on("newBid", handleNewBid);

    return () => {
      socket.off("newBid", handleNewBid);
    };
  }, []);

  const handlePlaceBid = async () => {
    try {
      const data = await placeBid(id, Number(bidAmount));

      Swal.fire({
        icon: "success",
        title: "Bid Placed Successfully",
        text: data.message,
      });

      setBidAmount("");

      fetchAuction();
    } catch (error) {
      console.log(error.response?.data);
      Swal.fire({
        icon: "error",
        title: "Failed to Place Bid",
        text: error.response?.data?.message || "Failed to place bid",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">Loading Auction...</h1>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">Auction Not Found</h1>
      </div>
    );
  }

  // ==========================================
  // Called automatically when the timer
  // reaches zero.
  //
  // Shows the winner popup only once.
  // ==========================================

  const handleAuctionEnd = () => {
    if (auctionEndedPopupShown) return;

    setAuctionEndedPopupShown(true);

    Swal.fire({
      icon: "success",

      title: "🏆 Auction Ended",

      html: `
        <div style="font-size:16px">

            <p>

                <strong>Winner</strong><br>

                ${auction.highestBidder?.name || "No bids"}

            </p>

            <br>

            <p>

                <strong>Winning Bid</strong><br>

                ₹${auction.currentBid.toLocaleString()}

            </p>

        </div>
        `,

      confirmButtonText: "Awesome",

      confirmButtonColor: "#2563eb",
    });
  };

  return (
    <>
      <LiveBidNotification bid={liveBid} />
      <section className="bg-slate-100 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back Button */}

          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-blue-600 hover:underline sm:mb-8 sm:text-base"
          >
            <FaArrowLeft />
            Back to Auctions
          </Link>

          {/* Main Card */}

          <div className="grid grid-cols-1 gap-8 rounded-3xl bg-white p-5 shadow-xl sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
            {/* Left */}

            <div>
              <img
                src={auction.image}
                alt={auction.title}
                className="h-72 w-full rounded-2xl object-cover sm:h-96 lg:h-[500px]"
              />
            </div>

            {/* Right */}

            <div>
              {/* Category */}

              <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 sm:text-sm">
                {auction.category}
              </span>

              {/* Title */}

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl lg:text-5xl">
                {auction.title}
              </h1>

              {/* Info */}

              <div className="mt-8 space-y-5">
                <div className="flex items-center gap-3">
                  <FaGavel className="text-blue-600" />

                  <span className="text-sm sm:text-base dark:text-slate-900 font-bold">
                    Current Bid:
                    <strong className="ml-2 text-blue-600">
                      ₹{auction.currentBid.toLocaleString()}
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-900">
                  <FaClock className="text-red-500" />

                  <div>
                    <p className="text-sm text-slate-500">Auction Ends In</p>

                    <p className="text-lg font-bold text-red-600">
                      <CountdownTimer
                        endTime={auction.endTime}
                        onAuctionEnd={handleAuctionEnd}
                      />{" "}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaUser className="text-green-600" />

                  <span className="break-all text-sm sm:text-base dark:text-slate-900 font-bold">
                    Seller: {auction.seller?.name} ({auction.seller?.email})
                  </span>
                </div>
              </div>

              {/* Description */}

              <div className="mt-8">
                <h2 className="text-xl font-semibold text-slate-900">
                  Description
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
                  {auction.description}
                </p>
              </div>

              {/* Bid */}

              <div className="mt-8">
                <label className="mb-2 block font-semibold dark:text-slate-900">
                  Enter Your Bid
                </label>

                <input
                  type="number"
                  disabled={isAuctionEnded}
                  value={bidAmount}
                  onChange={(e) => {
                    console.log("Input:", e.target.value);
                    setBidAmount(e.target.value);
                  }}
                  placeholder={
                    isAuctionEnded
                      ? "Auction has ended"
                      : `Minimum ₹${auction.currentBid + auction.minimumIncrement}`
                  }
                  className="w-full rounded-lg border border-black p-3 text-black outline-none focus:border-blue-500"
                />

                <p className="mt-2 text-sm text-gray-500">
                  Minimum Bid: ₹
                  {(
                    auction.currentBid + auction.minimumIncrement
                  ).toLocaleString()}
                </p>
              </div>

              {/* Buttons */}

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  disabled={isAuctionEnded}
                  onClick={handlePlaceBid}
                  className={`w-full rounded-xl px-8 py-4 font-semibold text-white transition sm:w-auto

${
  isAuctionEnded
    ? "bg-gray-400 cursor-not-allowed"
    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
}`}
                >
                  {isAuctionEnded ? "Auction Ended" : "Place Bid"}
                </button>

                <button className="w-full rounded-xl border border-blue-600 px-8 py-4 font-semibold text-blue-600 transition hover:bg-blue-50 sm:w-auto cursor-pointer">
                  Add to Watchlist
                </button>
              </div>
              {/* 
=====================================================
    Live Activity Feed

    This component displays every new bid received
    through Socket.IO.

    It is placed below the bidding section so users
    can see live updates while placing bids.
===================================================== */}

              <LiveActivityFeed activities={activities} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AuctionDetails;
