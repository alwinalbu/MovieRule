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
    loginSuccessAdmin: (state, { payload }) => {
      state.admin = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(loginAdmin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.admin = payload;
      })
      .addCase(loginAdmin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string; 
      })

      // Logout Cases
      .addCase(logoutAdmin.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.admin = null; 
      })
      .addCase(logoutAdmin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string; 
      });
  },
});

export const { updateError,loginSuccessAdmin } = adminSlice.actions;

export default adminSlice.reducer;
