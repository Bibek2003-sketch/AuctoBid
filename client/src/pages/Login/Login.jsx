import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";

import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

import InputField from "../../components/InputField/InputField";
import PasswordField from "../../components/PasswordField/PasswordField";
import AuthLayout from "../../components/AuthLayout/AuthLayout";

import { toast } from "react-toastify";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (formData.password === "") {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await API.post("/users/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Login Successful");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
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
          Sign In
        </h1>

        <p className="mt-3 text-sm text-slate-500 sm:text-base">
          Sign in to continue bidding on your favorite auctions.
        </p>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <InputField
            icon={FaEnvelope}
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <PasswordField
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            showPassword={showPassword}
            togglePassword={() =>
              setShowPassword(!showPassword)
            }
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
            className="w-full rounded-xl bg-blue-600 py-3 text-base font-semibold text-white transition hover:bg-blue-700 sm:text-lg"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Register */}

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 sm:text-base">
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