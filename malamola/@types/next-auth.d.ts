import { DefaultSession } from "next-auth";

// typescript declaration file => make changes to existing types
declare module "next-auth" {
  interface Session {
    user: { id: string } & DefaultSession["user"];
  }
}
