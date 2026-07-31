import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaArrowLeft } from "react-icons/fa";

import InputField from "../../components/InputField/InputField";
import PasswordField from "../../components/PasswordField/PasswordField";
import AuthLayout from "../../components/AuthLayout/AuthLayout";

import API from "../../api/axios";
import { toast } from "react-toastify";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Full Name is required.";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (formData.phone.trim() === "") {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain exactly 10 digits.";
    }

    if (formData.password === "") {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (formData.confirmPassword === "") {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await API.post("/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success(response.data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8 lg:p-10">
        {/* Back */}

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-blue-600 sm:text-base"
        >
          <FaArrowLeft />
          Back to Home
        </Link>

        {/* Heading */}

        <h1 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
          {loading ? "Creating Account..." : "Create Account"}
        </h1>

        <p className="mt-3 text-sm text-slate-500 sm:text-base">
          Join AuctoBid and start bidding today.
        </p>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <InputField
            icon={FaUser}
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          <InputField
            icon={FaEnvelope}
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <InputField
            icon={FaPhone}
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          <PasswordField
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
          />

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
            className="w-full rounded-xl bg-blue-600 py-3 text-base font-semibold text-white transition hover:bg-blue-700 sm:text-lg"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login */}

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 sm:text-base">
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