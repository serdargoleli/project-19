import BaseController from "./BaseController";
import CompaniesServices from "@/services/CompaniesServices";

class CompaniesController extends BaseController {
  model = new CompaniesServices();
  constructor(model) {
    super(model);
  }

}

export default new CompaniesController();
