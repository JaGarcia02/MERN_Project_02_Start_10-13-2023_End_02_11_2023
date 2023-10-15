import axios from "axios";
import Cookie from "js-cookie";
import { auth_API_URL } from "../../../utils/auth_url";

const Login = async (input_data_login) => {
  const response = await axios.post(auth_API_URL + "signin", input_data_login);
  if (response.data) {
    localStorage.setItem("user_token", JSON.stringify(response.data.token));
  }
  return response.data;
};

const CheckToken = async (token) => {
  console.log(token);
  const response = await axios.post(auth_API_URL + "check-token", token);
  return response.data;
};

const authService = {
  Login,
  CheckToken,
};

export default authService;
