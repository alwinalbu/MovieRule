
import React, { useEffect } from "react";
import { useFormik } from "formik";
import "tailwindcss/tailwind.css";
import backgroundImg from "../../../assets/loginbackground.jpg";
import { useDispatch, useSelector } from "react-redux";
import { loginTheater } from "../../../redux/actions/theaters/theaterActions";
import { AppDispatch, RootState } from "../../../redux/store";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { ValidationLogin } from "../../../schemas/ValidationLogin";
import { TheaterLoginInterface } from "../../../interfaces/theater/TheaterLoginInterface";

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
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="flex flex-col md:flex-row items-center md:justify-end w-full max-w-4xl p-6 ml-auto">
        <div className="p-6 rounded shadow-md w-full max-w-md bg-white">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-950">
            Log In to Your Theater Account
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-950 text-start">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-950"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-950 text-start"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...formik.getFieldProps("password")}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-950"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between mb-6">
              <NavLink
                className="inline-block align-baseline font-bold text-sm"
                to="/theater/forgetpassword"
                style={{ color: "blue" }} // Adjust the color as needed
              >
                Forgot Your Password? Click Here
              </NavLink>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full p-2 border border-gray-300 rounded-lg mt-1 bg-gray-600 text-white"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Login"}
              </button>
              {/* {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )} */}
            </div>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-950">
              Don't have an account?{" "}
              <a href="/theater/signup" className="text-gray-600">
                Sign Up
              </a>
            </span>
          </div>
        </div>
        <div
          className="hidden md:block md:w-1/2 h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImg})` }}
        />
      </div>
    </div>
  );
};

export default TheaterLogin;

