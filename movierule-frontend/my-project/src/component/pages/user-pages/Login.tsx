
import React, { useEffect } from "react";
import { useFormik } from "formik";
import "tailwindcss/tailwind.css";
import backgroundImg from "../../../assets/login-side.jpg";
import { UserLogin } from "../../../interfaces/user/UserLogin";
import { ValidationLogin } from "../../../schemas/ValidationLogin";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  googleLoginOrSignUp,
} from "../../../redux/actions/user/userActions";
import { AppDispatch, RootState } from "../../../redux/store";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, user } = useSelector((state: RootState) => state.user);

  const colors = {
    purple: "#8C65F7",
    gray: "#4A4A4A",
    blue: "#3182CE",
    red: "#E53E3E",
    white: "#FFFFFF",
    lightGray: "#F7FAFC",
    borderGray: "#E2E8F0",
  };

  const initialValues: UserLogin = {
    email: "",
    password: "",
  };

  const formik = useFormik<UserLogin>({
    initialValues,
    validationSchema: ValidationLogin,
    onSubmit: (values) => {
      dispatch(loginUser(values))
        .unwrap()
        .then(() => navigate("/homepage"))
        .catch((err: any) => {
          const errorMessage = err.message || "An unexpected error occurred";
          Swal.fire({
            icon: "error",
            title: "Login failed",
            text: errorMessage,
          });
        });
    },
  });

  const loginWithGoogle = async (data: any) => {
    try {
      await dispatch(googleLoginOrSignUp(data)).unwrap();
      navigate("/homepage", {
        state: {
          email: data.email,
          role: "user",
        },
      });
    } catch (err: any) {
      console.error("Google Login failed:", err);
      Swal.fire({
        icon: "error",
        title: "Google Login failed",
        text: err.response?.data?.message || "An unexpected error occurred",
      });
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/homepage");
    }
  }, [user, navigate]);

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: colors.purple }}
    >
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        <div className="flex justify-start p-4">
          <img src="/src/assets/logo-new.png" alt="Logo" className="h-12" />
        </div>
        <div className="flex items-center justify-center h-full">
          <div className="text-white text-center p-8">
            <h1 className="text-4xl font-bold">Welcome.</h1>
            <p className="mt-4 text-2xl">
              Begin your cinematic adventure now with our ticketing platform!
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center p-8">
        <div
          className="bg-white p-6 rounded-lg shadow-md"
          style={{ backgroundColor: colors.white }}
        >
          <h2
            className="text-2xl font-bold mb-4 text-center"
            style={{ color: colors.gray }}
          >
            Login to your account
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                style={{
                  borderColor: colors.borderGray,
                  backgroundColor: colors.lightGray,
                }}
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
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...formik.getFieldProps("password")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                style={{
                  borderColor: colors.borderGray,
                  backgroundColor: colors.lightGray,
                }}
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
                to="/forgetpassword"
                style={{ color: colors.blue }}
              >
                Forgot Your Password? Click Here
              </NavLink>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                style={{ backgroundColor: colors.red, color: colors.white }}
                disabled={loading}
              >
                {loading ? "Logging In..." : "Login now"}
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
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
          </div>

          <div className="mt-4 text-center">
            <span className="text-gray-950">
              Don't have an account?{" "}
              <NavLink to="/signup" style={{ color: colors.blue }}>
                Sign Up
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
