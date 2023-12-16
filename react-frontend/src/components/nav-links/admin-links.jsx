import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminLinks = () => {
  const { pathname } = useLocation();
  const currentURL = window.location.href;
  return (
    <>
      <Link
        to={"/dashboard"}
        className={`nav-link ${pathname === "/dashboard" ? "active" : ""}`}
      >
        Dashboard
      </Link>
      <Link
        to={"/all-complaints"}
        className={`nav-link ${pathname === "/all-complaints" ? "active" : ""}`}
      >
        All Complaints
      </Link>
      <Link
        to={"/users"}
        className={`nav-link ${
          currentURL.includes("/users") ? "active" : ""
        }`}
      >
        Users
      </Link>
      <Link
        to={"/contact"}
        className={`nav-link ${pathname === "/contact" ? "active" : ""}`}
      >
        Contact
      </Link>
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

export default AdminLinks;
