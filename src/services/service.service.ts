import { PrismaClient } from "../../generated/prisma/client.ts";
import type { ServiceResponseDTO } from "../dtos/service.dto.ts";

const prisma = new PrismaClient();

export class ServiceService {
  async getServices(): Promise<ServiceResponseDTO[]> {
    const services = await prisma.service.findMany({
      select: {
        service_code: true,
        service_name: true,
        service_icon: true,
        service_tariff: true,
      },
    });

    return services;
  }
}
