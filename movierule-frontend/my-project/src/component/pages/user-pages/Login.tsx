import React, { useEffect } from "react";
import { useFormik } from "formik";
import backgroundImg from "../../../assets/login-side.jpg";
import { UserLogin } from "../../../interfaces/user/UserLogin";
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
import { ValidationLogin } from "../../../schemas/ValidationLogin";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, user } = useSelector((state: RootState) => state.user);

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
        .then(() => navigate("/homepage", { replace: true }))
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
        state: { email: data.email, role: "user" },
      });
    } catch (err: any) {
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
      className="flex items-center justify-center min-h-screen bg-black bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-black/80 p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src="/logo-new.png" alt="Logo" className="h-10" />
        </div>

        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Sign In
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
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

          {/* Forgot password */}
          <div className="flex justify-end">
            <NavLink
              to="/forgetpassword"
              className="text-sm text-gray-400 hover:underline"
            >
              Forgot your password?
            </NavLink>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="my-6 text-gray-400 text-center">OR</div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) =>
              loginWithGoogle(credentialResponse)
            }
            onError={() => toast.error("Google login failed")}
          />
        </div>

        {/* Signup Link */}
        <p className="text-center text-gray-400 mt-6">
          New to MovieRule?{" "}
          <NavLink to="/signup" className="text-white hover:underline">
            Sign up now
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;




