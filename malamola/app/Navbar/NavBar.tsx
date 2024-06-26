import { getCart } from "@/lib/db/cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/configs/auth";
import React from "react";
import mainLogo from "@/public/assets/fillyFlowerLogo-200.svg";
import Link from "next/link";
import Image from "next/image";
import InputSearchQuery from "./InputSearchQuery";
import NavLinks from "./NavLinks";
import BtnShoppingCart from "./cart/BtnShoppingCart";
import BtnUserOptions from "./BtnUserOptions";
import ToggleLanguage from "./ToggleLanguage";

// types -----------------------------------------------------------------------------------------------------

// this server component fetches data & contains 3 client component (NavLinks, InputSearchQuery, BtnShoppingCart)
const NavBar = async () => {
  // variables -----------------------------------------------------------------------------------------------
  // server side data fetching for session and cart info
  const cart = await getCart();
  const session = await getServerSession(authOptions);

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="border-b-2 border-accent border-opacity-10 bg-neutral bg-opacity-5 shadow-sm">
      <nav className="m-auto flex h-24 max-w-7xl justify-between px-6">
        {/* LEFT: Main Logo for home nav */}
        <div className="flex items-center justify-start tablet:gap-4 laptop:gap-10">
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
        <div className="flex items-center tracking-wider text-secondary tablet:gap-1 laptop:gap-2">
          {/* 1. formData => redirect to /search query page */}
          <InputSearchQuery />

          {/* 2. language toggle */}
          <ToggleLanguage />

          {/* 3. cart Btn + dropdown => client component to dynamically display cart size */}
          <BtnShoppingCart cart={cart} />

          {/* 4. user profile + dropdown => client component to dynamically show user session options */}
          <BtnUserOptions session={session} />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
