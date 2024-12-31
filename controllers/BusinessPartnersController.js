import BaseController from "./BaseController";
import BusinessPartnersServices from "@/services/BusinessPartnersServices";

class BusinessPartnersController extends BaseController {
  model = new BusinessPartnersServices();
  constructor(model) {
    super(model);
  }

}

export default new BusinessPartnersController();
