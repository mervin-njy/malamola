import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import mainLogo from "../public/assets/images/branding/fillyFlowerLogo-1.png";

export const metadata: Metadata = {
  title: "Filly Flower Crafts",
};

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center">
        {/* <div className="flex flex-wrap justify-around w-full mb-16">
          <Link href="/account/login">Log In</Link>
          <Link href="/account/signup">Sign Up</Link>
        </div> */}

        <div className="flex w-8/12 justify-between">
          <Image
            src={mainLogo}
            alt="fillyflower's logo"
            width={400}
            height={600}
            className="rounded-full"
          />
          <h1>Welcome to Filly Flower Crafts</h1>
        </div>
      </main>
    </>
  );
}
