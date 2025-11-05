import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller.ts";
import authenticateToken from "../middleware/auth.middleware.ts";

const router = Router();
const transactionController = new TransactionController();

router.get("/balance", authenticateToken, transactionController.getBalance);
router.post("/topup", authenticateToken, transactionController.topUp);
router.post("/transaction", authenticateToken, transactionController.createTransaction);
router.get("/transaction/history", authenticateToken, transactionController.getTransactionHistory);

export default router;
