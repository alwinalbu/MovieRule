import { createSlice } from "@reduxjs/toolkit";
import { loginAdmin, logoutAdmin } from "../../actions/admin/adminActions";
import { AdminInterface } from "../../../interfaces/admin/AdminInterface";


interface AdminState {
    
  admin:AdminInterface|null;
  error: string | null;
  loading: boolean;
}

const initialState: AdminState = {
  admin: null,
  error: null,
  loading: false,
};


const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(loginAdmin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.admin = payload;
      })
      .addCase(loginAdmin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string; // Assuming payload is an error message
      })

      // Logout Cases
      .addCase(logoutAdmin.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.admin = null; // Clear ADMIN data on logout
      })
      .addCase(logoutAdmin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string; // Assuming payload is an error message
      });
  },
});

export const { updateError } = adminSlice.actions;

export default adminSlice.reducer;
