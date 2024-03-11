import Image from "next/image";
import Link from "next/link";
import mainLogo from "@/public/assets/fillyFlowerLogo-1.png";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="justify-between">
        <Image
          src={mainLogo}
          alt="fillyflower's logo"
          width={400}
          height={400}
          className="rounded-full"
        />
        <h1 className="mt-8 text-3xl font-bold tracking-wide">
          Welcome to Filly Flower Crafts
        </h1>
        <p className="mt-4 tracking-wide">Still under construction.</p>

        <Link
          href="/products"
          className="btn btn-accent btn-sm mt-4 tracking-wider"
        >
          Shop now
        </Link>
      </div>
    </main>
  );
}
