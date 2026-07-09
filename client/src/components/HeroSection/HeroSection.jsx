import { useState, useEffect } from "react";
import "./HeroSection.css";

import image2 from "../../assets/images/image2.png";
import WatchHero from "../../assets/images/WatchHero.png";
import furniture from "../../assets/images/furniture.png";
import Macbook from "../../assets/images/Macbook.png";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function HeroSection() {
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
      description:
        "Bid on designer furniture and transform your dream home.",
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <section className="relative h-[650px] overflow-hidden">

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
            (currentSlide - 1 + heroSlides.length) % heroSlides.length
          )
        }
        className="absolute left-8 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur transition hover:bg-blue-600"
      >
        <FiChevronLeft size={30} />
      </button>

      {/* Next Button */}

      <button
        onClick={() =>
          setCurrentSlide((currentSlide + 1) % heroSlides.length)
        }
        className="absolute right-8 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur transition hover:bg-blue-600"
      >
        <FiChevronRight size={30} />
      </button>

      {/* Hero Content */}

      <div
        key={currentSlide}
        className="relative z-10 mx-auto flex h-full max-w-[1500px] items-center px-8 animate-fade"
      >
        <div className="max-w-2xl">

          <span className="inline-block rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
            India's Trusted Online Auction Platform
          </span>

          <h1 className="mt-6 text-6xl font-extrabold leading-tight text-white">
            {heroSlides[currentSlide].title}
            <br />
            <span className="text-blue-500">
              {heroSlides[currentSlide].highlight}
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-white">
            {heroSlides[currentSlide].description}
          </p>

          <div className="mt-10 flex gap-5">

            <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700">
              {heroSlides[currentSlide].button}
            </button>

            <button className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-black">
              Start Selling
            </button>

          </div>

        </div>
      </div>

      {/* Slide Indicators */}

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">

        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 ${
              currentSlide === index
                ? "h-3 w-10 rounded-full bg-blue-600"
                : "h-3 w-3 rounded-full bg-white"
            }`}
          ></button>
        ))}

      </div>
    </section>
  );
}

export default HeroSection;