import { type Request, type Response, type NextFunction } from "express";
import { ServiceService } from "../services/service.service.ts";
import { errorResponse, successResponse } from "../utils/response.util.ts";

const serviceService = new ServiceService();

export class ServiceController {
  async getServices(req: Request, res: Response, next: NextFunction) {
    try {
      const services = await serviceService.getServices();
      return res.status(200).json(successResponse("Sukses", services));
    } catch (error) {
      return res.status(500).json(errorResponse(500, "Internal Server Error"));
    }
  }
}
