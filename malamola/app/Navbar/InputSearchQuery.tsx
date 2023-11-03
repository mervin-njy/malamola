import { redirect } from "next/navigation";
import React from "react";

const InputSearchQuery = () => {
  // actions ---------------------------------------------------------------------------------------------------
  const searchProducts = async (formData: FormData) => {
    "use server"; // needs this to pass function to client components
    const searchQuery = formData.get("searchQuery")?.toString();
    if (searchQuery) redirect("/search?query=" + searchQuery);
  };

  // render component ----------------------------------------------------------------------------------------
  return (
    <form action={searchProducts} className="mr-2">
      <div className="form-control">
        <input
          name="searchQuery"
          placeholder="Search products"
          className="input input-bordered max-h-10 w-full min-w-[100px]"
        />
      </div>
    </form>
  );
};

export default InputSearchQuery;
