"use client";

import React from "react";
import mainLogo from "../public/assets/images/branding/fillyFlowerLogo-200.svg";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  RiSearch2Line,
  RiAccountPinCircleFill,
  RiShoppingCart2Fill,
} from "react-icons/ri";
import classNames from "classnames";

const NavBar = () => {
  // Variables --------------------------------------------------------------------------------------
  // Get the current route
  const currentRoute = usePathname(); // requires CSR

  // array for navbar options
  const navOpts = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQs", href: "/faq" },
  ];

  const helpOpts = [
    { label: <RiSearch2Line />, href: "/search" },
    { label: <RiAccountPinCircleFill />, href: "/account" },
    { label: <RiShoppingCart2Fill />, href: "/cart" },
  ];

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
        {/* TODO: add dropdown beside Shop > All, Mola, Seasonal, DIY kits, Gifts */}
        {/* TODO: add dropdown beside About > FillyFlower, Our Biodiversity, Materials */}
        {navOpts.map((option, ind) => {
          return (
            <li key={ind}>
              <Link
                href={option.href}
                className={classNames({
                  "text-xl tracking-wider hover:text-neutral underline-offset-8":
                    true,
                  "text-accent font-bold": currentRoute === option.href,
                  "text-secondary hover:underline":
                    currentRoute !== option.href,
                })}
              >
                {option.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* TODO: profile replace with sign in */}
      <ul className="flex justify-center w-2/12 space-x-8">
        {helpOpts.map((option, ind) => {
          return (
            <li key={ind}>
              <Link
                href={option.href}
                className={classNames({
                  "text-2xl tracking-wider hover:text-neutral": true,
                  "text-accent": currentRoute === option.href,
                  "text-secondary": currentRoute !== option.href,
                })}
              >
                {option.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
