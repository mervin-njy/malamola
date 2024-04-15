"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { toggleLanguage } from "../state/language/languageSlice";
import { MdOutlineLanguage } from "react-icons/md";
import Flag from "react-flagkit";

const ToggleLanguage = () => {
  // language toggle from redux store
  const language = useSelector((state: RootState) => state.language.current);
  const dispatch = useDispatch();

  // render component ----------------------------------------------------------------------------------------
  return (
    <div>
      <button
        className="btn btn-ghost btn-secondary btn-sm flex flex-row items-center justify-between rounded-2xl hover:border-secondary hover:bg-base-100"
        onClick={() => dispatch(toggleLanguage())}
      >
        <MdOutlineLanguage className="text-sm tablet:text-xl"/> <span className="text-xl">|</span>
        <Flag
          className="shadow-md"
          country={language === "en" ? "SG" : "TW"}
          size={19}
        />
      </button>
    </div>
  );
};

export default ToggleLanguage;
