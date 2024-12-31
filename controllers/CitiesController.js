import BaseController from "./BaseController";
import CitiesServices from "@/services/CitiesServices";

class CitiesController extends BaseController {
  model = new CitiesServices();
  constructor(model) {
    super(model);
  }

}

export default new CitiesController();
