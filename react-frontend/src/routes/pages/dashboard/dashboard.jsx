import React from "react";
import AdminDashboard from "../../../components/dashboards/admin-dashboard";
import OfficerDashboard from "../../../components/dashboards/officer-dashboard";
import PublicDashboard from "../../../components/dashboards/public-dashboard";
import { userRole } from "../../../data/dummy-data";

const DashboardPage = () => {
  return (
    <>
      {userRole === 'admin' && <AdminDashboard />}
      {userRole === 'officer' && <OfficerDashboard />}
      {userRole === 'public' && <PublicDashboard />}
    </>
  );
};

export default DashboardPage;
