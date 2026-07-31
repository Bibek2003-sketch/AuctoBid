import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
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
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

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
        {/* Logo */}

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

        {/* Navigation */}

        <ul className="hidden items-center gap-6 font-medium text-gray-700 lg:flex xl:gap-8 dark:text-gray-200">
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
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />

            <Link
              to="/login"
              className="rounded-full border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-600 hover:text-blue-600 sm:px-6 dark:border-gray-600 dark:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="flex items-center gap-2 rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-6"
            >
              <span className="hidden sm:inline">Sign Up</span>
              <FaArrowRight />
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-5">
            <button className="text-lg text-gray-700 transition hover:text-blue-600 sm:text-xl dark:text-white">
              <FaBell />
            </button>

            <ThemeToggle />

            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 transition hover:bg-gray-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              <FaUserCircle className="text-lg sm:text-xl" />
              <span className="hidden lg:inline">Profile</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600 sm:px-5"
            >
              <FaSignOutAlt />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
