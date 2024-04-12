"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import classNames from "classnames";

const NavLinks = () => {
  // variables -----------------------------------------------------------------------------------------------
  // Get the current route
  const currentRoute = usePathname(); // requires CSR

  // array for navbar options
  const navOpts = [
    // { label: "Home", href: "/" }, => use logo instead
    { label: "Shop", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    // { label: "FAQs", href: "/faq" }, => move to footer
  ];
  return (
    <ul className="flex space-x-4 text-base tracking-wider tablet:space-x-6 tablet:text-lg laptop:space-x-12 laptop:text-xl">
      {navOpts.map((option, ind) => {
        return (
          <li key={ind}>
            <Link
              href={option.href}
              className={classNames({
                "underline-offset-8 hover:text-neutral": true, // underline offset for hovered links
                "font-semibold text-accent": currentRoute === option.href, // active link
                "text-secondary hover:underline": currentRoute !== option.href, // inactive link
              })}
            >
              {option.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
