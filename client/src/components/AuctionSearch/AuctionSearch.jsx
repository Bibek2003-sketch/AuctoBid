import { FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";

function AuctionSearch({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedSort,
  setSelectedSort,
}) {
  return (
    <section className="sticky top-0 z-20 px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-5 shadow-2xl shadow-amber-400 transition-colors duration-300 dark:bg-slate-900 dark:shadow-black/30 sm:p-6 lg:p-8">
        {/* Heading */}

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Find Your Perfect Auction
          </h2>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            Search thousands of live auctions across India.
          </p>
        </div>

        {/* Search Section */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {/* Search Input */}

          <div className="flex items-center rounded-xl border border-gray-300 bg-white px-4 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 md:col-span-2 xl:col-span-2">
            <FaSearch className="text-gray-400 dark:text-slate-400" />

            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent px-3 py-3 text-slate-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          {/* Category */}

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Vehicles</option>
            <option>Fashion</option>
            <option>Furniture</option>
            <option>Collectibles</option>
          </select>

          {/* Sort */}

          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option>Ending Soon</option>
            <option>Newest</option>
            <option>Highest Bid</option>
            <option>Lowest Bid</option>
          </select>

          {/* Button */}

          <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
            <FiFilter />
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

export default AuctionSearch;