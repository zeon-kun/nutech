import { PrismaClient } from "../../generated/prisma/client.ts";
import type { LoginDTO, RegisterDTO } from "../dtos/auth.dto.ts";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.util.ts";

const prisma = new PrismaClient();

export class AuthService {
  async register(registerDTO: RegisterDTO): Promise<void> {
    const { email, first_name, last_name, password } = registerDTO;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Parameter email tidak sesuai format");
    }

    if (password.length < 8) {
      throw new Error("Parameter password minimal 8 karakter");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        first_name,
        last_name,
        password: hashedPassword,
      },
    });
  }

  async login(loginDto: LoginDTO): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Email atau password salah");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error("Email atau password salah");
    }

    const token = generateToken({
      email: user.email,
      id: user.id,
    });

    return { token };
  }
}
