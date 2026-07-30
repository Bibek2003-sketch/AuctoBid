import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/Auctobidlogo.png";
import ThemeToggle from "../../pages/Dashboard/ThemeToggle"; // Adjust path if needed

import {
  FaArrowRight,
  FaHome,
  FaGavel,
  FaThLarge,
  FaInfoCircle,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const guestLinks = [
    {
      name: "Home",
      path: "/",
      icon: FaHome,
    },
    {
      name: "Live Auctions",
      path: "/",
      icon: FaGavel,
    },
    {
      name: "Categories",
      path: "/",
      icon: FaThLarge,
    },
    {
      name: "About",
      path: "/about",
      icon: FaInfoCircle,
    },
  ];

  const userLinks = [
    {
      name: "Home",
      path: "/",
      icon: FaHome,
    },
    {
      name: "Categories",
      path: "/",
      icon: FaThLarge,
    },
    {
      name: "Create Auction",
      path: "/create-auction",
      icon: FaGavel,
    },
    {
      name: "My Bids",
      path: "/my-bids",
      icon: FaGavel,
    },
  ];

  const links = isLoggedIn ? userLinks : guestLinks;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md dark:bg-slate-900">
      <div className="mx-auto flex max-w-1500px items-center justify-between px-8 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="AuctoBid Logo"
            className="h-14 w-auto object-contain"
          />

          <h2 className="text-xl font-bold text-blue-950 dark:text-white">
            AuctoBid
          </h2>
        </Link>

        {/* Navigation */}
        <ul className="flex items-center gap-8 font-medium text-gray-700 dark:text-gray-200">
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

        {/* Right Side */}
        {!isLoggedIn ? (
          
          <div className="flex items-center gap-4">
            {/* Login */}
            <ThemeToggle />
            <Link
              to="/login"
              className="rounded-full border border-gray-300 px-6 py-2 font-medium text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-gray-600 dark:text-white"
            >
              Login
            </Link>

            {/* Register */}

            <Link
              to="/register"
              className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              Sign Up
              <FaArrowRight />
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            {/* Notification */}

            <button className="relative text-xl text-gray-700 transition hover:text-blue-600 dark:text-white">
              <FaBell />
            </button>

            {/* Theme Toggle */}

            <ThemeToggle />

            {/* Profile */}

            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 transition hover:bg-gray-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              <FaUserCircle className="text-xl" />
              <span>Profile</span>
            </Link>

            {/* Logout */}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full bg-red-500 px-5 py-2 font-medium text-white transition hover:bg-red-600"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;