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

  return (
    <>
      <Navbar />

      <HeroSection />

      {/* 
        Pass the current search text, selectedCategory, selectedsort
        and the function that updates it
        to the search component.
      */}
      <AuctionSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}

        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}

        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />

      {/* 
        Pass the search term, selectedCategory, selectedSort to the Featured Auctions component.
      */}
      <FeaturedAuctions
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedSort={selectedSort}
      />

      <CategorySection />

      <WhyChooseUs />

      <Footer />
    </>
  );
}

export default Home;
