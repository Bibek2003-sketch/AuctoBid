import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import logo from "../../assets/images/logo/Auctobidlogo.png";
import ThemeToggle from "../../pages/Dashboard/ThemeToggle";

import {
  FaArrowRight,
  FaHome,
  FaGavel,
  FaThLarge,
  FaInfoCircle,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const guestLinks = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "Live Auctions", path: "/", icon: FaGavel },
    { name: "Categories", path: "/", icon: FaThLarge },
    { name: "About", path: "/about", icon: FaInfoCircle },
  ];

  const userLinks = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "Categories", path: "/", icon: FaThLarge },
    { name: "Create Auction", path: "/create-auction", icon: FaGavel },
    { name: "My Bids", path: "/my-bids", icon: FaGavel },
  ];

  const links = isLoggedIn ? userLinks : guestLinks;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md dark:bg-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* ================= Logo ================= */}

        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="AuctoBid Logo"
            className="h-10 w-auto object-contain sm:h-12 lg:h-14"
          />

          <h2 className="text-lg font-bold text-blue-950 dark:text-white sm:text-xl">
            AuctoBid
          </h2>
        </Link>

        {/* ================= Desktop Navigation ================= */}

        <ul className="hidden lg:flex items-center gap-6 font-medium text-gray-700 xl:gap-8 dark:text-gray-200">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="group flex items-center gap-2 transition hover:text-blue-600"
                >
                  <Icon className="transition group-hover:scale-110" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ================= Desktop Right Side ================= */}

        <div className="hidden lg:flex items-center gap-5">
          {!isLoggedIn ? (
            <>
              <ThemeToggle />

              <Link
                to="/login"
                className="rounded-full border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-gray-600 dark:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
              >
                Sign Up
                <FaArrowRight />
              </Link>
            </>
          ) : (
            <>
              <button className="text-xl text-gray-700 transition hover:text-blue-600 dark:text-white">
                <FaBell />
              </button>

              <ThemeToggle />

              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 transition hover:bg-gray-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
              >
                <FaUserCircle className="text-xl" />
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-full bg-red-500 px-5 py-2 font-medium text-white transition hover:bg-red-600"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          )}
        </div>

        {/* ================= Mobile Right Side ================= */}

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl text-gray-700 dark:text-white"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* ================= Mobile Menu ================= */}

      {mobileMenuOpen && (
        <div className="border-t bg-white px-6 py-6 shadow-lg dark:border-slate-700 dark:bg-slate-900 lg-hidden">
          <div className="flex flex-col gap-5">
            {links.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-lg font-medium text-gray-700 dark:text-white"
                >
                  <Icon />
                  {item.name}
                </Link>
              );
            })}

            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-lg font-medium dark:text-white"
                >
                  <FaUserCircle />
                  Profile
                </Link>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 text-left text-lg font-medium text-red-500"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium dark:text-white"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-blue-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
