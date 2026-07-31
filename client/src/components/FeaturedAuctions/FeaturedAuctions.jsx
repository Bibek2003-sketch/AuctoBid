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
  const [auctions, setAuctions] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Fetch Auctions from backend

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const data = await getAllAuctions();
      setAuctions(data.auctions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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
      <section className="bg-slate-50 py-24 text-center dark:bg-slate-950">
        <h2 className="text-2xl font-semibold">Loading Auctions...</h2>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-16 transition-colors duration-300 dark:bg-slate-950 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Trending Badge */}

        <div className="flex justify-center">
          <div className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600 sm:px-5 sm:text-base">
            <FaFire />
            <span>TRENDING NOW</span>
          </div>
        </div>

        {/* Heading */}

        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl xl:text-6xl">
          Featured Auctions
        </h2>

        <p className="mx-auto mt-5 max-w-3xl px-2 text-center text-base text-slate-500 dark:text-slate-400 sm:text-lg">
          Handpicked premium auctions with exciting bids and unbeatable prices.
        </p>

        {/* View All Button */}

        <div className="mt-8 flex justify-center sm:justify-end">
          <Link
            to="/auctions"
            className="flex items-center gap-2 rounded-full border border-blue-600 px-5 py-3 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-400 sm:px-6 sm:text-base"
          >
            View All
            <FiArrowRight />
          </Link>
        </div>

        {/* Auction Grid */}

        <div className="mt-12 sm:mt-14">
          {sortedAuctions.length > 0 ? (
            <AuctionGrid auctions={sortedAuctions} />
          ) : (
            <div className="py-10 text-center">
              <h3 className="text-2xl font-bold text-slate-700 dark:text-white sm:text-3xl">
                No Auction Found
              </h3>

              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
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
