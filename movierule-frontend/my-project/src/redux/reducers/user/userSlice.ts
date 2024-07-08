import { createSlice } from "@reduxjs/toolkit";
import {
  signUpUser,
  loginUser,
  logout,
  googleLoginOrSignUp,
  verifyOTP,
  updateUserDetails, // Import verifyOTP action
} from "../../actions/user/userActions";
import { UserSignupdata } from "../../../interfaces/user/UserSignupdata";

interface UserState {
  user: UserSignupdata | null;
  error: string | null;
  loading: boolean;
  userDetails: UserSignupdata | null;
}

const initialState: UserState = {
  user: null,
  error: null,
  loading: false,
  userDetails: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign Up Cases
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload as UserSignupdata;
        console.log(payload, "signupuser state inside slice");
      })
      .addCase(signUpUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload as string; // Assuming payload is an error message
      })

      // Login Cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
        console.log(payload, "login state inside slice");
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload as string; // Assuming payload is an error message
      })

      // Logout Cases
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null; // Clear user data on logout
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string; // Assuming payload is an error message
      })

      // Google Login/Sign Up Cases
      .addCase(googleLoginOrSignUp.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(googleLoginOrSignUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(googleLoginOrSignUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload as string; // Assuming payload is an error message
      })

      // Verify OTP Cases
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(verifyOTP.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload as UserSignupdata;
        console.log(payload, "verifyotp state inside slice");
      })
      .addCase(verifyOTP.rejected, (state, { payload }) => {
        state.loading = false;
        // state.user = null;
        state.error = payload as string; // Assuming payload is an error message
      })
      //update user profile
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(updateUserDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload as UserSignupdata;
        console.log(payload, "updateUserDetails state inside slice");
      })
      .addCase(updateUserDetails.rejected, (state, { payload }) => {
        state.loading = false;
        // state.user = null;
        state.error = payload as string; // Assuming payload is an error message
      });
  },
});

export const { updateError} = userSlice.actions;

export default userSlice.reducer;
