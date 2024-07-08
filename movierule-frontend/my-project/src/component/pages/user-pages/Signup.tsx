import React from "react";
import { useFormik } from "formik";
import "tailwindcss/tailwind.css";
import { ValidationSchema } from "../../../schemas/ValidationSchema";

import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  signUpUser,
  googleLoginOrSignUp,
} from "../../../redux/actions/user/userActions";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { UserSignupdata } from "../../../interfaces/user/UserSignupdata";


const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const initialValues: UserSignupdata = {
    username: "User",
    email: "",
    password: "Alwin@123",
    confirmPassword: "Alwin@123",
    role: "user",
  };

  const formik = useFormik<UserSignupdata>({
    initialValues: initialValues,
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      dispatch(signUpUser(values))
        .unwrap()
        .then(() => {
          navigate("/verify-otp", {
         
          });
        })
        .catch((err: any) => {
          console.error("Signup failed:", err);
          Swal.fire({
            icon: "error",
            title: "Signup failed",
            text: err.response?.data?.message || "An unexpected error occurred",
          });
        });
    },
  });

  const loginWithGoogle = (data: any) => {
   
    dispatch(googleLoginOrSignUp(data))
      .unwrap()
      .then(() => {
        navigate("/homepage", {
          state: {
            email: data.email,
            role: "user",
          },
        });
      })
      .catch((err: any) => {
        console.error("Google Signup failed:", err);
        Swal.fire({
          icon: "error",
          title: "Google Signup failed",
          text: err.response?.data?.message || "An unexpected error occurred",
        });
      });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#a196ef" }}
    >
      <div className="flex flex-col md:flex-row items-center justify-end w-full max-w-4xl p-6">
        <div className="p-6 rounded shadow-md w-full max-w-md bg-white">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-950">
            Create An Account
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-950 text-start"
              >
                UserName
              </label>
              <input
                id="username"
                type="text"
                {...formik.getFieldProps("username")}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-950"
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>

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

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-950 text-start"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...formik.getFieldProps("confirmPassword")}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-950"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                style={{ backgroundColor: "#f57792" }}
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
            </div>
          </form>
          <div className="text-center">
            <p className="my-4">OR</p>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  loginWithGoogle(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                  toast.error("Something is wrong! Please try later");
                }}
              />
            </div>
            <p className="my-5">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold cursor-pointer hover:text-blue-500"
              >
                Login now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

