import "./globals.css";
import type { Metadata } from "next"; // SEO tool to optimize for search engines
import { Roboto } from "next/font/google";
import NavBar from "./Navbar/NavBar";
import Footer from "./Footer";
import SessionProvider from "./providers/SessionProvider"; // wrap this to ensure all session info accessible in all pages => but because this is a server component, we export from a client component
import StoreProvider from "./providers/StoreProvider";

const roboto = Roboto({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fillyflowercrafts.com/"),
  title: "Filly Flower Crafts",
  description:
    "Learn more about our biodiversity and browse our handcrafted embroidery products!",
  openGraph: {
    images: "https://imgur.com/obco3q4",
  },
};

// socialsharepreview.com notes:
// Title:
//  The og:title metatag is missing (Falling back to title tag)
//  Your title should be between 30-60 characters, with a maximum of 90 (currently 19 characters)
// Description:
//  The og:description metatag missing
//  Your description should be between 55 and 200 characters long, with a maximum of 300 (currently 0 characters)
// Image:
//  og:image can't be found at the defined URL
//  The ratio of your og:image isn't optimal
//  Image size is optimal (<8mb)

// types ------------------------------------------------------------------------------------------------------
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // render layout --------------------------------------------------------------------------------------------
  return (
    <html lang="en" data-theme="molaTheme">
      <body
        className={`${roboto.className} flex min-h-screen min-w-[50rem] flex-col justify-between`}
      >
        <StoreProvider>
          <SessionProvider>
            <NavBar />
            <main className="m-auto min-h-screen w-full max-w-7xl py-10">
              {children}
            </main>
            <Footer />
          </SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
