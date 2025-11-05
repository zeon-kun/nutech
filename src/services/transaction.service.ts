import { PrismaClient } from "../../generated/prisma/client.ts";
import type {
  BalanceResponseDTO,
  TopUpDTO,
  TransactionDTO,
  TransactionHistoryResponseDTO,
  TransactionResponseDTO,
} from "../dtos/transaction.dto.ts";
import { TransactionRepository } from "../repositories/transaction.repository.ts";
import { generateInvoice } from "../utils/invoice.util.ts";

const transactionRepository = new TransactionRepository();

export class TransactionService {
  async getBalance(email: string): Promise<BalanceResponseDTO> {
    const user = await transactionRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    return { balance: user.balance };
  }

  async topup(email: string, topupDTO: TopUpDTO): Promise<BalanceResponseDTO> {
    const { top_up_amount } = topupDTO;

    if (!Number.isInteger(top_up_amount) || top_up_amount <= 0) {
      throw new Error("Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0");
    }

    const user = await transactionRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    const invoiceNumber = generateInvoice();

    const result = await transactionRepository.execTopupTx(user.id, top_up_amount, invoiceNumber);

    if (!result) {
      throw new Error("Topup gagal");
    }

    return { balance: result.balance };
  }

  async createTransaction(email: string, transactionDto: TransactionDTO): Promise<TransactionResponseDTO> {
    const { service_code } = transactionDto;

    const service = await transactionRepository.findServiceByCode(service_code);
    if (!service) {
      throw new Error("Service atau Layanan tidak ditemukan");
    }

    const user = await transactionRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    if (user.balance < service.service_tariff) {
      throw new Error("Saldo tidak mencukupi");
    }

    const invoiceNumber = generateInvoice();

    const result = await transactionRepository.execPaymentTx(
      user.id,
      service.id,
      service.service_tariff,
      invoiceNumber,
      service.service_name
    );

    const { transaction, serviceName } = result;

    return {
      invoice_number: transaction.invoice_number,
      service_code: service.service_code,
      service_name: serviceName,
      transaction_type: transaction.transaction_type,
      total_amount: transaction.total_amount,
      created_on: transaction.created_on,
    };
  }

  async getTransactionHistory(
    email: string,
    offset: number = 0,
    limit?: number
  ): Promise<TransactionHistoryResponseDTO> {
    const user = await transactionRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    const txs = await transactionRepository.getTxHistoryRecords(user.id, offset, limit || 10);

    return {
      offset,
      limit: limit || txs.length,
      records: txs,
    };
  }
}
