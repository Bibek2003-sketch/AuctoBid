import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

import InputField from "../../components/InputField/InputField";
import PasswordField from "../../components/PasswordField/PasswordField";
import AuthLayout from "../../components/AuthLayout/AuthLayout";

function Login() {
  // ==========================
  // States
  // ==========================

  // Show / Hide Password
  const [showPassword, setShowPassword] = useState(false);

  // Store all form values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Store validation errors
  const [errors, setErrors] = useState({});

  // ==========================
  // Handle Input Change
  // ==========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ==========================
  // Validation
  // ==========================

  const validateForm = () => {
    let newErrors = {};

    // Email
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    // Password
    if (formData.password === "") {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================
  // Submit
  // ==========================

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    console.log("Validation:", isValid);
    console.log("Errors:", errors);
    console.table(formData);

    if (!isValid) {
      console.log("Validation Failed");
      return;
    }
  };

  // UI

  return (
    <AuthLayout>
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">
        <div className="px-1">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-slate-600 transition hover:text-blue-600"
          >
            <FaArrowLeft className="text-sm" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900">Sign-In</h1>

          <p className="mt-3 text-slate-500">
            Sign in to continue bidding on your favorite auctions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Email */}

          <InputField
            icon={FaEnvelope}
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          {/* Password */}

          <PasswordField
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
          />

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            Sign-In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500">
            Don't have an account?
            <Link
              to="/register"
              className="ml-2 font-semibold text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;
