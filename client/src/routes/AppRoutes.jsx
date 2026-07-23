import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AuctionDetails from "../pages/AuctionDetails/AuctionDetails";
import Auctions from "../pages/Auctions/Auctions";
import Categories from "../pages/Categories/Categories";
import About from "../pages/About/About";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreateAuction from "../pages/CreateAuction/CreateAuction";
import Profile from "../pages/profile/profile";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/auction/:id" element={<AuctionDetails />} />
      <Route path="/auctions" element={<Auctions />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-auction" element={<CreateAuction />} />
      <Route path="/edit-auction/:id" element={<CreateAuction />} />
      <Route path="/profile" element={<Profile />} />

    </Routes>
  );
}

export default AppRoutes;
