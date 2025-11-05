import { PrismaClient } from "../../generated/prisma/client.ts";
import type { UpdateProfileDTO, UserResponseDTO } from "../dtos/user.dto.ts";

const prisma = new PrismaClient();

export class UserService {
  async getProfile(email: string): Promise<UserResponseDTO> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        email: true,
        first_name: true,
        last_name: true,
        profile_image: true,
      },
    });

    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    return user;
  }

  async updateProfile(email: string, updateProfileDto: UpdateProfileDTO): Promise<UserResponseDTO> {
    const { first_name, last_name } = updateProfileDto;

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        first_name,
        last_name,
      },
      select: {
        email: true,
        first_name: true,
        last_name: true,
        profile_image: true,
      },
    });

    return updatedUser;
  }

  async updateProfileImage(email: string, imagePath: string): Promise<UserResponseDTO> {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        profile_image: imagePath,
      },
      select: {
        email: true,
        first_name: true,
        last_name: true,
        profile_image: true,
      },
    });

    return updatedUser;
  }
}
