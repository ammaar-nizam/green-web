import React from "react";
import { Link } from "react-router-dom";
import PublicLinks from "./nav-links/public-links";
import AdminLinks from "./nav-links/admin-links";
import { userRole } from "../data/dummy-data";
import OfficerLinks from "./nav-links/officer-links";
import useAuthToken from "../hooks/useAuthToken";

const Navbar = () => {
  const { roleId } = useAuthToken();
  return (
    <nav className="navbar navbar-expand-md sticky-top navbar-light bg-light px-5">
      <Link to="/dashboard" className="navbar-brand">
        Green Web
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {roleId === 1 && <PublicLinks />}
          {roleId === 2 && <AdminLinks />}
          {roleId === 3 && <OfficerLinks />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
