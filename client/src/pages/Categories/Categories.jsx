// =======================================================
// Layout Components
// =======================================================

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// =======================================================
// Reusable Component
// =======================================================

import CategoryCard from "../../components/CategoryCard/CategoryCard";

// =======================================================
// Categories Data
// =======================================================

import categories from "../../data/categories";

function Categories() {
  return (
    <>
      {/* Navbar */}

      <Navbar />

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 py-28">
        <div className="mx-auto max-w-[1500px] px-8">
          <h1 className="text-center text-6xl font-bold text-white">
            Browse Categories
          </h1>

          <p className="mt-6 text-center text-lg text-slate-300">
            Discover premium products across different auction categories.
          </p>
        </div>
      </section>

      {/* Categories Grid */}

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-[1500px] px-8">
          <div className="grid grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}

      <Footer />
    </>
  );
}

export default Categories;
