import {
  FaGavel,
  FaShieldAlt,
  FaUsers,
  FaBolt,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import furniture from "../../assets/images/furniture.png";

function About() {
  return (
    <div className="bg-slate-50">
      {/* Hero */}

      <section className="bg-gradient-to-r from-slate-900 to-blue-900 py-24 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-16 px-8">
          <div className="max-w-2xl">
            <span className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold">
              About AuctoBid
            </span>

            <h1 className="mt-8 text-6xl font-bold leading-tight">
              India's Trusted
              <br />
              Online Auction Platform
            </h1>

            <p className="mt-8 text-lg leading-8 text-slate-300">
              AuctoBid is a modern marketplace where buyers and sellers
              participate in secure, transparent and exciting online auctions.
            </p>
          </div>

          <div className="flex h-[500px] items-center justify-center rounded-3xl bg-slate-200 shadow-2xl">
            <h2 className="text-3xl font-bold text-slate-500">
              image to be added
            </h2>
          </div>
        </div>
      </section>

      {/* Our Story */}

      <section className="mx-auto max-w-7xl py-24 px-8">
        <h2 className="text-center text-5xl font-bold">Our Story</h2>

        <p className="mx-auto mt-8 max-w-4xl text-center text-lg leading-9 text-slate-600">
          AuctoBid was built to transform the traditional auction experience
          into a fast, transparent and user-friendly digital platform. Whether
          you're bidding on premium electronics, luxury furniture, collectibles
          or vehicles, we make every auction exciting and secure.
        </p>
      </section>

      {/* Features */}

      <section className="mx-auto grid max-w-7xl grid-cols-4 gap-8 px-8 pb-24">
        <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
          <FaShieldAlt className="mx-auto text-5xl text-blue-600" />

          <h3 className="mt-6 text-2xl font-bold">Secure Bidding</h3>

          <p className="mt-4 text-slate-500">
            Transparent and fair bidding experience.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
          <FaBolt className="mx-auto text-5xl text-blue-600" />

          <h3 className="mt-6 text-2xl font-bold">Live Auctions</h3>

          <p className="mt-4 text-slate-500">Real-time bidding updates.</p>
        </div>

        <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
          <FaUsers className="mx-auto text-5xl text-blue-600" />

          <h3 className="mt-6 text-2xl font-bold">Trusted Community</h3>

          <p className="mt-4 text-slate-500">
            Thousands of buyers and sellers.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
          <FaGavel className="mx-auto text-5xl text-blue-600" />

          <h3 className="mt-6 text-2xl font-bold">Premium Auctions</h3>

          <p className="mt-4 text-slate-500">Exclusive products every day.</p>
        </div>
      </section>

      {/* Statistics */}

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-4 text-center">
          <div>
            <h2 className="text-5xl font-bold text-blue-600">25K+</h2>

            <p className="mt-3 text-slate-500">Active Auctions</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-blue-600">10K+</h2>

            <p className="mt-3 text-slate-500">Registered Users</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-blue-600">500+</h2>

            <p className="mt-3 text-slate-500">Verified Sellers</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-blue-600">98%</h2>

            <p className="mt-3 text-slate-500">Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-24">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 px-12 py-20 text-center text-white">
          <h2 className="text-5xl font-bold">Ready to Start Bidding?</h2>

          <p className="mt-6 text-lg text-blue-100">
            Join thousands of users discovering exciting auctions every day.
          </p>

          <div className="mt-10 flex justify-center gap-5">
            <Link
              to="/auctions"
              className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 transition hover:scale-105"
            >
              Explore Auctions
            </Link>

            <Link
              to="/register"
              className="flex items-center gap-2 rounded-xl border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-blue-700"
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
