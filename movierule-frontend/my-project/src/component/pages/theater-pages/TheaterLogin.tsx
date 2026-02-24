import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { AppDispatch, RootState } from "../../../redux/store";
import { loginTheater } from "../../../redux/actions/theaters/theaterActions";
import { ValidationLogin } from "../../../schemas/ValidationLogin";
import { TheaterLoginInterface } from "../../../interfaces/theater/TheaterLoginInterface";
import backgroundImg from "../../../assets/loginbackground.jpg";
import logo from "../../../assets/logo-new.png"; // replace with your logo

const TheaterLogin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, theaterOwner } = useSelector(
    (state: RootState) => state.theater
  );

  const initialValues: TheaterLoginInterface = {
    email: "",
    password: "",
  };

  const formik = useFormik<TheaterLoginInterface>({
    initialValues,
    validationSchema: ValidationLogin,
    onSubmit: async (values) => {
      try {
        const theaterData = await dispatch(loginTheater(values)).unwrap();
        navigate("/theater/dashboard");
        console.log(theaterData, "before going to dashboard");
      } catch (err: any) {
        console.error("Login failed:", err);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message || "An unexpected error occurred",
        });
      }
    },
  });

  useEffect(() => {
    if (theaterOwner) {
      navigate("/theater/dashboard");
    }
  }, [theaterOwner, navigate]);

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Login Box */}
      <div className="relative z-10 w-full max-w-md px-6 py-8 bg-black/80 rounded-lg shadow-lg backdrop-blur-sm">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Theater Logo" className="h-12" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Sign in to Theater
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-300 text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
              className="w-full p-3 mt-1 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-500"
              placeholder="you@example.com"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-300 text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
              className="w-full p-3 mt-1 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-500"
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <NavLink
              to="/theater/forgetpassword"
              className="text-sm text-red-500 hover:underline"
            >
              Forgot your password?
            </NavLink>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-lg bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold hover:from-red-700 hover:to-red-900 transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/theater/signup" className="text-red-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default TheaterLogin;

