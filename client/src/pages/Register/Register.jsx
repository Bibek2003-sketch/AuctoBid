import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

import InputField from "../../components/InputField/InputField";
import PasswordField from "../../components/PasswordField/PasswordField";
import AuthLayout from "../../components/AuthLayout/AuthLayout";

function Register() {
  // ==========================
  // States
  // ==========================

  // Show / Hide Password
  const [showPassword, setShowPassword] = useState(false);

  // Show / Hide Confirm Password
  const [showConfirm, setShowConfirm] = useState(false);

  // Store all form values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

    // Name
    if (formData.name.trim() === "") {
      newErrors.name = "Full Name is required.";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    // Email
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    // Phone
    if (formData.phone.trim() === "") {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain exactly 10 digits.";
    }

    // Password
    if (formData.password === "") {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    // Confirm Password
    if (formData.confirmPassword === "") {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================
  // Submit
  // ==========================

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("===============");
    console.log("Button Clicked");

    const isValid = validateForm();

    console.log("Validation:", isValid);
    console.log("Errors:", errors);
    console.table(formData);

    if (!isValid) {
      console.log("Validation Failed");
      return;
    }

    console.log("Registration Successful");
  };
  // Helper function for border color
  const inputClass = (field) =>
    `w-full rounded-xl border py-3 pl-12 pr-12 outline-none transition ${
      errors[field]
        ? "border-red-500 focus:border-red-500"
        : "border-slate-300 focus:border-blue-600"
    }`;

  // ==========================
  // UI
  // ==========================

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
          <h1 className="text-4xl font-bold text-slate-900">Create Account</h1>

          <p className="mt-3 text-slate-500">
            Join AuctoBid and start bidding today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <InputField
            icon={FaUser}
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

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

          {/* Phone */}

          <InputField
            icon={FaPhone}
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
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

          {/* Confirm Password */}

          <PasswordField
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            showPassword={showConfirm}
            togglePassword={() => setShowConfirm(!showConfirm)}
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500">
            Already have an account?
            <Link
              to="/login"
              className="ml-2 font-semibold text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Register;
