import { Link } from "react-router-dom";

function CategoryCard({ name, description, icon: Icon }) {
  return (
    <Link
      to={`/auctions?category=${name}`}
      className="group flex h-full flex-col rounded-2xl bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:p-6 lg:p-8"
    >
      {/* Category Icon */}

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white sm:h-20 sm:w-20 sm:text-4xl">
        <Icon />
      </div>

      {/* Category Name */}

      <h2 className="mt-5 text-xl font-bold text-slate-800 sm:mt-6 sm:text-2xl">
        {name}
      </h2>

      {/* Description */}

      <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
        {description}
      </p>
    </Link>
  );
}

export default CategoryCard;
