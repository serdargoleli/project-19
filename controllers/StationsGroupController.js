import BaseController from "./BaseController";
import StationsGroupServices from "@/services/StationsGroupServices";

class StationsGroupController extends BaseController {
  model = new StationsGroupServices();
  constructor(model) {
    super(model);
  }
}

export default new StationsGroupController();
