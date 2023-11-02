import React from "react";

const Footer = () => {
  // render component ----------------------------------------------------------------------------------------
  return (
    <footer className="border-t-2 border-accent border-opacity-10 bg-neutral bg-opacity-30 p-10 text-neutral-content shadow-sm">
      <div className="footer m-auto max-w-7xl">
        <div>
          <span className="footer-title">Services</span>
          <a className="link-hover link">Design</a>
          <a className="link-hover link">Education</a>
          <a className="link-hover link">Marketing</a>
        </div>
        <div>
          <span className="footer-title">About us</span>
          <a className="link-hover link">Contact</a>
          <a className="link-hover link">Enquiries</a>
          <a className="link-hover link">Collaborations</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link-hover link">Terms of use</a>
          <a className="link-hover link">Privacy policy</a>
          <a className="link-hover link">Cookie policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
