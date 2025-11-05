import { type Request, type Response, type NextFunction } from "express";
import { AuthService } from "../services/auth.service.ts";
import { type RegisterDTO, type LoginDTO } from "../dtos/auth.dto.ts";
import { errorResponse, successResponse } from "../utils/response.util.ts";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const registerDto: RegisterDTO = req.body;
      await authService.register(registerDto);
      return res.status(200).json(successResponse("Registrasi berhasil silahkan login", null));
    } catch (error) {
      return res.status(500).json(errorResponse(500, "Internal Server Error"));
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginDto: LoginDTO = req.body;
      const result = await authService.login(loginDto);
      return res.status(200).json(successResponse("Login Sukses", result));
    } catch (error) {
      console.log(error);
      return res.status(500).json(errorResponse(500, "Internal Server Error"));
    }
  }
}
