import axios, { AxiosError } from "axios";


import { URL } from "./constants";
import { ApiError, handleError } from "./handleError";

const instance = axios.create({
  baseURL: URL,
  withCredentials: true,
});


export const commonRequest = async (
  method: string,
  route: any,
  config: any,
  body?: any
) => {
  const requestConfig = {
    method,
    url: route,
    headers: config,
    data: body,
  };
  try {
    const response = await instance({ ...requestConfig });
    return response;
  } catch (error: any) {
    return error;
  }
};


export const reduxRequest = async (
  method: string,
  route: string,
  config: any,
  rejectWithValue: any,
  body?: any
) => {
  const requestConfig = {
    method,
    url: route,
    data: body,
    config,
  };
  try {
    const response = await instance(requestConfig);
    console.log("🚀 ~ file: api.ts:25 ~ response:", response);
    return response.data.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<ApiError>;
    return handleError(axiosError, rejectWithValue);
  }
};