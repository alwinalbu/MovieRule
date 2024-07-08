import { createSlice } from "@reduxjs/toolkit";
import { TheaterEntity } from "../../../interfaces/theater/Theaterinterface";
import {
  signUpTheater,
  loginTheater,
  logoutTheater,
  verifyTheaterOtp,
  updateTheaterDetails,
} from "../../actions/theaters/theaterActions";

interface TheaterState {
  theaterOwner: TheaterEntity | null;
  error: string | null;
  loading: boolean;
}

const initialState: TheaterState = {
  theaterOwner: null,
  error: null,
  loading: false,
};

const theaterSlice = createSlice({
  name: "theaterSlice",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // SignUp Theater
      .addCase(signUpTheater.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(signUpTheater.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.theaterOwner = payload as TheaterEntity;
        console.log(payload, "theater state inside slice");
      })
      .addCase(signUpTheater.rejected, (state, { payload }) => {
        state.loading = false;
        state.theaterOwner = null;
        state.error = payload as string; // Assuming payload is an error message
      })
      // Login Theater
      .addCase(loginTheater.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(loginTheater.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.theaterOwner = payload as TheaterEntity;
      })
      .addCase(loginTheater.rejected, (state, { payload }) => {
        state.loading = false;
        state.theaterOwner = null;
        state.error = payload as string; // Assuming payload is an error message
      })
      //Logout Theater

      .addCase(logoutTheater.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(logoutTheater.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.theaterOwner = null;
      })
      .addCase(logoutTheater.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string; // Assuming payload is an error message
      })

      // Verify OTP Cases

      .addCase(verifyTheaterOtp.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(verifyTheaterOtp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.theaterOwner = payload as TheaterEntity; // Update user state as needed
        console.log(payload, "verifyotp state inside  theater slice");
      })
      .addCase(verifyTheaterOtp.rejected, (state, { payload }) => {
        state.loading = false;
        // state.theaterOwner = null;
        state.error = payload as string; // Assuming payload is an error message
      })
      //update user profile 
      .addCase(updateTheaterDetails.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(updateTheaterDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.theaterOwner = payload as TheaterEntity;
        console.log(payload, "updateTheaterDetails state inside slice");
      })
      .addCase(updateTheaterDetails.rejected, (state, { payload }) => {
        state.loading = false;
        // state.theaterOwner = null;
        state.error = payload as string; // Assuming payload is an error message
      });
  },
});

export const { updateError } = theaterSlice.actions;

export default theaterSlice.reducer;
