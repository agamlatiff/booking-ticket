import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Add custom user fields to session
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
        session.user.phone = user.phone;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Allow sign in
      return true;
    },
  },
  pages: {
    signIn: "/sign-in",
    newUser: "/complete-profile", // Redirect new users to complete profile
  },
  session: {
    strategy: "database",
  },
  events: {
    async createUser({ user }) {
      // Set default role for new users
      await prisma.user.update({
        where: { id: user.id },
        data: { role: "PATIENT" },
      });
    },
  },
});
