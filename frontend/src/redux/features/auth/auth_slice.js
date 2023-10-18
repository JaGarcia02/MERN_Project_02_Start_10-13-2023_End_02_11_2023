import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import authService from "./auth_service";

const initialState = {
  response: "",
  isLoadingAuth: false,
  isSuccessAuth: false,
  isErrorAuth: false,
  responseMessage: "",
};

export const login_user = createAsyncThunk(
  "auth/login",
  async (input_data_login, thunkAPI) => {
    try {
      return await authService.Login(input_data_login);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.system_message) ||
        error.response.status ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login_user_google = createAsyncThunk(
  "auth/login-google",
  async (googleUserData, thunkAPI) => {
    try {
      return await authService.Login_Google(googleUserData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.system_message) ||
        error.response.status ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signup_user = createAsyncThunk(
  "auth/signup",
  async (input_data_signup, thunkAPI) => {
    try {
      return await authService.SignUp(input_data_signup);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.system_message) ||
        error.response.status ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const check_token = createAsyncThunk(
  "auth/check_token",
  async (token, thunkAPI) => {
    try {
      return await authService.CheckToken(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.system_message) ||
        error.response.status ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "user_credentials",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoadingAuth = false;
      state.isSuccessAuth = false;
      state.isErrorAuth = false;
      state.responseMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      // Login -states-
      .addCase(login_user.pending, (state, action) => {
        state.isLoadingAuth = true;
      })
      .addCase(login_user.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.isSuccessAuth = true;
        state.response = action.payload;
      })
      .addCase(login_user.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.isErrorAuth = true;
        state.responseMessage = action.payload;
        state.response = null;
      })

      // Login Google -states-
      .addCase(login_user_google.pending, (state, action) => {
        state.isLoadingAuth = true;
      })
      .addCase(login_user_google.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.isSuccessAuth = true;
        state.response = action.payload;
      })
      .addCase(login_user_google.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.isErrorAuth = true;
        state.responseMessage = action.payload;
        state.response = null;
      })

      // Signup -states-
      .addCase(signup_user.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.isSuccessAuth = true;
        state.response = action.payload;
      })
      .addCase(signup_user.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.isErrorAuth = true;
        state.responseMessage = action.payload;
        state.response = null;
      })
      .addCase(signup_user.pending, (state, action) => {
        state.isLoadingAuth = true;
      })

      //   // Logout -states-
      //   .addCase(logout_user.fulfilled, (state, action) => {
      //     state.user = null;
      //     state.isSuccessUser = true;
      //   })
      //   .addCase(logout_user.pending, (state, action) => {
      //     state.isLoadingUser = true;
      //   })
      //   // Register -states-

      //   .addCase(register_user.fulfilled, (state, action) => {
      //     state.isLoadingUser = false;
      //     state.isSuccessUser = true;
      //     state.user = action.payload;
      //   })

      // Check Token -state-
      .addCase(check_token.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.isErrorAuth = true;
        state.responseMessage = action.payload;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
