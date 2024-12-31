import BaseController from "./BaseController";
import HomeServices from "@/services/HomeServices";

class HomeController extends BaseController {
  model = new HomeServices();
  constructor(model) {
    super(model);
  }

}

export default new HomeController();
