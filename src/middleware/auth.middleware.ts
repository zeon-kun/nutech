import type { NextFunction, Request, Response } from "express";
import type { User } from "../../generated/prisma/client.ts";
import { errorResponse } from "../utils/response.util.ts";
import { verifyToken } from "../utils/jwt.util.ts";

declare global {
  namespace Express {
    interface Request {
      user: {
        email: string;
        id: number;
      };
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json(errorResponse(108, "Token tidak valid atau kadaluwarsa"));
  }

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(errorResponse(108, "Token tidak valid atau kadaluwarsa"));
  }
};

export default authenticateToken;
