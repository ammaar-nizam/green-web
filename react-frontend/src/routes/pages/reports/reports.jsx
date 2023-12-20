import React from "react";
import { Link } from "react-router-dom";
import userImage from "../../../assets/users.svg";
import listImage from "../../../assets/list.svg";
import useAuthToken from "../../../hooks/useAuthToken";

const Reports = () => {
  const { roleId } = useAuthToken();
  return (
    <div className="">
      <div className="row">
        {roleId == 2 && ( // admin only
          <div className="col-md-3 mt-3 text-center">
            <Link to="/reports/all-user-report" className="">
              <div className="card">
                <div className="d-flex justify-content-center p-3">
                  <img
                    className="card-img-top report-image"
                    src={userImage}
                    alt="users"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">All User Report</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    List of all application users
                  </h6>
                </div>
              </div>
            </Link>
          </div>
        )}

        {roleId == 2 && ( // admin only
          <div className="col-md-3 mt-3 text-center">
            <Link to="/reports/all-complaint-report" className="">
              <div className="card">
                <div className="d-flex justify-content-center p-3">
                  <img
                    className="card-img-top report-image"
                    src={listImage}
                    alt="users"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">All Complaints Report</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    List of all Complaints
                  </h6>
                </div>
              </div>
            </Link>
          </div>
        )}

        {(roleId == 3) && (    // beat officer only
          <div className="col-md-3 mt-3 text-center">
            <Link to="/reports/my-complaint-report" className="">
              <div className="card">
                <div className="d-flex justify-content-center p-3">
                  <img
                    className="card-img-top report-image"
                    src={listImage}
                    alt="users"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">My Complaints Report</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    List of all Complaints assigned to the beat office
                  </h6>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
      <div className="row"></div>
    </div>
  );
};

export default Reports;
