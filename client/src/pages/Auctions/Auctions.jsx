import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AuctionSearch from "../../components/AuctionSearch/AuctionSearch";
import AuctionGrid from "../../components/AuctionGrid/AuctionGrid";

import { getAllAuctions } from "../../api/auctionApi";

function Auctions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSort, setSelectedSort] = useState("Ending Soon");

  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const filteredAuctions = auctions.filter((auction) => {
    const matchesSearch = auction.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      auction.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
      <Navbar />

      {/* Hero */}

      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Live Auctions
          </h1>

          <p className="mt-5 text-base text-slate-300 sm:text-lg">
            Browse thousands of premium products from trusted sellers across
            India.
          </p>
        </div>
      </section>

      {/* Search */}

      <div className="mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <AuctionSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
      </div>

      {/* Results */}

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Showing {sortedAuctions.length} Auction
              {sortedAuctions.length !== 1 ? "s" : ""}
            </h2>

            <span className="w-fit rounded-full bg-blue-600 px-5 py-2 text-white">
              {selectedCategory}
            </span>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <h2 className="text-2xl font-bold">
                Loading Auctions...
              </h2>
            </div>
          ) : sortedAuctions.length > 0 ? (
            <AuctionGrid auctions={sortedAuctions} />
          ) : (
            <div className="py-20 text-center">
              <h2 className="text-2xl font-bold text-slate-700 sm:text-3xl">
                No Auctions Found
              </h2>

              <p className="mt-3 text-slate-500">
                Try another search or category.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Auctions;