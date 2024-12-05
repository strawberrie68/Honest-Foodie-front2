import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  fullName: yup
    .string()
    .required("Full name is required")
    .test("two-words", "Full name must be at least two words", (value) => {
      return value && value.split(" ").length >= 2;
    }),
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (data) => {
    setIsSubmitting(true);

    try {
      const formattedData = {
        ...data,
        // firstName: data.fullName.split(" ")[0],
        // lastName: data.fullName.split(" ").slice(-1).join(" "),
        profilePicture:
          "https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg",
      };

      await axios.post(
        "http://localhost:3003/api/users/register",
        formattedData,
      );
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Sign up failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-white py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-4xl font-bold text-black">
          Create Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign up to get started
        </p>

        {error && (
          <div
            role="alert"
            className="mb-4 flex items-center space-x-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
          >
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
            <span>{error}</span>
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
                {errors.username && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-800"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  {...register("fullName")}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-500 focus:border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-300"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.fullName.message}
                  </p>
                )}
              </div> */}

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
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
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
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
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
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmPassword.message}
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
