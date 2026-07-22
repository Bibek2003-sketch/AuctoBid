function StatCard({ title, value, icon, color }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </h2>

        </div>

        <div className={`rounded-2xl p-4 ${color}`}>
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;