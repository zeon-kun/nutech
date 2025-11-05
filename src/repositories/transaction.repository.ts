import { PrismaClient, TransactionType } from "../../generated/prisma/client.ts";

const prisma = new PrismaClient();

export class TransactionRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, balance: true },
    });
  }

  async findServiceByCode(service_code: string) {
    return prisma.service.findUnique({
      where: { service_code },
      select: { id: true, service_name: true, service_code: true, service_tariff: true },
    });
  }

  /**
   * RAW QUERY
   */

  async execTopupTx(userId: number, topupAmount: number, invoiceNumber: string) {
    const resultTx = await prisma.$transaction([
      prisma.$executeRaw`
            UPDATE "User"
            SET balance = balance + ${topupAmount}
            WHERE id = ${userId}
            `,
      prisma.transaction.create({
        data: {
          invoice_number: invoiceNumber,
          transaction_type: TransactionType.TOPUP,
          description: "Top Up Balance",
          total_amount: topupAmount,
          user_id: userId,
          service_id: null, //null for topup bang
        },
      }),
    ]);

    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    return updatedUser;
  }

  async execPaymentTx(
    userId: number,
    serviceId: number,
    serviceTariff: number,
    invoiceNumber: string,
    serviceName: string
  ) {
    const resultTx = await prisma.$transaction(async (tx) => {
      const updateResult = await tx.$executeRaw`
            UPDATE "User"
            SET balance = balance - ${serviceTariff}
            WHERE id = ${userId}
          `;

      const transaction = await tx.transaction.create({
        data: {
          invoice_number: invoiceNumber,
          transaction_type: TransactionType.PAYMENT,
          description: serviceName,
          total_amount: serviceTariff,
          user_id: userId,
          service_id: serviceId,
        },
      });
      return { transaction, serviceName };
    });

    return resultTx;
  }

  async getTxHistoryRecords(userId: number, offset: number, limit: number) {
    return prisma.transaction.findMany({
      where: { user_id: userId },
      orderBy: { created_on: "desc" },
      skip: offset,
      take: limit,
      select: {
        invoice_number: true,
        transaction_type: true,
        description: true,
        total_amount: true,
        created_on: true,
      },
    });
  }
}
