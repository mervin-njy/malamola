import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title></title>
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <div>
            <Link href="/account/login">Log In</Link>
            <Link href="/account/signup">Sign Up</Link>
          </div>
          <h1>Filly Flower Crafts</h1>
        </div>
      </main>
    </>
  );
}
