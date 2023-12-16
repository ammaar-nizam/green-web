import React from "react";
import { Link, useLocation } from "react-router-dom";

const PublicLinks = () => {
  const { pathname } = useLocation();
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
        to={"/new-complaint"}
        className={`nav-item nav-link ${
          pathname === "/new-complaint" ? "active" : ""
        }`}
      >
        New Complaint
      </Link>
      <Link
        to={"/my-complaints"}
        className={`nav-item nav-link ${
          pathname === "/my-complaints" ? "active" : ""
        }`}
      >
        My Complaints
      </Link>
      <Link
        to={"/contact"}
        className={`nav-item nav-link ${
          pathname === "/contact" ? "active" : ""
        }`}
      >
        Contact
      </Link>
    </>
  );
};

export default PublicLinks;
