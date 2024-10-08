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
    console.log(user, "user info inside verify-otp");
  }, [user]);

  const formik = useFormik<FormValuesOTP>({
    initialValues: {
      otp: Array(OTP_LENGTH).fill(""),
    },
    validationSchema: ValidationSchemaOTP,
    onSubmit: async (values) => {
      const { otp } = values;

      if (!user?.email || !user?.username || !user?.password) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "User details are not available. Please try again.",
        });
        return;
      }

      const userDetails: UserSignupdata = {
        email: user.email,
        username: user.username,
        password: user.password,
        role: "user",
      };

      console.log(
        userDetails,
        "userDetails before passing to dispatch verify-otp"
      );

      try {
        await dispatch(verifyOTP({ otp, ...userDetails })).unwrap();
        Swal.fire({
          icon: "success",
          title: "OTP Verified Successfully",
          text: "You can now login.",
        }).then(() => {
          navigate("/login");
        });
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
    inputRef.current[0]?.focus();

    const handlePaste = (event: ClipboardEvent) => {
      const pastedText = event.clipboardData?.getData("text") || "";
      if (pastedText.length === OTP_LENGTH && /^\d+$/.test(pastedText)) {
        const fieldValues = pastedText.split("");
        formik.setValues((prev) => ({
          ...prev,
          otp: fieldValues,
        }));
        inputRef.current[OTP_LENGTH - 1]?.focus();
      }
    };

    const firstInput = inputRef.current[0];
    firstInput?.addEventListener("paste", handlePaste as EventListener);

    return () => {
      firstInput?.removeEventListener("paste", handlePaste as EventListener);
    };
  }, []);

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
        text: "User email is not available. Redirecting to the signup page.",
      }).then(() => {
        navigate("/theater/signup");
      });
      return;
    }

    try {
      await dispatch(resendOTP({ email: user.email })).unwrap();
      setTimer(60);
      setResendEnabled(false);
      Swal.fire({
        icon: "success",
        title: "OTP Resent Successfully",
        text: "Please check your email for the new OTP.",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "An unexpected error occurred",
      });
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    if (/\D/.test(value)) return; // Ignore non-digit input

    const currentOTP = [...formik.values.otp];
    currentOTP[index] = value.slice(-1);
    formik.setValues((prev) => ({
      ...prev,
      otp: currentOTP,
    }));

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
        ref={(element) => (inputRef.current[index] = element)}
        type="text"
        value={value}
        name={`otp[${index}]`}
        className="w-16 h-12 rounded-md mr-3 text-center text-xl text-black"
        onChange={(event) => handleChange(event, index)}
        onKeyUp={(event) => handleBackSpace(event, index)}
      />
    ));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#a196ef]">
      <form onSubmit={formik.handleSubmit}>
        <h3 className="text-3xl mb-8">Please Fill In The OTP</h3>
        <div>{renderInput()}</div>
        {formik.errors.otp && (
          <p className="mt-3 text-sm text-red-400">{formik.errors.otp}</p>
        )}
        <button
          type="submit"
          className="mt-4 w-32 border border-solid rounded hover:bg-[#252525] hover:border-[#3b3b3b]"
          style={{
            backgroundColor: "#f57792",
            borderColor: "#f57792",
            color: "#fff",
          }}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        {resendEnabled ? (
          <button
            type="button"
            onClick={handleResendOTP}
            className="mt-4 w-32 border border-solid rounded hover:bg-[#252525] hover:border-[#3b3b3b]"
            style={{
              backgroundColor: "#f57792",
              borderColor: "#f57792",
              color: "#fff",
            }}
          >
            Resend OTP
          </button>
        ) : (
          <p className="mt-3 text-sm text-red-600">
            Resend OTP in {timer} seconds
          </p>
        )}
      </form>
    </div>
  );
}

export default VerifyOTP;
