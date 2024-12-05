import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/authRedux";
import { loginUser } from "../../services/authService";

const Login = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = async (data) => {
    setIsLoading(true);

    try {
      const loggedInResponse = await loginUser(data);

      dispatch(
        setLogin({
          user: loggedInResponse.user,
          token: loggedInResponse.token,
        }),
      );

      setError(null);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestUser = async () => {
    setIsLoading(true);

    try {
      const testUserCredentials = {
        email: "test@example.com",
        password: "test123",
      };

      const loggedInResponse = await loginUser(testUserCredentials);

      dispatch(
        setLogin({
          user: loggedInResponse.user,
          token: loggedInResponse.token,
        }),
      );

      setError(null);
      navigate("/");
    } catch (err) {
      setError(err.message || "Test user login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-white py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-4xl font-bold text-black">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to continue
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
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-800"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  autoComplete="email"
                  {...register("email", {
                    required: "email is required",
                    minLength: {
                      value: 3,
                      message: "email must be at least 3 characters",
                    },
                  })}
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
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-500 focus:border-amber-300  focus:outline-none focus:ring-1 focus:ring-amber-300"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-3 text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  {isLoading ? (
                    <svg
                      className="h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    "Sign In"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleTestUser}
                  disabled={isLoading}
                  className="w-full rounded-md border border-black px-4 py-3 text-black transition duration-300 ease-in-out hover:bg-gray-100"
                >
                  Test User Login
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-black hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
