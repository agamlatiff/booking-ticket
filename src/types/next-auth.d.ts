import { DefaultSession, DefaultUser } from "next-auth";
import type { RoleUser } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: RoleUser;
      phone?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: RoleUser;
    phone?: string | null;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: RoleUser;
    phone?: string | null;
  }
}
