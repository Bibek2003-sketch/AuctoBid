import CategoryCard from "../CategoryCard/CategoryCard";
import categories from "../../data/categories";

function CategorySection() {
  return (
    <section className="bg-slate-50 py-16 transition-colors duration-300 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}

        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Browse Categories
          </h2>

          <p className="mt-4 text-base text-slate-500 sm:text-lg">
            Find auctions from your favorite categories.
          </p>
        </div>

        {/* Categories Grid */}

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              description={category.description}
              auctions={category.auctions}
              icon={category.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;