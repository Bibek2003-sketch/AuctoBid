function FeatureCard({ title, description, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-transparent bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl sm:p-6 lg:p-8">
      {/* Icon */}

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl text-blue-600 sm:h-16 sm:w-16 sm:text-3xl">
        <Icon />
      </div>

      {/* Title */}

      <h3 className="mt-5 text-xl font-bold text-slate-800 sm:mt-6 sm:text-2xl">
        {title}
      </h3>

      {/* Description */}

      <p className="mt-3 text-sm leading-6 text-slate-500 sm:mt-4 sm:text-base sm:leading-7">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;