import BaseController from "./BaseController";
import TariffsServices from "@/services/TariffsServices";

class TariffsController extends BaseController {
  model = new TariffsServices();
  constructor(model) {
    super(model);
  }

}

export default new TariffsController();
