import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import mainLogo from "../public/assets/images/branding/fillyFlowerLogo-1.png";

export default function Home() {
  return (
    <div>
      <Head>
        <title>FillyFlower</title>
      </Head>

      <main className="flex min-h-screen flex-col items-center p-20">
        <div className="flex flex-wrap justify-around w-full mb-16">
          <Link href="/account/login">Log In</Link>
          <Link href="/account/signup">Sign Up</Link>
        </div>

        <div className="flex justify-between w-8/12">
          <Image
            src={mainLogo}
            alt="fillyflower's logo"
            width={400}
            height={600}
          />
          <h1>Welcome to Filly Flower Crafts</h1>
        </div>
      </main>
    </div>
  );
}
