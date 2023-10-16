import Link from "next/link";
import React from "react";
import mainLogo from "../public/assets/images/branding/fillyFlowerLogo-200.svg";
import Image from "next/image";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center h-28 px-12 text-xl tracking-wider">
      <div className="flex justify-center w-2/12 ">
        <Link href="/">
          <Image src={mainLogo} alt="home" width={60} height={60} />
        </Link>
      </div>

      <ul className="flex space-x-12">
        <li className="hover:font-bold">
          <Link href="/">Home</Link>
        </li>
        {/* TODO: add dropdown beside Shop > All, Mola, Seasonal, DIY kits, Gifts */}
        <li className="hover:font-bold">
          <Link href="/shop">Shop</Link>
        </li>
        <li className="hover:font-bold">
          <Link href="/about">About</Link>
        </li>
        <li className="hover:font-bold">
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
      {/* TODO: 
          1. replace with icons 
          2. profile replace with sign in 
      
      */}
      <ul className="flex justify-center w-2/12 space-x-4 text-sm">
        <li>
          <Link href="/searchBar">Search</Link>
        </li>
        <li>
          <Link href="/account">Account</Link>
        </li>
        <li>
          <Link href="/cart">cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
