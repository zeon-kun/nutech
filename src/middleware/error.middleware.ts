import { type Request, type Response, type NextFunction } from "express";
import { errorResponse } from "../utils/response.util.ts";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  if (err.message === "Service atau Layanan tidak ditemukan") {
    return res.status(400).json(errorResponse(102, err.message));
  } else if (err.message === "Saldo tidak mencukupi") {
    return res.status(400).json(errorResponse(103, err.message));
  } else if (err.message === "Email atau password salah") {
    return res.status(401).json(errorResponse(102, err.message));
  } else if (err.message === "Format Image tidak sesuai") {
    return res.status(400).json(errorResponse(102, err.message));
  } else if (err.message === "Parameter email tidak sesuai format") {
    return res.status(400).json(errorResponse(102, err.message));
  } else if (err.message === "Parameter password minimal 8 karakter") {
    return res.status(400).json(errorResponse(102, err.message));
  } else if (err.message === "Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0") {
    return res.status(400).json(errorResponse(102, err.message));
  }

  //     else if (err.message === "User tidak ditemukan") {
  //     return res.status(401).json(errorResponse(108, "Token tidak valid atau kadaluarsa"));
  //   }

  return res.status(500).json(errorResponse(500, "Internal server error"));
};
