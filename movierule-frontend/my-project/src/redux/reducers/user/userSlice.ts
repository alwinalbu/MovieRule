import { createSlice } from "@reduxjs/toolkit";
import {
  signUpUser,
  loginUser,
  logout,
  googleLoginOrSignUp,
  verifyOTP,
  updateUserDetails,
  
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
    loginSuccessUser:(state,{payload})=>{
      state.user=payload
    }
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
        state.error = null; 
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
        console.log(payload, "login state inside slice");
        localStorage.setItem("user", JSON.stringify(payload));
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload as string; 
      })


       //Get User
      // .addCase(getUser.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(getUser.fulfilled, (state, { payload }) => {
      //   state.loading = false;
      //   state.error = null;
      //   state.user = payload as UserSignupdata;
      //   console.log(payload, "getUser state inside slice");
      // })
      // .addCase(getUser.rejected, (state, { payload }) => {
      //   state.loading = false;
      //   state.error = payload as string; 
      // })



      // Logout Cases
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null; 
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string; 
      })



      // Google Login/Sign Up Cases
      .addCase(googleLoginOrSignUp.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(googleLoginOrSignUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(googleLoginOrSignUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload as string; 
      })



      // Verify OTP Cases
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null; 
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
        state.error = payload as string; 
      })



      //update user profile
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null; 
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
        state.error = payload as string; 
      });
  },
});

export const { updateError,loginSuccessUser} = userSlice.actions;

export default userSlice.reducer;
