import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaClock, FaGavel, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getAuctionById, placeBid } from "../../api/auctionApi";

import socket from "../../socket";
function AuctionDetails() {
  // Get the id from the URL
  const { id } = useParams();

  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    console.log("Auction ID:", id);

    socket.emit("joinAuction", {
      auctionId: id,
    });

    console.log("joinAuction emitted");
    fetchAuction();
    return () => {
      socket.emit("leaveAuction", {
        auctionId: id,
      })
      console.log("leaveAuction emitted");
    }

  }, [id]);

  const fetchAuction = async () => {
    try {
      const data = await getAuctionById(id);
      setAuction(data.auction);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect for newBid socket connection
  useEffect(() => {
    const handleNewBid = (data) => {
      console.log("New bid received:", data);
    };

    socket.on("newBid", handleNewBid);

    return () => {
      socket.off("newBid", handleNewBid);
    };
  }, []);

  const handlePlaceBid = async () => {
    try {
      const data = await placeBid(id, Number(bidAmount));

      alert(data.message);

      setBidAmount("");

      fetchAuction();
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Failed to place bid");
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

  return (
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

              <span className="text-sm sm:text-base">
                Current Bid:
                <strong className="ml-2 text-blue-600">
                  ₹{auction.currentBid.toLocaleString()}
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaClock className="text-red-500" />

              <span className="text-sm sm:text-base">
                Ends At:
                {" "}
                {new Date(auction.endTime).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaUser className="text-green-600" />

              <span className="break-all text-sm sm:text-base">
                Seller:
                {" "}
                {auction.seller?.name}
                {" "}
                ({auction.seller?.email})
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
            <label className="mb-2 block font-semibold">
              Enter Your Bid
            </label>

            <input
              type="number"
              value={bidAmount}
              onChange={(e) => {
                console.log("Input:", e.target.value);
                setBidAmount(e.target.value);
              }}
              placeholder={`Minimum ₹${auction.currentBid + auction.minimumIncrement}`}
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
              onClick={handlePlaceBid}
              className="w-full rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
            >
              Place Bid
            </button>

            <button className="w-full rounded-xl border border-blue-600 px-8 py-4 font-semibold text-blue-600 transition hover:bg-blue-50 sm:w-auto">
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}

export default AuctionDetails;
