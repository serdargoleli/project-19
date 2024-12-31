import BaseController from "./BaseController";
import ContactsServices from "@/services/ContactsServices";

class ContactsController extends BaseController {
  model = new ContactsServices();

  constructor(model) {
    super(model);
  }

  async createJiraTask(id, formdata) {
    try {
      const response = await this.model.update(id, formdata);
      return response;
    } catch ({ response }) {
      return response?.data;
    }
  }

}

export default new ContactsController();
