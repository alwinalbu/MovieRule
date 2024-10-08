import { FC, useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import axios from "axios";
import TheaterForgotBG from "../../../assets/forgetpasswordpic.jpg";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Link } from "react-router-dom";
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

       console.log(
         "🚀 data inside theater reset password",
         data
       );

      await axios
        .post(`${URL}/theater/theater-reset-password`, {data}, config)
        .then(({ data }) => {
          if (data.success) {
            toast.success("Password reset successfully");
            setLoading(false);
            setResetSuccess(true);
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

  return (
    <div className="py-20 lg:flex lg:items-center">
      <div className="lg:w-1/2">
        <img src={TheaterForgotBG} alt="TheaterForgotBG" />
      </div>
      <div className="lg:w-1/2 p-5 mx-10 lg:mx-20 lg:p-10 border border-gray-300 rounded-3xl">
        <div className="flex items-center justify-center">
          <p className="text-3xl font-bold">
            Theater<span className="text-red-500">Reset</span>
          </p>
        </div>
        <h1 className="text-2xl my-7 font-bold">Reset your Password</h1>

        <div className="flex items-center gap-3 border border-gray-200 shadow-sm p-2 rounded-lg my-2">
          <AiOutlineLock className="text-xl" />
          <input
            type="password"
            name="password"
            placeholder="Enter your new password"
            className="bg-transparent outline-none w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 border border-gray-200 shadow-sm p-2 rounded-lg my-5">
          <AiOutlineLock className="text-xl" />
          <input
            type="password"
            name="passwordAgain"
            placeholder="Enter your new password again"
            className="bg-transparent outline-none w-full"
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
        </div>

        {error && <p className="my-2 text-red-400">{error}</p>}

        <div className="text-center">
          <button
            className="bg-red-600 hover:bg-red-800 rounded-md p-2 w-full"
            onClick={handlePasswordSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Reset"}
          </button>
        </div>

        {resetSuccess && (
          <div className="mt-5">
            <h1 className="my-4">Your password has been reset successfully.</h1>
            <div className="flex items-center justify-center">
              <Link
                className="bg-red-600 hover:bg-red-800 rounded-md p-2"
                to="/theater/login"
              >
                Go to Theater Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TheaterResetPassword;
