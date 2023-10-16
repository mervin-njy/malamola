import "./globals.css";
import type { Metadata } from "next"; // SEO tool to optimize for search engines
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

import NavBar from "./NavBar";

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
