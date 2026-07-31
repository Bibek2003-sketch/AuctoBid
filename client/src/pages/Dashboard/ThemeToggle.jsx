import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-10 w-20 items-center rounded-full bg-slate-200 p-1 transition-all duration-300 sm:h-12 sm:w-24 dark:bg-slate-700"
    >
      {/* Sliding Circle */}

      <div
        className={`absolute flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 sm:h-10 sm:w-10 ${
          darkMode ? "translate-x-10 sm:translate-x-12" : "translate-x-0"
        }`}
      >
        {darkMode ? (
          <FaMoon className="text-sm text-blue-600 sm:text-base" />
        ) : (
          <FaSun className="text-sm text-yellow-500 sm:text-base" />
        )}
      </div>

      {/* Icons */}

      <div className="flex w-full justify-between px-2">
        <FaSun className="text-sm text-yellow-500 sm:text-base" />

        <FaMoon className="text-sm text-slate-300 sm:text-base" />
      </div>
    </button>
  );
}

export default ThemeToggle;