// Search icon
import { FaSearch } from "react-icons/fa";

// Button icon
import { FiFilter } from "react-icons/fi";

// Receive data from Home.jsx using props
function AuctionSearch({
  // Search state
  searchTerm,
  setSearchTerm,

  // Category state
  selectedCategory,
  setSelectedCategory,

  // Sorting state
  selectedSort,
  setSelectedSort,
}) {
  return (
    <section className="sticky top-0 z-20">
      <div className="mx-auto max-w-[1500px] rounded-3xl bg-white p-8 shadow-2xl">
        {/* Heading */}

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-800">
            Find Your Perfect Auction
          </h2>

          <p className="mt-2 text-slate-500">
            Search thousands of live auctions across India.
          </p>
        </div>

        <div className="grid grid-cols-5 gap-5">
          {/* Search Input */}

          <div className="col-span-2 flex items-center rounded-xl border border-gray-300 px-4">
            <FaSearch className="text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
              /* React controls the value */
              value={searchTerm}
              /* Update Home state whenever the user types */
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-4 outline-none"
            />
          </div>

          {/* Category Dropdown */}

          {/* =====================================
    Category Dropdown
    React controls the selected option
===================================== */}

          <select
            // Current selected category
            value={selectedCategory}
            // Update state whenever user changes category
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-gray-300 px-4 py-4 outline-none"
          >
            <option>All Categories</option>

            <option>Electronics</option>

            <option>Vehicles</option>

            <option>Fashion</option>

            <option>Furniture</option>

            <option>Collectibles</option>
          </select>

          {/* Sorting Dropdown */}

          <select
            // Current selected sorting option
            value={selectedSort}
            // Update sorting whenever user selects another option
            onChange={(e) => setSelectedSort(e.target.value)}
            className="rounded-xl border border-gray-300 px-4 py-4 outline-none"
          >
            <option>Ending Soon</option>
            <option>Newest</option>
            <option>Highest Bid</option>
            <option>Lowest Bid</option>
          </select>

          {/* Search Button */}

          <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700">
            <FiFilter />
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

export default AuctionSearch;
