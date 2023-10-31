import "./globals.css";
import type { Metadata } from "next"; // SEO tool to optimize for search engines
import { Roboto } from "next/font/google";
import NavBar from "./Navbar/NavBar";
import Footer from "./Footer";

const roboto = Roboto({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Filly Flower Crafts",
  description:
    "Learn more about our biodiversity and browse our handcrafted embroidery products!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="molaTheme">
      <body
        className={`${roboto.className} flex min-h-screen min-w-[50rem] flex-col justify-between`}
      >
        <NavBar />
        <main className="m-auto min-h-screen w-full max-w-7xl px-8 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
