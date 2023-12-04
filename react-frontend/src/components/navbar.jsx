import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar sticky-top navbar-light bg-light px-5">
      <div className="container-fluid">
        <Link to='/dashboard' className="navbar-brand">Green Web</Link>
        <div className="text-muted">
            Log out
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
