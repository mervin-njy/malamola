import Image from "next/image";
import mainLogo from "../public/assets/images/branding/fillyFlowerLogo-1.png";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      {/* <div className="flex flex-wrap justify-around w-full mb-16">
          <Link href="/account/login">Log In</Link>
          <Link href="/account/signup">Sign Up</Link>
        </div> */}

      <div className="justify-between">
        <Image
          src={mainLogo}
          alt="fillyflower's logo"
          width={400}
          height={400}
          className="rounded-full"
        />
        <h1>Welcome to Filly Flower Crafts</h1>
      </div>
    </main>
  );
}
