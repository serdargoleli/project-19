import BaseController from "./BaseController";
import RolesServices from "@/services/RolesServices";

class RolesController extends BaseController {
  model = new RolesServices();
  constructor(model) {
    super(model);
  }

}

export default new RolesController();
