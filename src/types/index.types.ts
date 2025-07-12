import { Role } from "@prisma/client";

export interface AuthTokenPayload {
  sub: string; // user id
  role: Role;
}