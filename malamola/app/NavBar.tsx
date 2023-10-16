import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center h-14 px-12 text-2xl tracking-wider">
      <Link href="/">Logo</Link>
      <ul className="flex space-x-16">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/shop">Shop</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
      <Link href="/profile">Profile</Link>
    </nav>
  );
};

export default NavBar;
