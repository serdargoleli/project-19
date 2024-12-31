import AuthServices from "@/services/AuthServices";

class AuthController {
  async authLogin(loginData) {
    try {
      const response = await AuthServices.login(loginData);
      return response;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  }

  async authLoginValidation(loginData) {
    try {
      const response = await AuthServices.loginValidation(loginData);
      return response;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  }

  async passwordResetRequest(resetFormData) {
    try {
      const response = await AuthServices.resetPassword(resetFormData);
      return response;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  }

  async passwordResetVerify(resetVerifyFormData) {
    try {
      const response = await AuthServices.resetPasswordVerify(resetVerifyFormData);
      return response;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  }

  async getMyProfile() {
    try {
      const response = await AuthServices.getUser();
      return response;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  }
}

export default new AuthController();
