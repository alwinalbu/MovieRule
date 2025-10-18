import React from "react";
import { useFormik } from "formik";
import { ValidationSchema } from "../../../schemas/ValidationSchemaUserSignup";
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
import backgroundImg from "../../../assets/login-side.jpg";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const initialValues: UserSignupdata = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  };

  const formik = useFormik<UserSignupdata>({
    initialValues,
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      dispatch(signUpUser(values))
        .unwrap()
        .then(() => navigate("/verify-otp"))
        .catch((err: any) => {
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
          state: { email: data.email, role: "user" },
        });
      })
      .catch((err: any) => {
        Swal.fire({
          icon: "error",
          title: "Google Signup failed",
          text: err.response?.data?.message || "An unexpected error occurred",
        });
      });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-black bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md bg-black/80 p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src="/logo-new.png" alt="Logo" className="h-10" />
        </div>

        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create an Account
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <input
              id="username"
              type="text"
              placeholder="Username"
              {...formik.getFieldProps("username")}
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              id="email"
              type="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              {...formik.getFieldProps("confirmPassword")}
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </form>

        {/* OR Divider */}
        <div className="my-6 text-gray-400 text-center">OR</div>

        {/* Google Signup */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) =>
              loginWithGoogle(credentialResponse)
            }
            onError={() => toast.error("Google signup failed")}
          />
        </div>

        {/* Already have an account */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;


