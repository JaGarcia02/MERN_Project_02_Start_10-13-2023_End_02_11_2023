import { configureStore } from "@reduxjs/toolkit";
import auth_reducer from "../features/auth/auth_slice";

export const store = configureStore({
  reducer: {
    Auth_Login: auth_reducer,
  },
  devTools: true,
});

export default store;
