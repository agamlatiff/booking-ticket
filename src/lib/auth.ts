import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import prisma from "./prisma";
import { loginSchema } from "./validations/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate input with Zod
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          throw new Error("Data tidak valid");
        }

        const { email, password } = parsed.data;

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error("Email atau password salah");
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error("Email atau password salah");
        }

        // Return user object
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          phone: user.phone,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // For credentials login, user comes from token
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as any;
        session.user.phone = token.phone as string | null;
      }
      // For OAuth, user comes from database
      if (user) {
        session.user.id = user.id;
        session.user.role = user.role;
        session.user.phone = user.phone;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add custom fields to JWT token
      if (user) {
        token.role = user.role;
        token.phone = user.phone;
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      return true;
    },
  },
  pages: {
    signIn: "/sign-in",
    newUser: "/complete-profile",
    error: "/sign-in", // Redirect to sign-in on error
  },
  session: {
    // Use JWT for credentials, database for OAuth
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 5 * 60, // 5 minutes
  },
  trustHost: true,
});

/**
 * Hash password for storage
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/**
 * Verify password
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
