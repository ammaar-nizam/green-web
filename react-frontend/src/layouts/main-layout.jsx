import React from "react";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <header className="">
        <Navbar />
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
