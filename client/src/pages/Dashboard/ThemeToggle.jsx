import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-12 w-24 items-center rounded-full bg-slate-200 p-1 transition-all duration-300 dark:bg-slate-700"
    >
      {/* Sliding Circle */}

      <div
        className={`absolute flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 ${
          darkMode ? "translate-x-12" : "translate-x-0"
        }`}
      >
        {darkMode ? (
          <FaMoon className="text-blue-600" />
        ) : (
          <FaSun className="text-yellow-500" />
        )}
      </div>

      {/* Icons */}

      <div className="flex w-full justify-between px-2">

        <FaSun className="text-yellow-500" />

        <FaMoon className="text-slate-300" />

      </div>
    </button>
  );
}

export default ThemeToggle;