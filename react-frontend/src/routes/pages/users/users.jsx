import React from 'react'
import { Link } from 'react-router-dom'
import userImage from "../../../assets/users.svg";
import addUserImage from "../../../assets/add-user.svg"

const UsersPage = () => {
  return (
    <div className="">
      <div className="row">
        <div className="col-md-3 mt-3 text-center">
          <Link to="/users/all" className="">
            <div className="card">
              <div className="d-flex justify-content-center p-3">
                <img
                  className="card-img-top report-image"
                  src={userImage}
                  alt="users"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">View Users</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  List of all application users
                </h6>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3 mt-3 text-center">
          <Link to="/users/create" className="">
            <div className="card">
              <div className="d-flex justify-content-center p-3">
                <img
                  className="card-img-top report-image"
                  src={addUserImage}
                  alt="users"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Create Users</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Create all type of users.
                </h6>
              </div>
            </div>
          </Link>
        </div>

      </div>
      <div className="row"></div>
    </div>
  )
}

export default UsersPage