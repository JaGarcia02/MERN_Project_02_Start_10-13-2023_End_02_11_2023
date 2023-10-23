import axios from "axios";
import { API_AUTH_URL } from "../../../utils/auth_url";
import Cookie from "js-cookie";

const Login = async (input_data_login) => {
  const response = await axios.post(API_AUTH_URL + "signin", input_data_login);
  if (response.data) {
    localStorage.setItem("user_token", JSON.stringify(response.data.token));
    Cookie.set("user_token", response.data.token);
  }
  return response;
};

const Login_Google = async (googleUserData) => {
  const response = await axios.post(
    API_AUTH_URL + "google-signin",
    googleUserData
  );
  if (response.data) {
    localStorage.setItem("user_token", JSON.stringify(response.data.token));
    Cookie.set("user_token", response.data.token);
  }

  return response;
};

const SignUp = async (input_data_signup) => {
  const response = await axios.post(API_AUTH_URL + "signup", input_data_signup);
  return response;
};

const LogOut = async () => {
  const response = await axios.get(API_AUTH_URL + "signout");
  if (response) {
    Cookie.remove("user_token");
  }
  return response;
};

const CheckToken = async (token) => {
  const response = await axios.post(API_AUTH_URL + "check-token", token);
  return response;
};

const authService = {
  Login,
  LogOut,
  SignUp,
  CheckToken,
  Login_Google,
};

export default authService;
