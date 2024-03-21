"use client";

import Link from "next/link";
import React from "react";
import { TbCaretDown } from "react-icons/tb";
import { PiCaretDownFill } from "react-icons/pi";

// types -----------------------------------------------------------------------------------------------------
interface CategoryFilterProps {
  current: string;
  categories: string[];
}

interface CategoryItem {
  tabs: JSX.Element[];
  dropdown: JSX.Element[];
}

const CategoryFilter = ({ current, categories }: CategoryFilterProps) => {
  // event handlers ------------------------------------------------------------------------------------------
  const handleClick = () => {
    const elem = document.activeElement as HTMLElement;
    if (elem) elem?.blur();
  };

  // generate filter links to query string parameter for filter applied to prisma query ----------------------
  const categoryItems: CategoryItem = {
    tabs: [],
    dropdown: [],
  };

  // Loop through categories to generate tabs and dropdown items
  categories.forEach((category) => {
    // a. larger screens
    categoryItems.tabs.push(
      <Link
        key={category}
        href={"?category=" + category}
        className={`btn join-item btn-sm w-[7.5rem] border-accent border-opacity-10 bg-accent normal-case hover:bg-accent hover:bg-opacity-20 ${
          current === category
            ? "btn-active pointer-events-none bg-opacity-40"
            : "bg-opacity-5"
        }`}
      >
        {category}
      </Link>,
    );
    // b. smaller screens
    categoryItems.dropdown.push(
      <li key={category} onClick={handleClick}>
        <Link
          key={category}
          href={`?category=${category}`}
          className={`hover:bg-accent hover:bg-opacity-20 ${
            current === category
              ? "dropdown-item-active pointer-events-none bg-accent bg-opacity-40"
              : ""
          }`}
        >
          {category}
        </Link>
      </li>,
    );
  });

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="flex flex-col items-center">
      {/* for larger screens */}
      {/* <div className="join hidden laptop:block">{categoryItems.tabs}</div> */}

      {/* for smaller screens */}
      {/* laptop:hidden */}
      <div className="dropdown dropdown-end dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-sm border-accent border-opacity-10 bg-accent bg-opacity-10 text-base hover:bg-accent hover:bg-opacity-20"
        >
          {current === "All" ? "Categories" : current}
          <PiCaretDownFill size={18} />
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content menu-sm z-[1] w-40 gap-1 rounded-box bg-base-100 p-1 shadow"
        >
          {categoryItems.dropdown}
        </ul>
      </div>
    </div>
  );
};

export default CategoryFilter;
