import { FC, useState } from "react";
import backgroundImg from "../../../assets/sample pic.jpg";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { AppDispatch } from "../../../redux/store";
import { forgetPassword } from "../../../redux/actions/user/userActions";

const ForgetPassword: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [errors, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (email.trim() === "") {
      setError("Enter an email to continue");
      setLoading(false);
      return;
    }

    try {
      const res = await dispatch(forgetPassword(email));
      if (res.type && res.type.endsWith("fulfilled")) {
        toast.success("Password reset email sent");
      } else {
        toast.error("Failed to send password reset email");
      }
    } catch {
      toast.error("Something went wrong!");
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
      <div className="relative z-10 w-full max-w-md bg-black/80 p-8 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo-new.png" alt="Logo" className="h-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">
          Reset Your Password
        </h1>

        {/* Email Input */}
        <form onSubmit={handleEmailSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-300 text-sm mb-2 block">
              Email Address
            </label>
            <div className="flex items-center gap-3 bg-gray-800 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-red-600">
              <AiOutlineMail className="text-gray-400 text-xl" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors && <p className="text-red-500 text-sm mt-2">{errors}</p>}
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition"
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
