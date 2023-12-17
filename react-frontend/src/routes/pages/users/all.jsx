import React from "react";
import userImage from "../../../assets/user.svg";
import adminImage from "../../../assets/admin.svg";
import beatOfficerImage from "../../../assets/beat-officer.svg";
import { Link } from "react-router-dom";

const AllUsersPage = () => {
  return (
    <div className="">
      <div className="row">
        <div className="col-md-3 mt-3 text-center">
          <Link to="/users/all/public" className="">
            <div className="card">
              <div className="d-flex justify-content-center p-3">
                <img
                  className="card-img-top report-image"
                  src={userImage}
                  alt="users"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Public Users</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  List of all public users
                </h6>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3 mt-3 text-center">
          <Link to="/users/all/beat-officer" className="">
            <div className="card">
              <div className="d-flex justify-content-center p-3">
                <img
                  className="card-img-top report-image"
                  src={beatOfficerImage}
                  alt="beat-officers"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Beat Officers</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  List of all beat officers
                </h6>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3 mt-3 text-center">
          <Link to="/users/all/admin" className="">
            <div className="card">
              <div className="d-flex justify-content-center p-3">
                <img
                  className="card-img-top report-image"
                  src={adminImage}
                  alt="admin"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Admin Users</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  List of all admin users
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

export default AllUsersPage;
