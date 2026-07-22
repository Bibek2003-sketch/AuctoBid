import { useEffect, useState } from "react";
import AuctionCard from "../AuctionCard/AuctionCard";
import { getAllAuctions } from "../../api/auctionApi";
import AuctionGrid from "../AuctionGrid/AuctionGrid";
// Icons
import { FaFire } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

// Receive searchTerm from Home.jsx
function FeaturedAuctions({
 
  // Search text entered by the user
  searchTerm,

  // Selected category from the dropdown
  selectedCategory,

  // Selected sorting option
  selectedSort,
}) {

   // store auctions from backend
  const [auctions, setAuctions] = useState([])

  // Loading state
  const [loading, setLoading] = useState(true)

  // Fetch Auctions from backend

  useEffect(() => {
    fetchAuctions();
  }, [])

  const fetchAuctions = async () => {
    try {
      const data = await getAllAuctions()
      setAuctions(data.auctions)
    }catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  // ==========================================
  // Filter the auctions according to the search

  // filter() checks every auction one by one.

  // includes() returns true if the title
  // contains the searched text.

  // toLowerCase() makes the search
  // case-insensitive.
  // ==========================================

  // ===================================================
  // STEP 1 : Filter auctions according to
  //           search text AND selected category
  // ===================================================

  const filteredAuctions = auctions.filter((auction) => {
    // -----------------------------------------
    // Check if the product title contains
    // the searched text.
    // -----------------------------------------

    const matchesSearch = auction.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // -----------------------------------------
    // Check if category matches.
    //
    // If "All Categories" is selected,
    // every auction should be shown.
    // -----------------------------------------

    const matchesCategory =
      selectedCategory === "All Categories" ||
      auction.category === selectedCategory;

    // -----------------------------------------
    // Show the auction only if BOTH conditions
    // are true.
    // -----------------------------------------

    return matchesSearch && matchesCategory;
  });

  // ===================================================
  // Sort the filtered auctions
  //
  // [...filteredAuctions] creates a copy.
  // We never sort the original array directly.
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

    // Ending Soon

    // We'll keep the current order for now.
    // Later, when backend time data is available,
    // we can sort using the auction end time.

    return 0;
  });

  if (loading) {
  return (
    <section className="py-24 text-center">
      <h2 className="text-2xl font-semibold">
        Loading Auctions...
      </h2>
    </section>
  );
}

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-[1500px] px-8">
        {/* Trending Badge */}

        <div className="flex justify-center">
          <div className="flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 text-orange-600">
            <FaFire />

            <span className="font-semibold">TRENDING NOW</span>
          </div>
        </div>

        {/* Heading */}

        <h2 className="mt-6 text-center text-6xl font-extrabold text-slate-900">
          Featured Auctions
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-center text-lg text-slate-500">
          Handpicked premium auctions with exciting bids and unbeatable prices.
        </p>

        {/* View All Button */}
        <Link
          to="/auctions"
          className="flex w-40 items-center gap-3 rounded-full border border-blue-600 px-6 py-3 text-blue-600 transition hover:bg-blue-600 hover:text-white"
        >
          View All
          <FiArrowRight />
        </Link>

        {/* ===============================================
    Auction Grid

    If auctions are available,
    display them using the reusable
    AuctionGrid component.

    Otherwise show a friendly message.
=============================================== */}

        <div className="mt-14">
          {sortedAuctions.length > 0 ? (
            <AuctionGrid auctions={sortedAuctions} />
          ) : (
            <div className="text-center">
              <h3 className="text-3xl font-bold text-slate-700">
                No Auction Found
              </h3>

              <p className="mt-3 text-slate-500">
                Try searching for another product.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FeaturedAuctions;
