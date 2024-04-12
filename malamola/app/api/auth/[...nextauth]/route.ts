// route handlers => set up API endpoints
// [...foldername] is a catch-all segment that allows nextauth to handle different routes under this endpoint

import NextAuth from "next-auth";
import { authOptions } from "@/lib/configs/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
