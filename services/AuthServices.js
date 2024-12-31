// services/ProductModel.js
import axios from "axios";
import { axiosInstance } from "@/services/ApiServices";

class AuthServices {
  async login(body) {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_AUTH_URL}/login`, body);
      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }

  async loginValidation(body) {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_AUTH_URL}/login/verify`, body);
      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }

  async resetPassword(body) {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_AUTH_URL}/password/reset`, body);
      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }

  async resetPasswordVerify(body) {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_AUTH_URL}/password/reset/verify`, body);
      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }

  async getUser() {
    try {
      const response = await axiosInstance("auth").get("/user");
      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
}

export default new AuthServices();
