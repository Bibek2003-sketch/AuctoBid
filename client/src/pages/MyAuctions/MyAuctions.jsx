// ======================================================
// React Hooks
// ======================================================

import { useState, useEffect } from "react";

// ======================================================
// React Router
// ======================================================

import { Link } from "react-router-dom";

// ======================================================
// Icons
// ======================================================

import {
  FaPlus,
  FaSearch,
  FaGavel,
  FaCheckCircle,
  FaClock,
  FaRupeeSign,
} from "react-icons/fa";

import { getMyAuctions } from "../../api/auctionApi";
import MyAuctionCard from "../../components/MyAuctionCard/MyAuctionCard";

// ======================================================
// My Auctions Page
//
// This page allows sellers to:
//
// • View all auctions
// • Search auctions
// • Filter auctions
// • Edit auctions
// • Delete auctions
// ======================================================

function MyAuctions() {
  // ===========================================
  // Search text
  // ===========================================

  const [search, setSearch] = useState("");

  // ===========================================
  // Filter
  // ===========================================

  const [status, setStatus] = useState("all");

  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyAuctions = async () => {
    try {
      const data = await getMyAuctions();
      console.log("My Auctions:", data);
      setAuctions(data.auctions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAuctions();
  }, []);

  // show active auctions
  const activeAuctions = auctions.filter(
    (auction) => auction.status === "active"
  ).length;

  // ended auctions
  const endedAuctions = auctions.filter(
    (auction) => auction.status === "ended"
  ).length;
  // total bids across all auctions
  const totalBids = auctions.reduce((total, auction) => {
    return total + auction.bidHistory.length;
  }, 0);

  // revenue from completed auctions only
  const revenue = auctions
    .filter((auction) => auction.status === "ended")
    .reduce((sum, auction) => sum + auction.currentBid, 0);

  // ======================================================
  // Search + Filter
  // ======================================================

  const filteredAuctions = auctions.filter((auction) => {
    // Search by title
    const matchesSearch = auction.title
      .toLowerCase()
      .includes(search.toLowerCase());

    // Filter by status
    const matchesStatus = status === "all" || auction.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ======================================
            Header
        ====================================== */}

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              My Auctions
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Manage all the auctions you've created.
            </p>
          </div>

          {/* Create Auction */}

          <Link
            to="/create-auction"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <FaPlus />
            Create Auction
          </Link>
        </div>

        {/* ======================================
            Statistics Cards
        ====================================== */}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {/* Active */}

          <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-600 dark:text-slate-300">
                Active
              </h2>

              <FaGavel className="text-blue-600 text-xl" />
            </div>

            <p className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
              {activeAuctions}
            </p>
          </div>

          {/* Ended */}

          <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-600 dark:text-slate-300">
                Ended
              </h2>

              <FaCheckCircle className="text-green-600 text-xl" />
            </div>

            <p className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
              {endedAuctions}
            </p>
          </div>

          {/* Total Bids */}

          <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-600 dark:text-slate-300">
                Total Bids
              </h2>

              <FaClock className="text-orange-500 text-xl" />
            </div>

            <p className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
              {totalBids}
            </p>
          </div>

          {/* Revenue */}

          <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-600 dark:text-slate-300">
                Revenue
              </h2>

              <FaRupeeSign className="text-emerald-600 text-xl" />
            </div>

            <p className="mt-4 text-4xl font-bold text-slate-900 dark:text-white break-words">
              ₹{revenue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* ======================================
            Search + Filter
        ====================================== */}

        <div className="mt-10 rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800">
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* Search */}

            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search your auctions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-blue-600 dark:bg-slate-900 dark:text-white"
              />
            </div>

            {/* Filter */}

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3 dark:bg-slate-900 dark:text-white"
            >
              <option value="all">All Auctions</option>

              <option value="active">Active</option>

              <option value="ended">Ended</option>
            </select>
          </div>
        </div>

        {/* ======================================
            Auction Grid
        ====================================== */}

        <div className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            <p className="col-span-full text-center text-lg">Loading...</p>
          ) : filteredAuctions.length === 0 ? (
            <div className="col-span-full rounded-2xl border-2 border-dashed border-slate-300 bg-white p-16 text-center dark:border-slate-700 dark:bg-slate-800">
              <FaGavel className="mx-auto text-5xl text-slate-400" />

              <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                No Auctions Found
              </h2>

              <p className="mt-3 text-slate-500 dark:text-slate-400">
                Click the Create Auction button to publish your first auction.
              </p>
            </div>
          ) : (
            filteredAuctions.map((auction) => <MyAuctionCard 
            key={auction.id}
            auction={auction} />)
          )}
        </div>
      </div>
    </section>
  );
}

export default MyAuctions;
