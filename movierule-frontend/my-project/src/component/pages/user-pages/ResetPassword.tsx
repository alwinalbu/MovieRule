import { FC, useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { URL, config } from "../../../config/constants";
import backgroundImg from "../../../assets/forgetpasswordpic.jpg";

const ResetPassword: FC = () => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const param = params.get("token");

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must contain 8 characters, one uppercase, one lowercase, one number and one special character"
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

      const response = await axios.post(
        `${URL}/reset-password`,
        { data },
        config
      );

      if (response.data.success) {
        toast.success("Password updated successfully. Please login.");
        setSuccess(true);
      } else {
        toast.error("Error updating password");
      }
    } catch (err: any) {
      setError(
        err.errors?.[0] ||
          "Must contain 8 characters, one uppercase, one lowercase, one number and one special character"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-black bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-black/80 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          Reset Your Password
        </h1>

        {!success ? (
          <>
            {/* Password */}
            <div className="flex items-center gap-3 bg-gray-800 rounded px-3 py-2 mb-4 focus-within:ring-2 focus-within:ring-red-600">
              <AiOutlineLock className="text-gray-400 text-xl" />
              <input
                type="password"
                placeholder="Enter new password"
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirm Password */}
            <div className="flex items-center gap-3 bg-gray-800 rounded px-3 py-2 mb-4 focus-within:ring-2 focus-within:ring-red-600">
              <AiOutlineLock className="text-gray-400 text-xl" />
              <input
                type="password"
                placeholder="Confirm new password"
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                value={passwordAgain}
                onChange={(e) => setPasswordAgain(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Reset Button */}
            <button
              onClick={handlePasswordSubmit}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        ) : (
          <div>
            <h2 className="text-white text-lg mb-6">
              ✅ Your password has been reset successfully.
            </h2>
            <Link
              to="/login"
              className="inline-block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition"
            >
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
