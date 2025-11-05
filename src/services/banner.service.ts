import { PrismaClient } from "../../generated/prisma/client.ts";
import type { BannerResponseDTO } from "../dtos/banner.dto.ts";

const prisma = new PrismaClient();

export class BannerService {
  async getBanners(): Promise<BannerResponseDTO[]> {
    const banners = await prisma.banner.findMany({
      select: {
        banner_name: true,
        banner_image: true,
        description: true,
      },
    });

    return banners;
  }
}
