// services/StationModel.js
import BaseServices from "./BaseServices";
import { axiosInstance } from "@/services/ApiServices";

class UsersServices extends BaseServices {
  constructor() {
    super("equipment");
  }


  async assignRoleToUser(userId, roleId) {
    try {
      const { data } = await axiosInstance().put(`users/${userId}/roles/${roleId}`);
      return data;
    } catch ({ response }) {
      return response?.data;
    }
  }
}

export default UsersServices;
