"use client";

import Link from "next/link";
import React from "react";
import mainLogo from "../public/assets/images/branding/fillyFlowerLogo-200.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  RiSearch2Line,
  RiAccountPinCircleFill,
  RiShoppingCart2Fill,
} from "react-icons/ri";

const NavBar = () => {
  // Get the current route --------------------------------------------------------------------------
  const currentRoute = usePathname();

  // styles - nav
  const navStyle = "text-xl tracking-wider hover:underline underline-offset-8";
  const activeNav = navStyle + " text-accent font-bold hover:no-underline";
  const nonActiveNav = navStyle + " text-secondary hover:font-bold";

  // styles - helper
  const helperStyle = "text-2xl tracking-wider hover:text-neutral";
  const activeHelper = helperStyle + " text-accent";
  const nonActiveHelper = helperStyle + " text-secondary";

  // Render NavBar ----------------------------------------------------------------------------------
  return (
    <nav className="flex justify-between items-center h-28 px-12 bg-opacity-5 bg-neutral">
      <div className="flex justify-center w-2/12 ">
        <Link href="/">
          <Image src={mainLogo} alt="home" width={70} height={70} />
        </Link>
      </div>

      <ul className="flex space-x-12">
        <li>
          <Link
            href="/"
            className={currentRoute === "/" ? activeNav : nonActiveNav}
          >
            Home
          </Link>
        </li>
        {/* TODO: add dropdown beside Shop > All, Mola, Seasonal, DIY kits, Gifts */}
        <li>
          <Link
            href="/products"
            className={currentRoute === "/products" ? activeNav : nonActiveNav}
          >
            Shop
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={currentRoute === "/about" ? activeNav : nonActiveNav}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={currentRoute === "/contact" ? activeNav : nonActiveNav}
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            href="/faq"
            className={currentRoute === "/faq" ? activeNav : nonActiveNav}
          >
            FAQs
          </Link>
        </li>
      </ul>
      {/* TODO: 
          1. replace with icons 
          2. profile replace with sign in 
      
      */}
      <ul className="flex justify-center w-2/12 space-x-8">
        <li>
          <Link
            href="/search"
            className={
              currentRoute === "/search" ? activeHelper : nonActiveHelper
            }
          >
            <RiSearch2Line />
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className={
              currentRoute === "/account" ? activeHelper : nonActiveHelper
            }
          >
            <RiAccountPinCircleFill />
          </Link>
        </li>
        <li>
          <Link
            href="/cart"
            className={
              currentRoute === "/cart" ? activeHelper : nonActiveHelper
            }
          >
            <RiShoppingCart2Fill />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
