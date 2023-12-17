import React from "react";
import { Link, useLocation } from "react-router-dom";

const OfficerLinks = () => {
  const { pathname } = useLocation();
  const currentURL = window.location.href;
  return (
    <>
      <Link
        to={"/dashboard"}
        className={`nav-item nav-link ${
          pathname === "/dashboard" ? "active" : ""
        }`}
      >
        Dashboard
      </Link>
      <Link
        to={"/complaints/assigned-complaints"}
        className={`nav-item nav-link ${
          pathname === "/complaints/assigned-complaints" ? "active" : ""
        }`}
      >
        Assigned Complaints
      </Link>
      {/* <Link
        to={"/contact"}
        className={`nav-item nav-link ${
          pathname === "/contact" ? "active" : ""
        }`}
      >
        Contact
      </Link> */}
      <Link
        to={"/reports"}
        className={`nav-link ${
          currentURL.includes("/reports") ? "active" : ""
        }`}
      >
        Reports
      </Link>
    </>
  );
};

export default OfficerLinks;
