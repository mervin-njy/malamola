// route handlers => set up API endpoints
// [...foldername] is a catch-all segment that allows nextauth to handle different routes under this endpoint

import prisma from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter, // this allows us to store user info & session data in MongoDB using Prisma
  providers: [
    GoogleProvider({
      // proces.env => warning for clientId & clientSecret because the values may be null
      // => use zod to validate .env variables (in /lib/env.ts) & import env => guarantee its string & exists
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      // triggered whenever we return a session from the db
      session.user.id = user.id; // we add the id from the db to the session => but we need to extend user type for id: string (new folder: @types)
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
