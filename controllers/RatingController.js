import BaseController from "./BaseController";
import RatingServices from "@/services/RatingServices";

class RatingController extends BaseController {
  model = new RatingServices();
  constructor(model) {
    super(model);
  }

}

export default new RatingController();
