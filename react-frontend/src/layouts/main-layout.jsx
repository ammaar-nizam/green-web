import React from "react";
import Navbar from "../components/navbar";
import PublicTabs from "../components/tabs/public-tabs";
import { Outlet } from "react-router-dom";
import AdminTabs from "../components/tabs/admin-tabs";

const MainLayout = () => {
  const userRole = "public";
  // const userRole = 'admin'
  // const userRole = 'officer'

  return (
    <div>
      <header className="">
        <Navbar />
        {userRole === "public" && <PublicTabs />}
        {userRole === "admin" && <AdminTabs />}
        {userRole === "officer" && <PublicTabs />}
      </header>
      <main className="px-5">
        <div className="mt-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
