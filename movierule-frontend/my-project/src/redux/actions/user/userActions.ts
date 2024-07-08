import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { URL, config } from "../../../config/constants";
import { FormValuesOTP } from "../../../interfaces/user/FormValuesOTP";
import { UserLogin } from "../../../interfaces/user/UserLogin";
import { UserSignupdata } from "../../../interfaces/user/UserSignupdata";
import { UpdateUserDetailsPayload } from "../../../interfaces/user/UpdateUserDetailsPayload";
import ImageUpload from "../../../component/imageUpoad/ImageUpload";
import { IUserResendOTP } from "../../../interfaces/user/IUserResendOTP";

export const signUpUser = createAsyncThunk(
  "user/signupUser",
  async (userCredentials: UserSignupdata, { rejectWithValue }) => {
    try {
      console.log("inside signup action");

      console.log(userCredentials, "dat before theater signup");

      const response = await axios.post(
        `${URL}/signup`,
        userCredentials,
        config
      );

      console.log(response.data, "here data inside after signup the result ");

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);

//Verify otp

export const verifyOTP = createAsyncThunk(
  "user/verifyOTP",
  async (
    { otp, email, username, password, role }: UserSignupdata & FormValuesOTP,
    { rejectWithValue }
  ) => {
    try {
      console.log(
        otp,
        email,
        username,
        password,
        role,
        "here data inside verify otp sendig to backend"
      );
      const { data } = await axios.post(
        `${URL}/verify-otp`,
        {
          otp,
          email,
          username,
          password,
          role,
        },
        config
      );

      console.log(
        data.data,
        "here data inside after verify-otp asyn thunk the result "
      );

      return data.data;
    } catch (error: any) {
      console.error("ERROR WHIL VERIFYING OTP : ", error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);

//Resend OTP

export const resendOTP = createAsyncThunk(
  "user/resendOTP",
  async (userResendDetails: IUserResendOTP, { rejectWithValue }) => {
    try {
      console.log("inside resendOTP action");

      const { data } = await axios.post(
        `${URL}/resend-otp`,
        userResendDetails,
        config
      );

      console.log(data, "here in data");

      return data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);

//login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials: UserLogin, { rejectWithValue }) => {
    try {
      console.log("inside login action");

      const { data } = await axios.post(
        `${URL}/login`,
        userCredentials,
        config
      );

      console.log(data.data, "here in data");

      return data.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);

//google Auth
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
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);

//UPDATE User Details

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
      };

      const { data } = await axios.put(
        `${URL}/updateUser/${userId}`,
        updatedUserData
      );
      console.log(data.user, "uderdeatils after udpadte inside actions");

      return data.user;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);

//Forget Password 

export const forgetPassword= createAsyncThunk(
  'forget/password',
  async(email:string,{rejectWithValue})=>{

    try {
      const {data}=await axios.post(`${URL}/forgetpassword`,{email},config)

      console.log("🚀 ~ inside forget password data from backend", data);
      return data;
    } catch (error:any) {
      return rejectWithValue("Failed to reset password");
    }
  }
)




//LOGOUT

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${URL}/logout`, config);

      return data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);
