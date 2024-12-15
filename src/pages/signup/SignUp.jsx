import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const SignUp = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const password = watch("password");

  const navigate = useNavigate();

  const onSubmitHandler = async (data) => {
    setIsSubmitting(true);
    setError(null);
    setMessage(null);
    const { confirmPassword, ...dataToSend } = data;

    if (confirmPassword !== password) {
      setMessage("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      const formattedData = {
        ...dataToSend,
        profilePicture:
          "https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg",
      };

      const response = await axios.post(
        `${apiUrl}/api/users/register`,
        formattedData,
      );

      setMessage(response.data.message || "Account created successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("error", err.response.data);
      setMessage("Sign up failed");
      setError(err.response.data.errors || "Sign up failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-white py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-4xl font-bold text-black">
          Create Your Account
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign up to get started
        </p>
        {message && (
          <div
            role="alert"
            className={`mb-4 flex items-center space-x-3 rounded-lg border ${
              message.includes("successfully")
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            } p-4`}
          >
            {message.includes("successfully") ? (
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <span>{message}</span>
          </div>
        )}

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-10 shadow-xl">
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-800"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-500 focus:border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-300"
                  placeholder="Enter your username"
                />
                {error && error.username && (
                  <p className="mt-2 text-sm text-red-600">{error.username}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-800"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-500 focus:border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-300"
                  placeholder="Enter your email"
                />
                {error && error.email && (
                  <p className="mt-2 text-sm text-red-600">{error.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-800"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-500 focus:border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-300"
                  placeholder="Enter your password"
                />
                {error && error.password && (
                  <p className="mt-2 text-sm text-red-600">{error.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-800"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-500 focus:border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-300"
                  placeholder="Confirm your password"
                />
                {(errors.confirmPassword ||
                  (watch("confirmPassword") &&
                    watch("confirmPassword") !== password)) && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmPassword?.message || "Passwords must match"}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-3 text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  {isSubmitting ? "Creating Account..." : "Sign Up"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-black hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
