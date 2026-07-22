import { FaHeart, FaGavel } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";
// ===============================================
// React Hook
//
// useState stores data inside this component.
// Here it remembers whether the auction has
// been added to the wishlist.
// ===============================================

import { useState } from "react";
import CountdownTimer from "../CountdownTimer/CountdownTimer";

function AuctionCard({ id, image, title, currentBid, bids, timeLeft }) {
  // ===============================================
  // Wishlist State
  //
  // false = Not in wishlist
  // true  = Added to wishlist
  //
  // React automatically re-renders the component
  // whenever this state changes.
  // ===============================================

  const [isWishlisted, setIsWishlisted] = useState(false);
  return (
    <Link to={`/auction/${id}`} className="block">
      <div className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-62 w-full bg-white p-4 object-cover transition duration-500 group-hover:scale-110"
          />

          {/* Live Badge */}

          <span className="absolute left-4 top-4 rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white">
            LIVE
          </span>

          {/* Wishlist */}

          {/* ==========================================
                  Wishlist Button

                  Clicking the button changes the
                  wishlist state.

                  If the item is already wishlisted,
                  clicking again removes it.
              ========================================== */}

          <button
            // Prevent the Link from opening
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              // Toggle wishlist state
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 backdrop-blur-md transition-all duration-300 hover:scale-110"
          >
            <FaHeart
              className={`text-xl transition-all duration-300 ${
                isWishlisted
                  ? "text-red-500 scale-125"
                  : "text-gray-400 hover:text-red-400"
              }`}
            />
          </button>

          {/* Timer */}

          <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-sm text-white backdrop-blur-md">
            {/* Clock Icon */}
            <FiClock />

            {/* Live Countdown */}
            <CountdownTimer timeLeft={timeLeft} />
          </div>
        </div>

        {/* Card Body */}

        <div className="p-6">
          {/* Category */}

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
            Electronics
          </span>

          {/* Title */}

          <h3 className="mt-4 text-2xl font-bold text-slate-900">{title}</h3>

          {/* Bid */}

          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Current Bid</p>

              <h4 className="text-3xl font-bold text-blue-600">
                ₹{currentBid}
              </h4>
            </div>

            <div className="text-right">
              <p className="text-sm text-slate-500">Bids</p>

              <h4 className="text-2xl font-bold">{bids}</h4>
            </div>
          </div>

          {/* Progress */}

          <div className="mt-6">
            <div className="h-2 rounded-full bg-slate-200">
              <div className="h-2 w-3/4 rounded-full bg-blue-600"></div>
            </div>
          </div>

          {/* Footer */}

          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-slate-500">Auction #AB1023</p>

            <p className="text-sm font-semibold text-red-500">Ending Soon</p>
          </div>

          {/* Button */}

          <button className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700">
            <FaGavel />
            Place Bid
          </button>
        </div>
      </div>
    </Link>
  );
}

export default AuctionCard;
