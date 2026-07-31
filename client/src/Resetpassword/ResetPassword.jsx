import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import PasswordField from "../components/PasswordField/PasswordField";

import { FaArrowLeft } from "react-icons/fa";
import { resetPassword } from "../api/authApi";
import { toast } from "react-toastify";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const response = await resetPassword(token, formData.password);

      toast.success(response.message);

      navigate("/login");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8 lg:p-10 dark:bg-slate-900">
        {/* Back */}

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-blue-600 sm:text-base dark:text-white"
        >
          <FaArrowLeft />
          Back to Home
        </Link>

        {/* Heading */}

        <h1 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          Reset Password
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base dark:text-slate-400">
          Create a new password for your account.
        </p>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 dark:text-white"
        >
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
            showPassword={showConfirmPassword}
            togglePassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 text-base font-semibold text-white transition hover:bg-blue-700 sm:text-lg"
          >
            Reset Password
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

export default ResetPassword;