import BaseController from "./BaseController";
import FaqServices from "@/services/FaqServices";

class FaqController extends BaseController {
  model = new FaqServices();
  constructor(model) {
    super(model);
  }

}

export default new FaqController();
