import { type Request, type Response, type NextFunction } from "express";
import { UserService } from "../services/user.service.ts";
import { type UpdateProfileDTO } from "../dtos/user.dto.ts";
import { errorResponse, successResponse } from "../utils/response.util.ts";

const userService = new UserService();

export class UserController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getProfile(req.user!.email);
      return res.status(200).json(successResponse("Sukses", user));
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const updateProfileDto: UpdateProfileDTO = req.body;
      const updatedUser = await userService.updateProfile(req.user!.email, updateProfileDto);
      return res.status(200).json(successResponse("Update Pofile berhasil", updatedUser));
    } catch (error) {
      return res.status(500).json(errorResponse(500, "Internal Server Error"));
    }
  }

  async updateProfileImage(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new Error("File tidak ditemukan");
      }

      const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
      const imagePath = `${baseUrl}/uploads/${req.file.filename}`;

      const updatedUser = await userService.updateProfileImage(req.user!.email, imagePath);
      return res.status(200).json(successResponse("Update Profile Image berhasil", updatedUser));
    } catch (error) {
      return res.status(500).json(errorResponse(500, "Internal Server Error"));
    }
  }
}
