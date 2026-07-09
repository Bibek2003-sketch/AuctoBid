import AuctionCard from "../AuctionCard/AuctionCard";
import featuredAuctions from "../../data/featuredAuctions";
import { FaFire } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

function FeaturedAuctions() {
  return (
    <section className="bg-slate-50 py-24">

      <div className="mx-auto max-w-[1500px] px-8">

        {/* Badge */}

        <div className="flex justify-center">

          <div className="flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 text-orange-600">

            <FaFire />

            <span className="font-semibold">
              TRENDING NOW
            </span>

          </div>

        </div>

        {/* Heading */}

        <h2 className="mt-6 text-center text-6xl font-extrabold text-slate-900">

          Featured Auctions
          

        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-center text-lg text-slate-500">

          Handpicked premium auctions with exciting bids and unbeatable prices.

        </p>

        {/* View All */}

        <div className="mt-8 flex justify-end">

          <button className="flex items-center gap-3 rounded-full border border-blue-600 px-6 py-3 text-blue-600 transition hover:bg-blue-600 hover:text-white">

            View All

            <FiArrowRight />

          </button>

        </div>

        {/* Cards */}

        <div className="mt-14 grid grid-cols-4 gap-8">

          {featuredAuctions.map((auction) => (

            <AuctionCard
              key={auction.id}
              {...auction}
            />

          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedAuctions;