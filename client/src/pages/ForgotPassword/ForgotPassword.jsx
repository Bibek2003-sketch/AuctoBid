import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

import AuthLayout from "../../components/AuthLayout/AuthLayout";
import InputField from "../../components/InputField/InputField";
import { forgotPassword } from "../../api/authApi";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!email.trim()) {
        toast.error("Email is required");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      const response = await forgotPassword(email);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8 lg:p-10 dark:bg-slate-800">
        {/* Back */}

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-blue-600 sm:text-base dark:text-white"
        >
          <FaArrowLeft />
          Back to Home
        </Link>

        {/* Heading */}

        <h1 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
          Forgot Password
        </h1>

        <p className="mt-3 text-sm text-slate-500 sm:text-base dark:text-slate-300">
          Enter your registered email address and we'll send you a password
          reset link.
        </p>

        {/* Form */}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <InputField
            icon={FaEnvelope}
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 text-base font-semibold text-white transition hover:bg-blue-700 sm:text-lg"
          >
            Send Reset Link
          </button>
        </form>

        {/* Login */}

        <p className="mt-6 text-center text-sm text-slate-500 sm:text-base dark:text-slate-300">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;