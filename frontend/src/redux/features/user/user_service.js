import axios from "axios";
import {
  API_USER_URL,
  REQ_METHOD_DELETE_USER,
  REQ_METHOD_GET_USER,
  REQ_METHOD_UPDATE_USER,
  REQ_METHOD_UPDATE_USER_PICTURE,
} from "../../../utils/user_url";

const GetUser = async (id) => {
  const response = await axios.get(API_USER_URL + REQ_METHOD_GET_USER + id);
  if (response.data) {
    return response;
  }
};

const UpdateProfile = async (profile_data) => {
  const response = await axios.patch(
    API_USER_URL + REQ_METHOD_UPDATE_USER + profile_data._id,
    profile_data
  );

  if (response.data) {
    return response;
  }
};

const UpdateProfilePicture = async (picture_data) => {
  const response = await axios.patch(
    API_USER_URL + REQ_METHOD_UPDATE_USER_PICTURE + picture_data._id,
    picture_data
  );
  if (response.data) {
    return response;
  }
};

const DeleteUser = async (id) => {
  const response = await axios.delete(
    API_USER_URL + REQ_METHOD_DELETE_USER + id
  );
  if (response.data) {
    return response;
  }
};
const userService = {
  GetUser,
  DeleteUser,
  UpdateProfile,
  UpdateProfilePicture,
};
export default userService;
