import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { URL, config } from "../../../config/constants";
import { IAdminLogin } from "../../../interfaces/admin/IAdminLogin";

export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (adminCredentials:IAdminLogin, { rejectWithValue }) => {
    try {
      console.log("inside admin login action");

      const { data } = await axios.post(
        `${URL}/admin/login`,
        adminCredentials,
        config
      );

      console.log(data.data, "admin login response data");

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


export const logoutAdmin=createAsyncThunk(
  "admin/logout",
  async(_,{rejectWithValue})=>{
    try {

      const {data}=await axios.delete(`${URL}/admin/logout`,config);
      return data;
      
    } catch (error:any) {
      if(error.response && error.response.data){
        console.log(error.response.data.message,"error is");
        
        return rejectWithValue(error.response.data.message);
      }else{
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
)
