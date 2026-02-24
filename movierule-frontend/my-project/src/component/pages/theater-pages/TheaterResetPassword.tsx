import { FC, useState, useEffect } from "react";
import { AiOutlineLock } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { URL, config } from "../../../config/constants";

const TheaterResetPassword: FC = () => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const param = params.get("token");

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const navigate = useNavigate();

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const handlePasswordSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      await passwordSchema.validate({ password });
      if (password !== passwordAgain) {
        setError("Passwords don't match");
        setLoading(false);
        return;
      }

      const data = { password, param };

      await axios
        .post(`${URL}/theater/theater-reset-password`, { data }, config)
        .then(({ data }) => {
          if (data.success) {
            toast.success("Password reset successfully");
            setLoading(false);
            setResetSuccess(true);
            setCountdown(5); // start countdown
          } else {
            toast.error("Error resetting password");
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Error resetting password:", error);
          setError("Failed to reset password");
          setLoading(false);
        });
    } catch (validationError) {
      setError(
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      );
      setLoading(false);
    }
  };

  // Auto redirect effect
  useEffect(() => {
    if (resetSuccess && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (resetSuccess && countdown === 0) {
      navigate("/theater/login");
    }
  }, [resetSuccess, countdown, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        {!resetSuccess ? (
          <>
            {/* Animated Lock Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-600 animate-pulse">
                <AiOutlineLock className="text-3xl text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-6">Reset Your Password</h1>

            {/* Password input */}
            <div className="flex items-center gap-3 border border-gray-700 bg-gray-800 p-3 rounded-lg my-3">
              <AiOutlineLock className="text-xl text-gray-400" />
              <input
                type="password"
                placeholder="Enter new password"
                className="bg-transparent outline-none w-full text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirm Password input */}
            <div className="flex items-center gap-3 border border-gray-700 bg-gray-800 p-3 rounded-lg my-3">
              <AiOutlineLock className="text-xl text-gray-400" />
              <input
                type="password"
                placeholder="Confirm new password"
                className="bg-transparent outline-none w-full text-white"
                value={passwordAgain}
                onChange={(e) => setPasswordAgain(e.target.value)}
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            {/* Submit button */}
            <button
              onClick={handlePasswordSubmit}
              className="w-full flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 p-3 rounded-lg font-semibold mt-4"
              disabled={loading}
            >
              {loading && (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-600 animate-bounce">
                <AiOutlineLock className="text-3xl text-white" />
              </div>
            </div>
            <h1 className="text-xl font-bold mb-4">
              Your password has been reset successfully 🎉
            </h1>
            <p className="text-gray-400 mb-4">
              Redirecting to login in{" "}
              <span className="font-bold">{countdown}</span> seconds...
            </p>
            <Link
              to="/theater/login"
              className="w-full block bg-red-600 hover:bg-red-700 p-3 rounded-lg font-semibold"
            >
              Go to Theater Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default TheaterResetPassword;

