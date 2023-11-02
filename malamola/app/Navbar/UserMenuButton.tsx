"use client";

import { Session } from "next-auth";
import Image from "next/image";
import { FaUserCircle, FaRegUserCircle } from "react-icons/fa";
import placeholderProfile from "@/public/assets/images/placeholder-profile.jpg";
import React from "react";

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
          <FaUserCircle />
        )}
      </label>
    </div>
  );
};

export default UserMenuButton;
