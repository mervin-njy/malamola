import { redirect } from "next/navigation";
import React from "react";
import { MdSearch } from "react-icons/md";

const InputSearchQuery = () => {
  // actions ---------------------------------------------------------------------------------------------------
  const searchProducts = async (formData: FormData) => {
    "use server"; // needs this to pass function to client components
    const searchQuery = formData.get("searchQuery")?.toString();
    if (searchQuery) redirect("/search?query=" + searchQuery);
  };

  // render component ----------------------------------------------------------------------------------------
  return (
    <form action={searchProducts} className="join mr-2 max-h-10">
      <div className="form-control">
        <input
          name="searchQuery"
          placeholder="Search products"
          className="input input-sm join-item input-bordered w-[7rem] text-xs focus:text-accent focus:outline-none laptop:w-full laptop:text-sm"
        />
      </div>
      <button className="btn btn-secondary join-item btn-sm">
        <MdSearch />
      </button>
    </form>
  );
};

export default InputSearchQuery;
