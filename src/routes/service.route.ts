import { Router } from "express";
import { ServiceController } from "../controllers/service.controller.ts";
import authenticateToken from "../middleware/auth.middleware.ts";

const router = Router();
const serviceController = new ServiceController();

router.get("/services", authenticateToken, serviceController.getServices);

export default router;
