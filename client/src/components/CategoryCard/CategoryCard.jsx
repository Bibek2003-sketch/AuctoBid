// =======================================================
// React Router
// =======================================================

import { Link } from "react-router-dom";

// =======================================================
// Reusable Category Card
// =======================================================

function CategoryCard({
  name,
  description,
  icon: Icon,
}) {
  return (

    <Link
      to={`/auctions?category=${name}`}
      className="group rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
    >

      {/* Category Icon */}

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">

        <Icon />

      </div>

      {/* Category Name */}

      <h2 className="mt-6 text-2xl font-bold text-slate-800">

        {name}

      </h2>

      {/* Description */}

      <p className="mt-3 text-slate-500">

        {description}

      </p>

    </Link>

  );
}

export default CategoryCard;