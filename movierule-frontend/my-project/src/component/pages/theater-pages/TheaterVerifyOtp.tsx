import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  OTP_LENGTH,
  ValidationSchemaOTP,
} from "../../../schemas/ValidationSchemaOtp";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FormValuesOTP } from "../../../interfaces/user/FormValuesOTP";
import { TheaterEntity } from "../../../interfaces/theater/Theaterinterface";
import { verifyTheaterOtp } from "../../../redux/actions/theaters/theaterActions";

function TheatreVerifyOtp() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { theaterOwner, loading, error } = useSelector(
    (state: RootState) => state.theater
  );

  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const formik = useFormik<FormValuesOTP>({
    initialValues: { otp: Array(OTP_LENGTH).fill("") },
    validationSchema: ValidationSchemaOTP,
    onSubmit: async (values) => {
      if (!theaterOwner?.email || !theaterOwner?.username) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Theater details are missing. Please try again.",
        });
        return;
      }

      const theaterDetails: TheaterEntity = { ...theaterOwner };

      try {
        await dispatch(
          verifyTheaterOtp({ otp: values.otp, ...theaterDetails })
        ).unwrap();
        Swal.fire({
          icon: "success",
          title: "OTP Verified Successfully",
          text: "Wait For The Approval.",
        }).then(() => navigate("/theater/login"));
      } catch (err: any) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message || "An unexpected error occurred",
        });
      }
    },
  });

  useEffect(() => {
    inputRef.current[0]?.focus();

    const handlePaste = (event: ClipboardEvent) => {
      const pasted = event.clipboardData?.getData("text") || "";
      if (pasted.length === OTP_LENGTH && /^\d+$/.test(pasted)) {
        formik.setValues({ otp: pasted.split("") });
        inputRef.current[OTP_LENGTH - 1]?.focus();
      }
    };

    const firstInput = inputRef.current[0];
    firstInput?.addEventListener("paste", handlePaste as EventListener);
    return () => {
      firstInput?.removeEventListener("paste", handlePaste as EventListener);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const val = e.target.value.replace(/\D/, ""); // only numbers
    const otp = [...formik.values.otp];
    otp[i] = val.slice(-1);
    formik.setValues({ otp });
    if (val && i < OTP_LENGTH - 1) inputRef.current[i + 1]?.focus();
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    i: number
  ) => {
    if (e.key === "Backspace" && !formik.values.otp[i] && i > 0) {
      inputRef.current[i - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-red-900/80 to-black">
      <div className="bg-black/80 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">Verify Your OTP</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-center gap-3 mb-4">
            {formik.values.otp.map((val, i) => (
              <input
                key={i}
                ref={(el) => (inputRef.current[i] = el)}
                type="text"
                maxLength={1}
                value={val}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleBackspace(e, i)}
                className="w-12 h-12 text-center text-xl font-bold rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            ))}
          </div>
          {formik.errors.otp && (
            <p className="text-sm text-red-400 mb-4">{formik.errors.otp}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default TheatreVerifyOtp;

