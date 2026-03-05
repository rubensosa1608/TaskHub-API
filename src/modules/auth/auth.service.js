import { prisma } from "../../lib/prisma.js";
import { hashPassword, comparePassword } from "../../utils/bcrypt.js";

export class AuthService {
  async createUser(email, password) {
    const hashedPassword = await hashPassword(password);

    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        categories: {
          create: [
            { name: "Favoritos", isDefault: true },
            { name: "Archivados", isDefault: true },
            { name: "Salud", isDefault: false },
            { name: "Estudios", isDefault: false },
            { name: "Ocio", isDefault: false },
            { name: "Trabajo", isDefault: false },
          ],
        },
      },
      select: {
        id: true,
        email: true,
      },
    });

    return user;
  }

  async findUserByEmail(email) {
    return prisma.users.findUnique({
      where: { email },
    });
  }

  async comparePasswords(plainPassword, hashedPassword) {
    return comparePassword(plainPassword, hashedPassword);
  }
}
