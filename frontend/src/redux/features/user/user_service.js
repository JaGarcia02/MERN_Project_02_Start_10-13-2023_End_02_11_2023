import axios from "axios";
import {
  API_USER_URL,
  REQ_METHOD_DELETE,
  REQ_METHOD_GET,
  REQ_METHOD_UPDATE,
} from "../../../utils/user_url";

const GetUser = async (id) => {
  const response = await axios.get(API_USER_URL + REQ_METHOD_GET + id);
  if (response.data) {
    return response;
  }
};

const UpdateProfilePicture = async (profile_data) => {
  const response = await axios.patch(
    API_USER_URL + REQ_METHOD_UPDATE + profile_data._id,
    profile_data
  );

  if (response.data) {
    return response;
  }
};

const DeleteUser = async (id) => {
  const response = await axios.delete(API_USER_URL + REQ_METHOD_DELETE + id);
  return response;
};
const userService = {
  GetUser,
  DeleteUser,
  UpdateProfilePicture,
};
export default userService;
