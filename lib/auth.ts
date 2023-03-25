import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "./prisma";
import { Route } from "./routing";
import { userEmailCanSignIn } from "./session";

const SIGN_IN_FAILED_ROUTE = Route.Root;

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  callbacks: {
    signIn: (params) => (userEmailCanSignIn(params.user.email) ? true : SIGN_IN_FAILED_ROUTE),
  },
};
