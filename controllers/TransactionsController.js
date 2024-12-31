import BaseController from "./BaseController";
import TransactionsServices from "@/services/TransactionsServices";

class TransactionsController extends BaseController {
  model = new TransactionsServices();

  constructor(model) {
    super(model);
  }

  async createTransactionReport(query = null, formdata = null) {
    let path = `transaction_reports`;
    if (query) {
      path = `${path}?${query}`;
    }
    return await this.model.create(formdata, path);
  }

  async getTransactionPayments(id) {
    return await this.model.getAllData(null, `/transactions/${id}/payments`);
  }

  async getBlackListUsers(query) {
    try {
      const data = await this.model.getAllData(query, "blacklist");
      return data;
    } catch ({ response }) {
      return response?.data;
    }
  }

}

export default new TransactionsController();
