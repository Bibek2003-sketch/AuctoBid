function FeatureCard({ title, description, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-transparent bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl">

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl text-blue-600">
        <Icon />
      </div>

      <h3 className="mt-6 text-2xl font-bold text-slate-800">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-500">
        {description}
      </p>

    </div>
  );
}

export default FeatureCard;