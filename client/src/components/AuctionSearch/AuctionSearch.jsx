import { FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";

function AuctionSearch() {
  return (
    <section className="sticky top-0 z-20 -mt-0">
      <div className="mx-auto max-w-[1500px] rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-800">
            Find Your Perfect Auction
          </h2>

          <p className="mt-2 text-slate-500">
            Search thousands of live auctions across India.
          </p>
        </div>

        <div className="grid grid-cols-5 gap-5">

          {/* Search */}
          <div className="col-span-2 flex items-center rounded-xl border border-gray-300 px-4">
            <FaSearch className="text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-3 py-4 outline-none"
            />
          </div>

          {/* Category */}
          <select className="rounded-xl border border-gray-300 px-4 py-4 outline-none">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Vehicles</option>
            <option>Fashion</option>
            <option>Furniture</option>
            <option>Collectibles</option>
          </select>

          {/* Sort */}
          <select className="rounded-xl border border-gray-300 px-4 py-4 outline-none">
            <option>Ending Soon</option>
            <option>Newest</option>
            <option>Highest Bid</option>
            <option>Lowest Bid</option>
          </select>

          {/* Button */}
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