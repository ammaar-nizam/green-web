import React from "react";
import AdminDashboard from "../../../components/dashboards/admin-dashboard";
import OfficerDashboard from "../../../components/dashboards/officer-dashboard";
import PublicDashboard from "../../../components/dashboards/public-dashboard";
import useAuthToken from "../../../hooks/useAuthToken";

const DashboardPage = () => {
  const { roleId } = useAuthToken();
  return (
    <>
      {roleId == 1 && <PublicDashboard />}
      {roleId == 2 && <AdminDashboard />}
      {roleId == 3 && <OfficerDashboard />}
    </>
  );
};

export default DashboardPage;
