function StatCard({ title, value, icon, color }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:p-5 lg:p-6 dark:bg-slate-800">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side */}

        <div className="min-w-0">
          <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            {title}
          </p>

          <h2 className="mt-2 break-words text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
            {value}
          </h2>
        </div>

        {/* Right Side */}

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl text-white sm:h-16 sm:w-16 sm:text-2xl ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
