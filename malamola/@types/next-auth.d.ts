import { DefaultSession } from "next-auth";

// typescript declaration file => make changes to existing types
declare module "next-auth" {
  interface User {
    role: string;
  }
  interface Session {
    user: { id: string; role: string } & DefaultSession["user"];
  }
}
