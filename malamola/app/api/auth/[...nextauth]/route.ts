// route handlers => set up API endpoints
// [...foldername] is a catch-all segment that allows nextauth to handle different routes under this endpoint

import { mergeAnonymousCartIntoUserCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: { strategy: "database" },
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter, // this allows us to store user info & session data in MongoDB using Prisma
  providers: [
    GoogleProvider({
      // proces.env => warning for clientId & clientSecret because the values may be null
      // => use zod to validate .env variables (in /lib/env.ts) & import env => guarantee its string & exists
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          role: profile.role ? profile.role : "user",
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // triggered whenever we return a session from the db
      session.user.id = user.id; // we add the id from the db to the session => but we need to extend user type for id: string (new folder: @types)
      session.user.role = user.role; // similarly grab the user's role from db
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      // triggers on event - signIn => mergeCarts() w/ user that just signed in
      // Offload heavy tasks to background processes or queues
      await processHeavyTasks(user.id);
      console.log(user, "has succesfully signed in.");
    },
  },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "#de8139", // Hex color code
    logo: "https://drive.google.com/uc?export=view&id=18mskAEdQ_tOsJrWksTmMedBCD6hiucNk", // Absolute URL to image
    buttonText: "#f3eee1", // Hex color code
  },
};

async function processHeavyTasks(userId: string) {
  // Perform heavy tasks asynchronously
  console.log("Processing heavy tasks for user:", userId);
  await mergeAnonymousCartIntoUserCart(userId);
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
