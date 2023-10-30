"use client";

import React from "react";
import mainLogo from "@/public/assets/images/branding/fillyFlowerLogo-200.svg";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  RiSearch2Line,
  RiAccountPinCircleFill,
  RiShoppingCart2Fill,
} from "react-icons/ri";
import classNames from "classnames";
import InputSearchQuery from "./InputSearchQuery";

const NavBar = () => {
  // variables -----------------------------------------------------------------------------------------------
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

  // const helpOpts = [
  //   { label: <RiSearch2Line />, href: "/search" },
  //   { label: <RiAccountPinCircleFill />, href: "/account" },
  //   { label: <RiShoppingCart2Fill />, href: "/cart" },
  // ];

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
      <ul className="flex max-w-7xl space-x-8 text-base tracking-wider tablet:space-x-8 laptop:space-x-12 laptop:text-xl">
        {navOpts.map((option, ind) => {
          return (
            <li key={ind}>
              <Link
                href={option.href}
                className={classNames({
                  "underline-offset-8 hover:text-neutral": true,
                  "font-bold text-accent": currentRoute === option.href,
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

      {/* RIGHT: profile helper links */}
      {/* <ul className="flex justify-center space-x-8 text-xl tracking-wider tablet:text-2xl">
        {helpOpts.map((option, ind) => {
          return (
            <li key={ind}>
              <Link
                href={option.href}
                className={classNames({
                  "hover:text-neutral": true,
                  "text-accent": currentRoute === option.href,
                  "text-secondary": currentRoute !== option.href,
                })}
              >
                {option.label}
              </Link>
            </li>
          );
        })}
      </ul> */}
      <div className="flex-none space-x-8 text-xl tracking-wider tablet:text-2xl">
        {/* formData => redirect to /search query page */}
        <InputSearchQuery />
        {/* cart Btn + dropdown => client component to dynamically display cart size */}
      </div>
    </nav>
  );
};

export default NavBar;
