import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import CategoryCard from "../../components/CategoryCard/CategoryCard";

import categories from "../../data/categories";

function Categories() {
  return (
    <>
      {/* Navbar */}

      <Navbar />

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Browse Categories
          </h1>

          <p className="mt-5 text-center text-base text-slate-300 sm:text-lg">
            Discover premium products across different auction categories.
          </p>
        </div>
      </section>

      {/* Categories Grid */}

      <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                {...category}
              />
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