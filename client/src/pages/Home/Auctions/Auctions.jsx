// =======================================================
// React Hook
//
// useState stores all filtering values.
//
// This page controls:
//
// Search
// Category
// Sorting
// =======================================================

import { useState } from "react";

// =======================================================
// Layout Components
// =======================================================

import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

// =======================================================
// Reusable Components
// =======================================================

import AuctionSearch from "../../../components/AuctionSearch/AuctionSearch";
import AuctionGrid from "../../../components/AuctionGrid/AuctionGrid";
// =======================================================
// Auction Data
//
// Later this will come from the backend.
// =======================================================

import auctions from "../../../data/auctions";
function Auctions() {

  // ============================================
  // Search Text
  // ============================================

  const [searchTerm, setSearchTerm] = useState("");

  // ============================================
  // Category
  // ============================================

  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  // ============================================
  // Sorting
  // ============================================

  const [selectedSort, setSelectedSort] =
    useState("Ending Soon");

  // ===========================================
// Filter Auctions
// ===========================================

const filteredAuctions = auctions.filter((auction) => {

  // Check search text
  const matchesSearch = auction.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  // Check category
  const matchesCategory =
    selectedCategory === "All Categories" ||
    auction.category === selectedCategory;

  return matchesSearch && matchesCategory;

});

// ===========================================
// Sort Auctions
// ===========================================

const sortedAuctions = [...filteredAuctions].sort((a, b) => {

  if (selectedSort === "Highest Bid") {

    return b.currentBid - a.currentBid;

  }

  if (selectedSort === "Lowest Bid") {

    return a.currentBid - b.currentBid;

  }

  return 0;

});

  return (

    <>

      {/* Navigation */}

      <Navbar />

      {/* =====================================
          Hero Banner
      ===================================== */}

      <section className="bg-slate-900 py-24">

        <div className="mx-auto max-w-[1500px] px-8">

          <h1 className="text-center text-6xl font-bold text-white">

            Live Auctions

          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-center text-lg text-slate-300">

            Browse premium products from trusted sellers across India.

          </p>

        </div>

      </section>

      {/* =====================================
          Search Section
      ===================================== */}

      <div className="mx-auto -mt-12 max-w-[1500px] px-8">

        <AuctionSearch

          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}

          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}

          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}

        />

      </div>

      {/* =====================================
          Auction Grid
      ===================================== */}

      <section className="bg-slate-50 py-24">

        <div className="mx-auto max-w-[1500px] px-8">

          <AuctionGrid auctions={sortedAuctions} />

        </div>

      </section>

      {/* Footer */}

      <Footer />

    </>

  );
}

export default Auctions;