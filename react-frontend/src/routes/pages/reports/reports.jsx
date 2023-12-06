import React from "react";
import { Link } from "react-router-dom";
import userImage from "../../../assets/users.svg";
import listImage from "../../../assets/list.svg";

const Reports = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 text-center">
          <Link to="/reports/all-user-report" className="">
            <div className="card">
              <div className="d-flex justify-content-center">
                <img
                  className="card-img-top w-50 h-50"
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

        <div className="col-md-4 text-center">
          <Link to="/reports/all-complaint-report" className="">
            <div className="card">
              <div className="d-flex justify-content-center">
                <img
                  className="card-img-top w-50 h-50"
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

      </div>
      <div className="row"></div>
    </div>
  );
};

export default Reports;
