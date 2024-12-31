import BaseController from "./BaseController";
import ReportsServices from "@/services/ReportsServices";

class ReportsController extends BaseController {
  model = new ReportsServices();
  constructor(model) {
    super(model);
  }

}

export default new ReportsController();
