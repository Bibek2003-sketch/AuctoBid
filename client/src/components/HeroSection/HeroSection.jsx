import { useState, useEffect } from "react";
import "./HeroSection.css";

import image2 from "../../assets/images/hero/image2.png";
import WatchHero from "../../assets/images/hero/WatchHero.png";
import furniture from "../../assets/images/hero/furniture.png";
import Macbook from "../../assets/images/hero/Macbook.png";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function HeroSection({ isLoggedIn }) {
  const heroSlides = [
    {
      image: image2,
      title: "Bid Smarter.",
      highlight: "Win Bigger.",
      description:
        "Discover premium Luxury cars through secure live auctions across India.",
      button: "Explore luxury cars",
    },

    {
      image: WatchHero,
      title: "Luxury Watches.",
      highlight: "Exclusive Deals.",
      description:
        "Own authentic luxury watches from trusted sellers at unbeatable prices.",
      button: "View Luxury Watches",
    },

    {
      image: furniture,
      title: "Premium Furniture.",
      highlight: "Elegant Living.",
      description: "Bid on designer furniture and transform your dream home.",
      button: "Explore Furniture",
    },

    {
      image: Macbook,
      title: "Rare Collectibles.",
      highlight: "One Bid Away.",
      description:
        "Find unique collectibles and priceless treasures from verified sellers.",
      button: "Start Bidding",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const heroContent = isLoggedIn
    ? {
        badge: "Welcome Back",
        title: "Discover.",
        highlight: "Bid. Win.",
        description:
          "Browse Live auctions, place bids, and find amazing deals from trusted sellers across India.",
        primaryButton: "Explore Auctions",
        secondaryButton: "Sell an Item",
      }
    : {
        badge: "India's Trusted Online Auction Platform",
        title: heroSlides[currentSlide].title,
        highlight: heroSlides[currentSlide].highlight,
        description: heroSlides[currentSlide].description,
        primaryButton: heroSlides[currentSlide].button,
        secondaryButton: "Start Selling",
      };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <section className="relative h-[550px] overflow-hidden sm:h-[600px] lg:h-[650px]">
      {/* Background Image */}

      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${heroSlides[currentSlide].image})`,
        }}
      ></div>

      {/* Dark Overlay */}

      <div className="hero-overlay absolute inset-0"></div>

      {/* Previous Button */}

      <button
        onClick={() =>
          setCurrentSlide(
            (currentSlide - 1 + heroSlides.length) % heroSlides.length,
          )
        }
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur transition hover:bg-blue-600 sm:left-6 sm:p-3 lg:left-8"
      >
        <FiChevronLeft className="text-xl sm:text-2xl lg:text-3xl" />
      </button>

      {/* Next Button */}

      <button
        onClick={() => setCurrentSlide((currentSlide + 1) % heroSlides.length)}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur transition hover:bg-blue-600 sm:right-6 sm:p-3 lg:right-8"
      >
        <FiChevronRight className="text-xl sm:text-2xl lg:text-3xl" />
      </button>

      {/* Hero Content */}

      <div
        key={currentSlide}
        className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8 animate-fade"
      >
        <div className="max-w-3xl">
          {/* Badge */}

          <span className="inline-block rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white sm:px-5 sm:text-sm">
            {heroContent.badge}
          </span>

          {/* Heading */}

          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:mt-6 lg:text-6xl xl:text-7xl">
            {heroContent.title}
            <br />

            <span className="text-blue-500">{heroContent.highlight}</span>
          </h1>

          {/* Description */}

          <p className="mt-5 max-w-2xl text-base leading-7 text-white sm:text-lg sm:leading-8">
            {heroContent.description}
          </p>

          {/* Buttons */}

          <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:gap-5">
            <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 sm:px-8 sm:py-4">
              {heroContent.primaryButton}
            </button>

            <button className="rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black sm:px-8 sm:py-4">
              {heroContent.secondaryButton}
            </button>
          </div>
        </div>
      </div>

      {/* Indicators */}

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-8 sm:gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 ${
              currentSlide === index
                ? "h-2 w-8 rounded-full bg-blue-600 sm:h-3 sm:w-10"
                : "h-2 w-2 rounded-full bg-white sm:h-3 sm:w-3"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSection;
