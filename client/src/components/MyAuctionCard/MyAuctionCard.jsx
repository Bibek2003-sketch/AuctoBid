// ======================================================
// React Router
// ======================================================

import { Link } from "react-router-dom";

// ======================================================
// Icons
// ======================================================

import { FaEye, FaEdit, FaTrash, FaGavel, FaClock } from "react-icons/fa";

// ======================================================
// Countdown Component
// ======================================================

import CountdownTimer from "../CountdownTimer/CountdownTimer";

// ======================================================
// MyAuctionCard Component
//
// Displays one auction created by the seller.
//
// Later this card will receive real auction data
// from the backend.
// ======================================================

function MyAuctionCard({ auction, onDelete }) {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
        dark:bg-slate-800
      "
    >
      {/* =====================================
          Auction Image
      ===================================== */}

      <div className="relative h-56 overflow-hidden">
        <img
          src={auction.image}
          alt={auction.title}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            hover:scale-110
          "
        />

        {/* Status Badge */}

        <span
          className={`
            absolute
            right-4
            top-4
            rounded-full
            px-4
            py-2
            text-xs
            font-semibold
            text-white

            ${auction.status === "active" ? "bg-green-600" : "bg-red-600"}
          `}
        >
          {auction.status.toUpperCase()}
        </span>
      </div>

      {/* =====================================
          Content
      ===================================== */}

      <div className="p-6">
        {/* Category */}

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {auction.category}
        </span>

        {/* Title */}

        <h2 className="mt-4 text-2xl font-bold dark:text-white">
          {auction.title}
        </h2>

        {/* Current Bid */}

        <div className="mt-6 flex items-center gap-3">
          <FaGavel className="text-blue-600" />

          <span className="font-semibold dark:text-white">
            ₹{auction.currentBid.toLocaleString()}
          </span>
        </div>

        {/* Countdown */}

        <div className="mt-4 flex items-center gap-3">
          <FaClock className="text-red-500" />

          <CountdownTimer endTime={auction.endTime} />
        </div>

        {/* Highest Bidder */}

        <div className="mt-5">
          <p className="text-sm text-slate-500">Highest Bidder</p>

          <h3 className="font-semibold dark:text-white">
            {auction.highestBidder?.name || "No bids yet"}
          </h3>
        </div>

        {/* Buttons */}

        <div className="mt-8 grid grid-cols-3 gap-3">
          {/* View */}

          <Link
            to={`/auction/${auction._id}`}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              py-3
              text-white
              transition
              hover:bg-blue-700
            "
          >
            <FaEye />
          </Link>

          {/* Edit */}

          <Link
            to={`/edit-auction/${auction._id}`}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-amber-500
              py-3
              text-white
              transition
              hover:bg-amber-600
            "
          >
            <FaEdit />
          </Link>

          {/* Delete */}

          <button
            onClick={() => onDelete(auction._id)}
            className="flex items-center justify-center text-white bg-red-600 rounded-xl transition hover:bg-red-700 cursor-pointer"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyAuctionCard;
