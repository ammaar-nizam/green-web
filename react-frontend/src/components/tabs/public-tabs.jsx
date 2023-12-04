import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const PublicTabs = () => {
    const { pathname } = useLocation();

  return (
    <nav className="nav nav-pills nav-fill px-5">
        <Link to={'/dashboard'} className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}>
            Dashboard
        </Link>
        <Link to={'/new-complaint'} className={`nav-link ${pathname === '/new-complaint' ? 'active' : ''}`}>
            New Complaint
        </Link>
        <Link to={'/my-complaints'} className={`nav-link ${pathname === '/my-complaints' ? 'active' : ''}`}>
            My Complaints
        </Link>
        <Link to={'/contact'} className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}>
            Contact
        </Link>
    </nav>
  );
};

export default PublicTabs;
