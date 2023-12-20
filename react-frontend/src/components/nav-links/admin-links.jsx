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
        to={"/complaints/all-complaints"}
        className={`nav-link ${pathname === "/complaints/all-complaints" ? "active" : ""}`}
      >
        All Complaints
      </Link>
      <Link
        to={"/investigations"}
        className={`nav-link ${
          currentURL.includes("/investigations") ? "active" : ""
        }`}
      >
        Investigations
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
        to={"/institutions"}
        className={`nav-link ${
          currentURL.includes("/institutions") ? "active" : ""
        }`}
      >
        Institutions
      </Link>
      <Link
        to={"/divisions"}
        className={`nav-link ${
          currentURL.includes("/divisions") ? "active" : ""
        }`}
      >
        Divisions
      </Link>
      <Link
        to={"/branches"}
        className={`nav-link ${
          currentURL.includes("/branches") ? "active" : ""
        }`}
      >
        Branches
      </Link>
      <Link
        to={"/beat-offices"}
        className={`nav-link ${
          currentURL.includes("/beat-offices") ? "active" : ""
        }`}
      >
        Beat Offices
      </Link>
      {/* <Link
        to={"/contact"}
        className={`nav-link ${pathname === "/contact" ? "active" : ""}`}
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

export default AdminLinks;
