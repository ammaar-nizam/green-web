import React from "react";
import Notifications from "../notifications";
import { complaints, notifications } from "../../data/dummy-data";

const PublicDashboard = () => {
  return (
    <div className="text-center">
      <div className="d-flex">
        <div className="col-12 col-md-8 px-3">
          <div className="row d-md-none">
            <Notifications notifications={notifications} />
          </div>
          <div className="row pt-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Recent Complaints</h5>
                {complaints
                  .map((item, index) => (
                    <div className="card mb-2 text-start p-2" key={index}>
                      <div className="d-flex justify-content-between h-100">
                        <div>
                          <p className="mb-0">Institution</p>
                          <p className="mb-0 text-muted">Description</p>
                        </div>
                        <div className="align-middle">
                          <p>Status</p>
                        </div>
                      </div>
                    </div>
                  ))
                  .slice(0, 5)}
              </div>
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

export default PublicDashboard;
