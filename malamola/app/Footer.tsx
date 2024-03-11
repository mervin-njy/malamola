import React from "react";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  // render component ----------------------------------------------------------------------------------------
  return (
    <footer className="border-t-2 border-accent border-opacity-10 bg-neutral bg-opacity-30 p-10 text-neutral-content shadow-sm">
      <div className="m-auto max-w-7xl">
        {/* Link to affiliated sites */}
        <div className="flex gap-2">
          <a
            className="link-hover link text-secondary hover:text-accent"
            href="https://instagram.com/fillyflower_crafts/"
          >
            <AiFillInstagram size={30} />
          </a>

          {/* TO BE IMPLEMENTED */}
          <a className="link-hover link text-secondary hover:text-accent">
            <AiFillYoutube size={30} />
          </a>
        </div>

        <div className="divider" />

        {/* Link to developer */}
        <div>
          <span className="text-xs italic">
            Designed and built by{" "}
            <a
              className="link-hover link font-semibold text-secondary"
              href="https://github.com/mervin-njy"
            >
              mervin-njy.
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
