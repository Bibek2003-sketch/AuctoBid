import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/HeroSection/HeroSection";
import Footer from "../../components/Footer/Footer";
import FeaturedAuctions from "../../components/FeaturedAuctions/FeaturedAuctions";
import CategorySection from "../../components/CategorySection/CategorySection";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import AuctionSearch from "../../components/AuctionSearch/AuctionSearch";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AuctionSearch />
      <FeaturedAuctions />
      <CategorySection />
      <WhyChooseUs />
      <Footer />
    </>
  );
}

export default Home;