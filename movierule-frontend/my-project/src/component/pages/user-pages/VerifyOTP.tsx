import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { verifyOTP, resendOTP } from "../../../redux/actions/user/userActions";
import {
  OTP_LENGTH,
  ValidationSchemaOTP,
} from "../../../schemas/ValidationSchemaOtp";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { FormValuesOTP } from "../../../interfaces/user/FormValuesOTP";
import { UserSignupdata } from "../../../interfaces/user/UserSignupdata";
import backgroundImg from "../../../assets/login-side.jpg";

function VerifyOTP() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  const formik = useFormik<FormValuesOTP>({
    initialValues: { otp: Array(OTP_LENGTH).fill("") },
    validationSchema: ValidationSchemaOTP,
    onSubmit: async (values) => {
      const { otp } = values;

      if (!user?.email || !user?.username || !user?.password) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "User details not available. Please try again.",
        });
        return;
      }

      const userDetails: UserSignupdata = {
        email: user.email,
        username: user.username,
        password: user.password,
        role: "user",
      };

      try {
        await dispatch(verifyOTP({ otp, ...userDetails })).unwrap();
        Swal.fire({
          icon: "success",
          title: "OTP Verified Successfully",
          text: "You have successfully logged in",
        }).then(() => navigate("/homepage", { replace: true }));
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "An unexpected error occurred",
        });
      }
    },
  });

  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (timer > 0) {
      countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setResendEnabled(true);
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  const handleResendOTP = async () => {
    if (!user?.email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "User email missing. Redirecting to signup.",
      }).then(() => navigate("/signup"));
      return;
    }

    try {
      await dispatch(resendOTP({ email: user.email })).unwrap();
      setTimer(60);
      setResendEnabled(false);
      Swal.fire({
        icon: "success",
        title: "OTP Resent",
        text: "Check your email for the new OTP.",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to resend OTP",
      });
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    if (/\D/.test(value)) return; // only numbers

    const currentOTP = [...formik.values.otp];
    currentOTP[index] = value.slice(-1);
    formik.setValues({ otp: currentOTP });

    if (value && index < OTP_LENGTH - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleBackSpace = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && index > 0 && !formik.values.otp[index]) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const renderInput = () => {
    return formik.values.otp.map((value, index) => (
      <input
        key={index}
        ref={(el) => (inputRef.current[index] = el)}
        type="text"
        value={value}
        name={`otp[${index}]`}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded bg-gray-800 text-white text-center text-xl focus:outline-none focus:ring-2 focus:ring-red-600"
        onChange={(event) => handleChange(event, index)}
        onKeyUp={(event) => handleBackSpace(event, index)}
        maxLength={1}
      />
    ));
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
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          Enter OTP
        </h3>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-center gap-2 mb-4">{renderInput()}</div>
          {formik.errors.otp && (
            <p className="text-red-500 text-sm mb-2">{formik.errors.otp}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

          {resendEnabled ? (
            <button
              type="button"
              onClick={handleResendOTP}
              className="mt-4 text-red-500 hover:underline"
            >
              Resend OTP
            </button>
          ) : (
            <p className="mt-4 text-gray-400">Resend OTP in {timer} seconds</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default VerifyOTP;
