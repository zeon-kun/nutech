import { Router } from "express";
import { BannerController } from "../controllers/banner.controller.ts";

const router = Router();
const bannerController = new BannerController();

router.get("/banner", bannerController.getBanners);

export default router;
