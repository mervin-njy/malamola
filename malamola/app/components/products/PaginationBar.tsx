import Link from "next/link";
import { PiCaretDoubleLeftBold, PiCaretDoubleRightBold } from "react-icons/pi";
import React from "react";

// types -----------------------------------------------------------------------------------------------------
interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

const PaginationBar = ({ currentPage, totalPages }: PaginationBarProps) => {
  // variables -----------------------------------------------------------------------------------------------
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10)); // get max number between current+4, total or 10
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9)); // get min number between 1, current-5 or total-9

  const numberedPageItems: JSX.Element[] = [];
  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        key={page}
        href={"?page=" + page}
        className={`btn join-item border-accent border-opacity-10 bg-accent bg-opacity-5 hover:bg-accent hover:bg-opacity-20 ${
          currentPage === page
            ? "btn-active pointer-events-none bg-opacity-40"
            : ""
        }`}
      >
        {page}
      </Link>,
    );
  }

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="flex flex-col items-center">
      {/* for larger screens */}
      <div className="join hidden tablet:block">{numberedPageItems}</div>

      {/* for small screens */}
      <div className="join block tablet:hidden">
        {currentPage > 1 && (
          <Link
            href={"?page=" + (currentPage - 1)}
            className="text-md btn join-item"
          >
            «
          </Link>
        )}
        <button className="btn join-item pointer-events-none">
          {currentPage}
        </button>
        {currentPage < totalPages && (
          <Link
            href={"?page=" + (currentPage + 1)}
            className="text-md btn join-item"
          >
            »
          </Link>
        )}
      </div>
    </div>
  );
};

export default PaginationBar;
