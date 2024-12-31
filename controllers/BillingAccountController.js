import BaseController from "./BaseController";
import BillingAccountServices from "@/services/BillingAccountServices";

;

class BillingAccountController extends BaseController {
  model = new BillingAccountServices();

  constructor(model) {
    super(model);
  }

  async getTaxOffice (query = null) {
    try {
      const data = await this.model.getAllData(query, "tax_departments");
      return data;
    } catch ({ response }) {
      return response?.data;
    }
  }

}

export default new BillingAccountController();
