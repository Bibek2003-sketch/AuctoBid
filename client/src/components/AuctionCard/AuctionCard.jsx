import { FaHeart, FaGavel } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import CountdownTimer from "../CountdownTimer/CountdownTimer";

function AuctionCard({
  _id,
  image,
  title,
  currentBid,
  bids,
  endTime,
  category,
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Link to={`/auction/${_id}`} className="block h-full">
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-48 w-full bg-white p-3 object-cover transition duration-500 group-hover:scale-110 sm:h-56 sm:p-4 md:h-60 lg:h-64"
          />

          {/* Live Badge */}
          
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white sm:left-4 sm:top-4 sm:px-4 sm:py-2 sm:text-sm">
            LIVE
          </span>

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-md transition-all duration-300 hover:scale-110 sm:right-4 sm:top-4 sm:h-11 sm:w-11"
          >
            <FaHeart
              className={`text-lg transition-all duration-300 sm:text-xl ${
                isWishlisted
                  ? "scale-125 text-red-500"
                  : "text-gray-400 hover:text-red-400"
              }`}
            />
          </button>

          {/* Timer */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs text-white backdrop-blur-md sm:bottom-4 sm:right-4 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
            <FiClock />
            <CountdownTimer endTime={endTime} />
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
          {/* Category */}
          <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 sm:text-sm">
            {category || "Electronics"}
          </span>

          {/* Title */}
          <h3 className="mt-3 line-clamp-2 text-xl font-bold text-slate-900 sm:mt-4 sm:text-2xl">
            {title}
          </h3>

          {/* Bid Info */}
          <div className="mt-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500 sm:text-sm">
                Current Bid
              </p>

              <h4 className="text-xl font-bold text-blue-600 sm:text-2xl lg:text-3xl">
                ₹{currentBid}
              </h4>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-500 sm:text-sm">Bids</p>

              <h4 className="text-xl font-bold sm:text-2xl">{bids}</h4>
            </div>
          </div>


          {/* Footer */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-slate-500 sm:text-sm">
              Auction #{_id?.slice(-6).toUpperCase()}
            </p>
          </div>

          {/* Button */}
          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:mt-8 sm:gap-3 sm:py-4 sm:text-base">
            <FaGavel />
            Place Bid
          </button>
        </div>
      </div>
    </Link>
  );
}

export default AuctionCard;