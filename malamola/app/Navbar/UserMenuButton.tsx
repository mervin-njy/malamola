"use client";

import { Session } from "next-auth";
import Image from "next/image";
import { PiDotsThreeBold } from "react-icons/pi";
import placeholderProfile from "@/public/assets/images/placeholder-profile.jpg";
import React from "react";
import { signIn, signOut } from "next-auth/react";

// types ----------------------------------------------------------------------------------------------
interface UserMenuButtonProps {
  session: Session | null; // since user may not be logged in
}

const UserMenuButton = ({ session }: UserMenuButtonProps) => {
  // can also use next-auth hook to fetch session but it's client side => useSession from next-auth/react
  const user = session?.user;

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="dropdown dropdown-end">
      {/* 1. Dropdown Button: profile icon if logged in || three dots */}
      <label tabIndex={0} className="btn btn-circle btn-ghost">
        {user ? (
          <Image
            src={user?.image || placeholderProfile}
            alt="Profile Picture"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        ) : (
          <PiDotsThreeBold />
        )}
      </label>

      {/* 2. Dropdown List */}
      <ul
        tabIndex={0}
        className="menu dropdown-content rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow"
      >
        {/* show sign in / sign out option based on user session */}
        <li>
          {user ? (
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              Sign out
            </button>
          ) : (
            // next-auth signIn() redirects user back to last page after signIn
            <button onClick={() => signIn()}>Sign in</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default UserMenuButton;
