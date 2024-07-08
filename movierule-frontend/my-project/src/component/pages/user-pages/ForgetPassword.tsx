import { FC, useState } from "react";
import ForgotBG from "../../../assets/sample pic.jpg";
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
    setLoading(true);
    if (email.trim() === "") {
      setError("Enter an email to continue");
      return;
    }
    console.log(
      "🚀  ForgetPassword email:",
      email
    );
  dispatch(forgetPassword(email)).then((res) => {
    if (res.type && res.type.endsWith("fulfilled")) {
      toast.success("Password reset email sent");
      setLoading(false);
    } else {
      toast.error("Failed to send password reset email");
    }
  });

  };

  return (
    <div className="py-20 lg:flex lg:items-center">
      <div className="lg:w-1/2">
        <img src={ForgotBG} alt="ForgotBG" />
      </div>
      <div className="lg:w-1/2 p-5 mx-10 lg:mx-20 lg:p-10 border border-gray-300 rounded-3xl">
        <div className="flex items-center justify-center">
          <p className="text-3xl font-bold">
            Movie<span className="text-green-500">R</span>ule
          </p>
        </div>
        <h1 className="text-2xl my-5 font-bold">Reset your Password</h1>
        <p>
          <label htmlFor="username">Email Address</label>
        </p>
        <div className="flex items-center gap-3 border shadow-sm p-2 rounded-lg my-2">
          <AiOutlineMail className="text-xl" />
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            className="bg-transparent outline-none w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {errors && <p className="my-2 text-red-400">{errors}</p>}

        <div className="text-center">
          <button
            className="bg-blue-700 hover:bg-blue-900 p-2 w-full rounded-lg"
            onClick={handleEmailSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Reset"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
