import React from "react";
import Notifications from "../notifications";
import DashboardCard from "../dashboard-card";
import { forestStats, notifications, wildLifeStats } from "../../data/dummy-data";

const AdminDashboard = () => {
  return (
    <div className="text-center">
      <div className="d-flex">
        <div className="col-12 col-md-8 px-3">
          <div className="row d-md-none">
            <Notifications notifications={notifications} />
          </div>
          <div className="row pt-2">
            <div className="col-12 col-md-6 px-0 py-2 px-md-3 py-md-0">
              <DashboardCard title="Forest Conservation" data={forestStats} />
            </div>
            <div className="col-12 col-md-6 px-0 py-2 px-md-3 py-md-0">
              <DashboardCard
                title="Wild Life Conservation"
                data={wildLifeStats}
              />
            </div>
          </div>
          <div className="row px-md-3"></div>
        </div>
        <div className="col-4 d-none d-md-block p-2">
          <Notifications notifications={notifications} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
