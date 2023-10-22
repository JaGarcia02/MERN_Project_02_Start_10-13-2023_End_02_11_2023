import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./user_service";

const initialState = {
  // Delete Account
  response_Delete: "",
  isLoadingUser_Delete: false,
  isSuccessUser_Delete: false,
  isErrorUser_Delete: false,
  responseMessage_Delete: "",

  // Update Profile Picture
  response_UpdateProfilePicture: "",
  isLoadingUser_UpdateProfilePicture: false,
  isSuccessUser_UpdateProfilePicture: false,
  isErrorUser_UpdateProfilePicture: false,
  responseMessage_UpdateProfilePicture: "",
};

export const delete_user = createAsyncThunk(
  "user/delete",
  async (id, thunkAPI) => {
    try {
      return await userService.DeleteUser(id);
    } catch (error) {
      const message =
        (error.response_Delete &&
          error.response_Delete.data &&
          error.response_Delete.data.system_message) ||
        error.response_Delete.status ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const update_profile_picture = createAsyncThunk(
  "user/remove-profile-picture",
  async (profile_data, thunkAPI) => {
    try {
      return await userService.UpdateProfilePicture(profile_data);
    } catch (error) {
      const message =
        (error.response_Delete &&
          error.response_Delete.data &&
          error.response_Delete.data.system_message) ||
        error.response_Delete.status ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset_user: (state) => {
      // Delete Account
      state.isLoadingUser_Delete = false;
      state.isSuccessUser_Delete = false;
      state.isErrorUser_Delete = false;
      state.responseMessage_Delete = "";

      // Update Profile Picture
      state.isLoadingUser_UpdateProfilePicture = false;
      state.isSuccessUser_UpdateProfilePicture = false;
      state.isErrorUser_UpdateProfilePicture = false;
      state.responseMessage_UpdateProfilePicture = "";
    },
  },

  extraReducers: (builder) => {
    builder
      // Delete Account
      .addCase(delete_user.pending, (state, action) => {
        state.isLoadingUser_Delete = true;
      })
      .addCase(delete_user.fulfilled, (state, action) => {
        state.isLoadingUser_Delete = false;
        state.isSuccessUser_Delete = true;
        state.response_Delete = action.payload;
      })
      .addCase(delete_user.rejected, (state, action) => {
        state.isLoadingUser_Delete = false;
        state.isErrorUser_Delete = true;
        state.responseMessage_Delete = action.payload;
        state.response_Delete = null;
      })

      // Update Profile Picture
      .addCase(update_profile_picture.pending, (state, action) => {
        state.isLoadingUser_UpdateProfilePicture = true;
      })
      .addCase(update_profile_picture.fulfilled, (state, action) => {
        state.isLoadingUser_UpdateProfilePicture = false;
        state.isSuccessUser_UpdateProfilePicture = true;
        state.response_UpdateProfilePicture = action.payload;
      })
      .addCase(update_profile_picture.rejected, (state, action) => {
        state.isLoadingUser_UpdateProfilePicture = false;
        state.isErrorUser_UpdateProfilePicture = true;
        state.responseMessage_UpdateProfilePicture = action.payload;
        state.response_UpdateProfilePicture = null;
      });
  },
});

export const { reset_user } = userSlice.actions;
export default userSlice.reducer;
