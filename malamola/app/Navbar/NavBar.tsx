import React from "react";
import mainLogo from "@/public/assets/images/branding/fillyFlowerLogo-200.svg";
import Link from "next/link";
import Image from "next/image";
import InputSearchQuery from "./InputSearchQuery";
import NavLinks from "./NavLinks";

const NavBar = () => {
  // render component ----------------------------------------------------------------------------------------
  return (
    <nav className="flex h-20 min-w-[50rem] items-center justify-between border-b-2 border-accent border-opacity-10 bg-neutral bg-opacity-5 px-12 shadow-sm tablet:h-28">
      {/* LEFT: Main Logo for home nav */}
      <div className="flex justify-center">
        <Link href="/">
          <Image
            src={mainLogo}
            alt="home"
            width={70}
            height={70}
            className="w-9/12 tablet:w-auto"
          />
        </Link>
      </div>

      {/* CENTER: Main nav links */}
      <NavLinks />

      {/* RIGHT: profile helper links */}
      <div className="flex-none space-x-8 text-xl tracking-wider tablet:text-2xl">
        {/* formData => redirect to /search query page */}
        <InputSearchQuery />
        {/* cart Btn + dropdown => client component to dynamically display cart size */}
      </div>
    </nav>
  );
};

export default NavBar;
