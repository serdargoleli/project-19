import BaseController from "./BaseController";
import UsersServices from "@/services/UsersServices";

class UsersController extends BaseController {
  model = new UsersServices();

  constructor(model) {
    super(model);
  }

  async assignToUser(userId, roleId) {
    try {
      const data = await this.model.assignRoleToUser(userId, roleId);
      return data;
    } catch ({ response }) {
      return response?.data;
    }
  }

}

export default new UsersController();
