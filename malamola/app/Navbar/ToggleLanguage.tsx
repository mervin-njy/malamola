"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { toggleLanguage } from "../state/language/languageSlice";

const ToggleLanguage = () => {
  // language toggle from redux store
  const language = useSelector((state: RootState) => state.language.current);
  const dispatch = useDispatch();

  // render component ----------------------------------------------------------------------------------------
  return (
    <div>
      <button
        className="btn btn-circle btn-ghost btn-secondary btn-sm hover:bg-secondary hover:text-base-100"
        onClick={() => dispatch(toggleLanguage())}
      >
        {language === "en" && "EN"}
        {language === "zh" && "文"}
      </button>
    </div>
  );
};

export default ToggleLanguage;
