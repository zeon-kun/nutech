import { type Request, type Response, type NextFunction } from "express";
import { TransactionService } from "../services/transaction.service.ts";
import { type TopUpDTO, type TransactionDTO } from "../dtos/transaction.dto.ts";
import { errorResponse, successResponse } from "../utils/response.util.ts";

const transactionService = new TransactionService();

export class TransactionController {
  async getBalance(req: Request, res: Response, next: NextFunction) {
    try {
      const balance = await transactionService.getBalance(req.user!.email);
      return res.status(200).json(successResponse("Get Balance Berhasil", balance));
    } catch (error) {
      return res.status(500).json(errorResponse(500, "Internal Server Error"));
    }
  }

  async topUp(req: Request, res: Response, next: NextFunction) {
    try {
      const topUpDto: TopUpDTO = req.body;
      const result = await transactionService.topup(req.user!.email, topUpDto);
      return res.status(200).json(successResponse("Top Up Balance berhasil", result));
    } catch (error) {
      console.log(error);
      return res.status(500).json(errorResponse(500, "Internal Server Error"));
    }
  }

  async createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const transactionDto: TransactionDTO = req.body;
      const result = await transactionService.createTransaction(req.user!.email, transactionDto);
      return res.status(200).json(successResponse("Transaksi berhasil", result));
    } catch (error) {
      return res.status(500).json(errorResponse(500, "Internal Server Error"));
    }
  }

  async getTransactionHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const offset = parseInt(req.query.offset as string) || 0;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

      const history = await transactionService.getTransactionHistory(req.user!.email, offset, limit);
      return res.status(200).json(successResponse("Get History Berhasil", history));
    } catch (error) {
      return res.status(500).json(errorResponse(500, "Internal Server Error"));
    }
  }
}
