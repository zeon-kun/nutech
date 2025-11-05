import { type Request, type Response, type NextFunction } from "express";
import { BannerService } from "../services/banner.service.ts";
import { errorResponse, successResponse } from "../utils/response.util.ts";

const bannerService = new BannerService();

export class BannerController {
  async getBanners(req: Request, res: Response, next: NextFunction) {
    try {
      const banners = await bannerService.getBanners();
      return res.status(200).json(successResponse("Sukses", banners));
    } catch (error) {
      return res.status(500).json(errorResponse(500, "Internal Server Error"));
    }
  }
}
