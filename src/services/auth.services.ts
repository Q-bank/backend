
import { PrismaClient, User } from "@prisma/client";
import { AuthTokenPayload } from "@/types/index.types";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import config from "@/config";

const prisma = new PrismaClient()

class AuthService {
  /**
   * Validate a user's email and password. Returns the user if valid, otherwise null.
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) return null;

    return user;
  }

  /**
   * Log a user in and return a signed JWT and safe user details.
   */
  async login(email: string, password: string): Promise<{ token: string; user: Omit<User, "password"> }> {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const jwtSecret = config.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT secret is not defined in configuration");
    }
    const payload: AuthTokenPayload = {
      sub: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, jwtSecret as string, { expiresIn: "7d" });

    // Return user data without the password field
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...safeUser } = user;

    return { token, user: safeUser };
  }
}

export default new AuthService();
