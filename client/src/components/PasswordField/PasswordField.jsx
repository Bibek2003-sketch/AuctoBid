import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

// Reusable Password Field Component
function PasswordField({

  // Name of input
  name,

  // Placeholder
  placeholder,

  // Current value
  value,

  // Function called while typing
  onChange,

  // Error message
  error,

  // Boolean value
  showPassword,

  // Function to show/hide password
  togglePassword,

}) {

  return (

    <div>

      <div className="relative">

        {/* Lock Icon */}

        <RiLockPasswordFill
          className="absolute left-4 top-4 text-slate-400"
        />

        {/* Password Input */}

        <input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}

          className={`w-full rounded-xl border py-3 pl-12 pr-12 outline-none transition
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
          className="absolute right-4 top-4 text-slate-500"
        >

          {showPassword ? <FaEyeSlash /> : <FaEye />}

        </button>

      </div>

      {/* Error */}

      {error && (

        <p className="mt-2 text-sm text-red-500">

          {error}

        </p>

      )}

    </div>

  );

}

export default PasswordField;