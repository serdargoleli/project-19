import BaseController from "./BaseController";
import StationServices from "@/services/StationsServices";

class StationsController extends BaseController {
  model = new StationServices();

  constructor(model) {
    super(model);
  }

  // base controller harici fonksiyon yazmak istersek bu şekilde tanımlanacak
  async getStationSocket(query) {
    return await this.model.getAllData(query, `/station_sockets`);
  };

  async getStationGroups(query) {
    return await this.model.getAllData(query, `/stations-groups`);
  };
}

export default new StationsController();
