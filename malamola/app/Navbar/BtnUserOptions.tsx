"use client";

import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { RiLoginBoxLine } from "react-icons/ri";
import placeholderProfile from "@/public/assets/images/placeholder-profile.jpg";
import React from "react";
import { signIn, signOut } from "next-auth/react";

// types ----------------------------------------------------------------------------------------------
interface BtnUserOptionsProps {
  session: Session | null; // since user may not be logged in
}

const BtnUserOptions = ({ session }: BtnUserOptionsProps) => {
  // variables -----------------------------------------------------------------------------------------------
  // can also use next-auth hook to fetch session but it's client side => useSession from next-auth/react
  const user = session?.user;
  console.log("Navbar - user profile:", user?.name, " ************** ");

  // admin-only access links
  const adminLinks = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Users", href: "/admin/users" },
    { name: "Inventory", href: "/admin/inventory" },
    { name: "Enquiries", href: "/admin/enquiries" },
    { name: "Orders", href: "/admin/orders" },
  ];

  // functions ----------------------------------------------------------------------------------------
  const closeDropdown = () => {
    const elem = document.activeElement as HTMLElement;
    if (elem) elem.blur(); // this is important to close BtnUserOptions dropdown when user is redirected away from the page
  };

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="dropdown dropdown-end">
      {/* 1. Dropdown Button: profile icon if logged in || three dots */}
      <label tabIndex={0} className="btn btn-circle btn-ghost text-2xl">
        {user ? (
          <Image
            src={user?.image || placeholderProfile}
            alt="Profile Picture"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        ) : (
          <RiLoginBoxLine />
        )}
      </label>

      {/* 2. Dropdown List */}
      <ul
        tabIndex={0}
        className="menu dropdown-content rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow"
      >
        {/* a.i. show admin options */}
        {user?.role === "admin" && (
          <>
            <li className="btn btn-secondary btn-xs mb-2 cursor-default">
              Admin
            </li>
            <>
              {adminLinks.map((link) => {
                return (
                  <li key={link.name}>
                    <Link href={link.href} onClick={closeDropdown}>
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </>
          </>
        )}
        {/* a.ii. show normal user options */}

        {/* b. show sign in / sign out option based on user session */}
        <li>
          {user ? (
            <div>
              {/* next-auth singOut() redirects to home page afterwards */}
              <button
                className="text-base font-bold tracking-wider"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign out
              </button>
            </div>
          ) : (
            // next-auth signIn() redirects user back to last page afterwards
            <button
              className="text-base font-bold tracking-wider"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default BtnUserOptions;
