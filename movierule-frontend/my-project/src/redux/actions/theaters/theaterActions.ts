// store/actions/theaterActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL, config } from "../../../config/constants";
import { TheaterEntity } from "../../../interfaces/theater/Theaterinterface";
import { FormValuesOTP } from "../../../interfaces/user/FormValuesOTP";
import { UpdateTheaterDetailsPayload } from "../../../interfaces/theater/UpdateTheaterDetailsPayload";
import ImageUpload from "../../../component/imageUpoad/ImageUpload";


export const signUpTheater = createAsyncThunk(
  "theater/signUpTheater",
  async (formData:any, { rejectWithValue }) => {
    try {
      console.log(formData,"form data inside");
      
      const response = await axios.post(`${URL}/theater/signup`,formData,config);
      return response.data;
    } catch  (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);


export const loginTheater = createAsyncThunk(
  "theater/loginTheater",
  async (
    loginCredentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("inside theater login action");

      console.log(loginCredentials, "here in theater login data");

      const { data } = await axios.post(
        `${URL}/theater/login`,
        loginCredentials,
        config
      );

      console.log(data.data, "here in theater after login data");

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

export const getCurrentTheater = async () => {
  try {
    const { data } = await axios.get(`${URL}/theater/getTheater`, config);
    console.log(data.data,"theater data in frontend ");
    
    return data.data;
  } catch (error) {
    console.log(error);
  }
};


export const verifyTheaterOtp = createAsyncThunk(
  "theater/verifyTheaterOtp",
  async (
    {
      otp,
      email,
      username,
      password,
      role,
      status,
      OwnerName,
      address,
      city,
      state,
      zipCode,
      phone,
      profilePicture,
      aadhaarCard,
      licenseDocument,
    }: TheaterEntity & FormValuesOTP,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${URL}/theater/verify-otp`,
        {
          otp,
          email,
          username,
          password,
          role,
          status,
          OwnerName,
          address,
          city,
          state,
          zipCode,
          phone,
          profilePicture,
          aadhaarCard,
          licenseDocument,
        },
        config
      );

      console.log(
        data.data,
        "here data inside after verify-otp async thunk result"
      );

      return data.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);



export const updateTheaterDetails = createAsyncThunk(
  "theater/updateTheaterDetails",
  async (
    {
      theaterId,
      username,
      email,
      oldPassword,
      password,
      profilePic,
      city, 
    }: UpdateTheaterDetailsPayload,
    { rejectWithValue }
  ) => {
    try {
      let profilePicUrl = null;
      if (profilePic) {
        profilePicUrl = await ImageUpload(profilePic);
      }

      const updatedTheaterData: Partial<TheaterEntity> = {
        username,
        email,
        ...(oldPassword && { oldPassword }),
        ...(password && { password }),
        ...(profilePicUrl && { profilePicture: profilePicUrl }),
        ...(city && { city }),
      };

      const { data } = await axios.put(
        `${URL}/theater/updateTheater/${theaterId}`,
        updatedTheaterData,
        config
      );

      return data.theater;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);


export const theaterForgetPassword=createAsyncThunk(
  'theater/forgetpassword',
  async(email:string,{rejectWithValue})=>{

    try {
      const { data } = await axios.post(
        `${URL}/theater/forgetpassword`,
        { email },
        config
      );

      console.log("🚀 ~ inside theater forget password data from backend", data);
      return data;
    } catch (error:any) {
      return rejectWithValue("Failed to reset password");
    }
  }
)


export const logoutTheater = createAsyncThunk(
  "theater/logout",
  async (_, { rejectWithValue }) => {
    try {
     const { data } = await axios.delete(`${URL}/theater/logout`, config);
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

