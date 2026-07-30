// Import all reusable components
import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/HeroSection/HeroSection";
import Footer from "../../components/Footer/Footer";
import FeaturedAuctions from "../../components/FeaturedAuctions/FeaturedAuctions";
import CategorySection from "../../components/CategorySection/CategorySection";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import AuctionSearch from "../../components/AuctionSearch/AuctionSearch";

function Home() {
  // ===============================
  // Store whatever the user types
  // inside the search box.
  //
  // This state is placed here because
  // BOTH AuctionSearch and
  // FeaturedAuctions need it.
  // ===============================

  const [searchTerm, setSearchTerm] = useState("");

  // Store the selected category
  // Initially all categories are shown.
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Store the selected sorting option
  const [selectedSort, setSelectedSort] = useState("Ending Soon");

  // logged in user or not
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <>
      <Navbar />

      <HeroSection isLoggedIn={isLoggedIn} />

      {isLoggedIn ? (
        <>
          <AuctionSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />

          <FeaturedAuctions
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedSort={selectedSort}
          />

          {/* Future Marketplace Components */}
          {/* <EndingSoon /> */}
          {/* <NewestAuctions /> */}
        </>
      ) : (
        <>
          <CategorySection />

          <FeaturedAuctions
            searchTerm=""
            selectedCategory="All Categories"
            selectedSort="Ending Soon"
          />

          <WhyChooseUs />
        </>
      )}

      <Footer />
    </>
  );
}

export default Home;
