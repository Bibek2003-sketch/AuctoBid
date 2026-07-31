import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

function PasswordField({
  name,
  placeholder,
  value,
  onChange,
  error,
  showPassword,
  togglePassword,
}) {
  return (
    <div className="w-full">
      <div className="relative">
        {/* Lock Icon */}

        <RiLockPasswordFill className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />

        {/* Password Input */}

        <input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-xl border bg-white py-3 pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 sm:text-base
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-300 focus:border-blue-600"
          }`}
        />

        {/* Eye Button */}

        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-500 transition hover:text-blue-600"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {/* Error */}

      {error && (
        <p className="mt-2 text-xs text-red-500 sm:text-sm">
          {error}
        </p>
      )}
    </div>
  );
}

export default PasswordField;