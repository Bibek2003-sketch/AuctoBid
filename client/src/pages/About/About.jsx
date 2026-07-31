import {
  FaGavel,
  FaShieldAlt,
  FaUsers,
  FaBolt,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-slate-50">
      {/* Hero */}

      <section className="bg-gradient-to-r from-slate-900 to-blue-900 py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:gap-16 lg:px-8 lg:text-left">
          <div className="max-w-3xl">
            <span className="rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold sm:text-sm">
              About AuctoBid
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl xl:text-8xl">
              India's Trusted
              <br />
              Online Auction Platform
            </h1>

            <p className="mt-6 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              AuctoBid is a modern marketplace where buyers and sellers
              participate in secure, transparent and exciting online auctions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h2 className="text-center text-3xl font-bold sm:text-4xl lg:text-5xl">
          Our Story
        </h2>

        <p className="mx-auto mt-6 max-w-4xl text-center text-base leading-8 text-slate-600 sm:mt-8 sm:text-lg sm:leading-9">
          AuctoBid was built to transform the traditional auction experience
          into a fast, transparent and user-friendly digital platform. Whether
          you're bidding on premium electronics, luxury furniture,
          collectibles or vehicles, we make every auction exciting and secure.
        </p>
      </section>

      {/* Features */}

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8 lg:pb-24">
        <div className="rounded-3xl bg-white p-6 text-center shadow-lg sm:p-8">
          <FaShieldAlt className="mx-auto text-4xl text-blue-600 sm:text-5xl" />

          <h3 className="mt-5 text-xl font-bold sm:text-2xl">
            Secure Bidding
          </h3>

          <p className="mt-3 text-sm text-slate-500 sm:mt-4 sm:text-base">
            Transparent and fair bidding experience.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 text-center shadow-lg sm:p-8">
          <FaBolt className="mx-auto text-4xl text-blue-600 sm:text-5xl" />

          <h3 className="mt-5 text-xl font-bold sm:text-2xl">
            Live Auctions
          </h3>

          <p className="mt-3 text-sm text-slate-500 sm:mt-4 sm:text-base">
            Real-time bidding updates.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 text-center shadow-lg sm:p-8">
          <FaUsers className="mx-auto text-4xl text-blue-600 sm:text-5xl" />

          <h3 className="mt-5 text-xl font-bold sm:text-2xl">
            Trusted Community
          </h3>

          <p className="mt-3 text-sm text-slate-500 sm:mt-4 sm:text-base">
            Thousands of buyers and sellers.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 text-center shadow-lg sm:p-8">
          <FaGavel className="mx-auto text-4xl text-blue-600 sm:text-5xl" />

          <h3 className="mt-5 text-xl font-bold sm:text-2xl">
            Premium Auctions
          </h3>

          <p className="mt-3 text-sm text-slate-500 sm:mt-4 sm:text-base">
            Exclusive products every day.
          </p>
        </div>
      </section>

      {/* Statistics */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 text-center sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold text-blue-600 sm:text-5xl">
              25K+
            </h2>

            <p className="mt-2 text-sm text-slate-500 sm:mt-3 sm:text-base">
              Active Auctions
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-blue-600 sm:text-5xl">
              10K+
            </h2>

            <p className="mt-2 text-sm text-slate-500 sm:mt-3 sm:text-base">
              Registered Users
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-blue-600 sm:text-5xl">
              500+
            </h2>

            <p className="mt-2 text-sm text-slate-500 sm:mt-3 sm:text-base">
              Verified Sellers
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-blue-600 sm:text-5xl">
              98%
            </h2>

            <p className="mt-2 text-sm text-slate-500 sm:mt-3 sm:text-base">
              Customer Satisfaction
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-12 text-center text-white sm:px-10 sm:py-16 lg:px-12 lg:py-20">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Ready to Start Bidding?
          </h2>

          <p className="mt-5 text-base text-blue-100 sm:mt-6 sm:text-lg">
            Join thousands of users discovering exciting auctions every day.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:justify-center sm:gap-5">
            <Link
              to="/auctions"
              className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 transition hover:scale-105"
            >
              Explore Auctions
            </Link>

            <Link
              to="/register"
              className="flex items-center justify-center gap-2 rounded-xl border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-blue-700"
            >
              Create Account
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;