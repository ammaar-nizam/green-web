import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const OfficerTabs = () => {
    const { pathname } = useLocation();

  return (
    <nav className="nav nav-pills nav-fill px-5">
        <Link to={'/dashboard'} className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}>
            Dashboard
        </Link>
        <Link to={'/all-complaints'} className={`nav-link ${pathname === '/all-complaints' ? 'active' : ''}`}>
            All Complaints
        </Link>
        <Link to={'/users'} className={`nav-link ${pathname === '/users' ? 'active' : ''}`}>
            Users
        </Link>
        <Link to={'/contact'} className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}>
            Contact
        </Link>
        <Link to={'/reports'} className={`nav-link ${pathname === '/reports' ? 'active' : ''}`}>
            Reports
        </Link>
    </nav>
  );
};

export default OfficerTabs;
