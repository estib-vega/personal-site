import { NextAuthOptions, Session } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";

const adminUsers: string[] = process.env.ALLOWED_USER_EMAILS?.split(',') ?? [];

export enum SessionValidity {
  NoSession,
  Admin,
  InvalidSession,
}

export function validateSession(session: Session | null): SessionValidity {
  const email = session?.user?.email;
  if (!email) {
    return SessionValidity.NoSession;
  }

  if (adminUsers.includes(email)) {
    return SessionValidity.Admin;
  }

  return SessionValidity.InvalidSession;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};
