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
            { name: "Personal" },
            { name: "Trabajo" },
            { name: "Salud" },
            { name: "Estudios" },
            { name: "Ocio"}
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
