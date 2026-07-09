import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AuctionDetails from "../pages/AuctionDetails/AuctionDetails";
import Auctions from "../pages/Auctions/Auctions";
import Categories from "../pages/Categories/Categories";
import About from "../pages/About/About";

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
    </Routes>
  );
}

export default AppRoutes;