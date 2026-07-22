// =======================================================
// React Hook
//
// useState is used to store the values of:
// 1. Search text
// 2. Selected category
// 3. Selected sorting option
// =======================================================

import { useState } from "react";

// =======================================================
// Layout Components
// =======================================================

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// =======================================================
// Reusable Components
// =======================================================

import AuctionSearch from "../../components/AuctionSearch/AuctionSearch";
import AuctionGrid from "../../components/AuctionGrid/AuctionGrid";

// =======================================================
// Auction Data
//
// Later this data will come from the backend API.
// =======================================================

import auctions from "../../data/auctions";

function Auctions() {
  // ===================================================
  // Search Text
  // ===================================================

  const [searchTerm, setSearchTerm] = useState("");

  // ===================================================
  // Selected Category
  // ===================================================

  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // ===================================================
  // Selected Sorting Option
  // ===================================================

  const [selectedSort, setSelectedSort] = useState("Ending Soon");

  // ===================================================
  // Filter Auctions
  //
  // Search by title
  // Filter by category
  // ===================================================

  const filteredAuctions = auctions.filter((auction) => {
    // Check search text

    const matchesSearch = auction.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Check category

    const matchesCategory =
      selectedCategory === "All Categories" ||
      auction.category === selectedCategory;

    // Return only matching auctions

    return matchesSearch && matchesCategory;
  });

  // ===================================================
  // Sort Auctions
  // ===================================================

  const sortedAuctions = [...filteredAuctions].sort((a, b) => {
    // Highest Bid

    if (selectedSort === "Highest Bid") {
      return b.currentBid - a.currentBid;
    }

    // Lowest Bid

    if (selectedSort === "Lowest Bid") {
      return a.currentBid - b.currentBid;
    }

    // Ending Soon (Default)

    return 0;
  });

  return (
    <>
      {/* ==========================================
          Navigation Bar
      ========================================== */}

      <Navbar />

      {/* ==========================================
          Hero Banner
      ========================================== */}

      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 py-28">
        <div className="mx-auto max-w-[1500px] px-8">
          <h1 className="text-center text-6xl font-bold text-white">
            Live Auctions
          </h1>

          <p className="mt-6 text-center text-lg text-slate-300">
            Browse thousands of premium products from trusted sellers across
            India.
          </p>
        </div>
      </section>

      {/* ==========================================
          Search Section
      ========================================== */}

      <div className="mx-auto -mt-10 max-w-[1500px] px-8">
        <AuctionSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
      </div>

      {/* ==========================================
          Results Section
      ========================================== */}

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-[1500px] px-8">
          {/* Total Auctions */}

          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-800">
              Showing {sortedAuctions.length} Auction
              {sortedAuctions.length !== 1 ? "s" : ""}
            </h2>

            <span className="rounded-full bg-blue-600 px-5 py-2 text-white">
              {selectedCategory}
            </span>
          </div>

          {/* Auction Cards */}

          {sortedAuctions.length > 0 ? (
            <AuctionGrid auctions={sortedAuctions} />
          ) : (
            <div className="py-20 text-center">
              <h2 className="text-3xl font-bold text-slate-700">
                No Auctions Found
              </h2>

              <p className="mt-3 text-slate-500">
                Try another search or category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ==========================================
          Footer
      ========================================== */}

      <Footer />
    </>
  );
}

export default Auctions;
