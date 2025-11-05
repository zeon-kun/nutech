import { Router } from "express";
import { UserController } from "../controllers/user.controller.ts";
import authenticateToken from "../middleware/auth.middleware.ts";
import upload from "../middleware/upload.middleware.ts";

const router = Router();
const userController = new UserController();

router.get("/profile", authenticateToken, userController.getProfile);
router.put("/profile/update", authenticateToken, userController.updateProfile);
router.put("/profile/image", authenticateToken, upload.single("file"), userController.updateProfileImage);

export default router;
