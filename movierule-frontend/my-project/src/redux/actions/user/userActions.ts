import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL, config } from "../../../config/constants";
import { FormValuesOTP } from "../../../interfaces/user/FormValuesOTP";
import { UserLogin } from "../../../interfaces/user/UserLogin";
import { UserSignupdata } from "../../../interfaces/user/UserSignupdata";
import { UpdateUserDetailsPayload } from "../../../interfaces/user/UpdateUserDetailsPayload";
import ImageUpload from "../../../component/imageUpoad/ImageUpload";
import { IUserResendOTP } from "../../../interfaces/user/IUserResendOTP";

// Helper function for error handling
const handleError = (error: any, rejectWithValue: any) => {
  if (error.response && error.response.data) {
    return rejectWithValue(error.response.data.message || error.response.data);
  } else {
    return rejectWithValue({ message: "Something went wrong!" });
  }
};

// export const getUser = createAsyncThunk(
//   "user/getUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(`${URL}/getUser`, config);

//       console.log("User details fetched:", data.user);

//       return data.user as UserSignupdata;
//     } catch (error: any) {
//       return handleError(error, rejectWithValue);
//     }
//   }
// );

export const getCurrntUser = async () => {
  try {
    const { data } = await axios.get(`${URL}/getUser`, config);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Sign Up User
export const signUpUser = createAsyncThunk(
  "user/signupUser",
  async (userCredentials: UserSignupdata, { rejectWithValue }) => {
    try {
      console.log("Inside signup action");
      const response = await axios.post(
        `${URL}/signup`,
        userCredentials,
        config
      );
      console.log("Signup result:", response.data);
      return response.data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Verify OTP
export const verifyOTP = createAsyncThunk(
  "user/verifyOTP",
  async (
    { otp, email, username, password, role }: UserSignupdata & FormValuesOTP,
    { rejectWithValue }
  ) => {
    try {
      console.log("Sending OTP data to backend:", {
        otp,
        email,
        username,
        password,
        role,
      });
      const { data } = await axios.post(
        `${URL}/verify-otp`,
        { otp, email, username, password, role },
        config
      );
      console.log("OTP verification result:", data.data);
      return data.data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Resend OTP
export const resendOTP = createAsyncThunk(
  "user/resendOTP",
  async (userResendDetails: IUserResendOTP, { rejectWithValue }) => {
    try {
      console.log("Inside resendOTP action");
      const { data } = await axios.post(
        `${URL}/resend-otp`,
        userResendDetails,
        config
      );
      console.log("Resend OTP result:", data);
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials: UserLogin, { rejectWithValue }) => {
    try {
      console.log("Inside login action");
      const { data } = await axios.post(
        `${URL}/login`,
        userCredentials,
        config
      );
      console.log("Login result:", data.data);
      return data.data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Google Auth
export const googleLoginOrSignUp = createAsyncThunk(
  "user/googleLoginOrSignUp",
  async (userCredentials: UserLogin, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/google`,
        userCredentials,
        config
      );
      return data.data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Update User Details
export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetails",
  async (
    {
      userId,
      username,
      email,
      oldPassword,
      password,
      profilePic,
      city,
    }: UpdateUserDetailsPayload,
    { rejectWithValue }
  ) => {
    try {
      let profilePicUrl = null;
      if (profilePic) {
        profilePicUrl = await ImageUpload(profilePic);
      }

      const updatedUserData = {
        username,
        email,
        ...(oldPassword && { oldPassword }),
        ...(password && { password }),
        ...(profilePicUrl && { profilePic: profilePicUrl }),
        ...(city && { city }),
      };

      const { data } = await axios.put(
        `${URL}/updateUser/${userId}`,
        updatedUserData,
        config
      );
      console.log("User details after update:", data.user);
      return data.user;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Forget Password
export const forgetPassword = createAsyncThunk(
  "forget/password",
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/forgetpassword`,
        { email },
        config
      );
      console.log("Forget password result:", data);
      return data;
    } catch (error: any) {
      return rejectWithValue("Failed to reset password");
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${URL}/logout`, config);
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
