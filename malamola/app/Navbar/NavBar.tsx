import React from "react";
import mainLogo from "@/public/assets/images/branding/fillyFlowerLogo-200.svg";
import Link from "next/link";
import Image from "next/image";
import InputSearchQuery from "./InputSearchQuery";
import NavLinks from "./NavLinks";
import { getCart } from "@/lib/db/cart";
import BtnShoppingCart from "./BtnShoppingCart";

// this server component fetches data & contains 3 client component (NavLinks, InputSearchQuery, BtnShoppingCart)
const NavBar = async () => {
  // variables -----------------------------------------------------------------------------------------------
  const cart = await getCart();

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="border-b-2 border-accent border-opacity-10 bg-neutral bg-opacity-5 shadow-sm">
      <nav className="m-auto flex h-20 max-w-7xl justify-between px-8 tablet:h-24">
        {/* LEFT: Main Logo for home nav */}
        <div className="flex items-center justify-start gap-10">
          <Link href="/">
            <Image
              src={mainLogo}
              alt="home"
              width={70}
              height={70}
              className="w-9/12 tablet:w-auto"
            />
          </Link>

          {/* CENTER: Main nav links */}
          <NavLinks />
        </div>

        {/* RIGHT: profile helper links */}
        <div className="flex items-center space-x-8 text-xl tracking-wider text-secondary tablet:text-2xl">
          {/* formData => redirect to /search query page */}
          <InputSearchQuery />
          {/* cart Btn + dropdown => client component to dynamically display cart size */}
          <BtnShoppingCart cart={cart} />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
