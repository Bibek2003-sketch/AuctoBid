import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/Auctobidlogo.png";

import {
  FaChartPie,
  FaGavel,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    {
      name: "Seller Dashboard",
      icon: <FaChartPie />,
      path: "/dashboard",
    },
    {
      name: "My Auctions",
      icon: <FaGavel />,
      path: "/my-auctions",
    },
    {
      name: "Create Auction",
      icon: <FaPlusCircle />,
      path: "/create-auction",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      path: "/profile",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <aside className="hidden h-screen w-64 flex-col bg-slate-50 shadow-xl transition-all duration-500 md:flex dark:bg-slate-800">
      {/* Logo */}

      <div className="px-6 py-8">
        <div className="flex items-center">
          <img
            src={logo}
            alt="AuctoBid Logo"
            className="h-12 w-auto object-contain dark:bg-slate-700"
          />

          <h2 className="ml-3 text-xl font-bold dark:text-white">AuctoBid</h2>
        </div>
      </div>

      {/* Menu */}

      <nav className="flex-1 px-4">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`mb-3 flex items-center gap-4 rounded-xl px-5 py-4 transition ${
              location.pathname === item.path
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            <span className="text-lg">{item.icon}</span>

            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-xl px-5 py-4 text-red-500 transition hover:bg-red-50 dark:hover:bg-slate-700"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
