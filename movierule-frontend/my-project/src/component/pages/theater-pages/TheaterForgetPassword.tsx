import { FC, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { AppDispatch } from "../../../redux/store";
import { theaterForgetPassword } from "../../../redux/actions/theaters/theaterActions";
import { useNavigate } from "react-router-dom";

const TheaterForgetPassword: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [errors, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (email.trim() === "") {
      setError("Enter an email to continue");
      setLoading(false);
      return;
    }

    dispatch(theaterForgetPassword(email)).then((res) => {
      if (res.type && res.type.endsWith("fulfilled")) {
        setSubmitted(true);
        toast.success("Password reset email sent");
        setLoading(false);
      } else {
        toast.error("Failed to send password reset email");
        setLoading(false);
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        {!submitted ? (
          <>
            <h1 className="text-2xl font-bold mb-6">
              Theater <span className="text-red-600">Reset</span>
            </h1>
            <p className="mb-4 text-gray-300">Enter your email address</p>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="flex items-center gap-3 border border-gray-700 bg-gray-800 shadow-sm p-3 rounded-lg">
                <AiOutlineMail className="text-xl text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="bg-transparent outline-none w-full text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {errors && <p className="text-red-400 text-sm">{errors}</p>}

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 p-2 rounded-lg font-semibold"
                disabled={loading}
              >
                {loading && (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {loading ? "Sending..." : "Reset Password"}
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            {/* Animated email icon */}
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-600 animate-bounce">
              <AiOutlineMail className="text-3xl text-white" />
            </div>

            <h2 className="text-xl font-bold">Check your inbox</h2>
            <p className="text-gray-400 text-sm">
              We’ve sent you a reset link. Please check your email to continue.
            </p>

            <button
              onClick={() => navigate("/theater/login")}
              className="w-full bg-red-600 hover:bg-red-700 p-2 rounded-lg font-semibold"
            >
              Go back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TheaterForgetPassword;

