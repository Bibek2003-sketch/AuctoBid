import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import InputField from "../../components/InputField/InputField";
import { forgotPassword } from "../../api/authApi";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
  try {
    e.preventDefault();
    

    // Email validation
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    
      // We'll connect the backend here next
      // console.log(email);

      const response = await forgotPassword(email)
      toast.success(response.message)
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl dark:bg-slate-800">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-slate-600 transition hover:text-blue-600 dark:text-white"
        >
          <FaArrowLeft className="text-sm dark:text-white" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Forgot Password
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-300">
          Enter your registered email address and we'll send you a password
          reset link.
        </p>

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
            className="w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-6 text-center text-slate-500 dark:text-slate-300">
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
