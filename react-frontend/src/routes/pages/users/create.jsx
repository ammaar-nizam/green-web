import React from 'react'
import { Link } from 'react-router-dom'
import addUserImage from "../../../assets/add-user.svg"

const CreateUserPage = () => {
  return (
    <div className="">
      <div className="row">
        <div className="col-md-3 mt-3 text-center">
          <Link to="/users/create/public" className="">
            <div className="card">
              <div className="d-flex justify-content-center p-3">
                <img
                  className="card-img-top report-image"
                  src={addUserImage}
                  alt="users"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Create Public Users</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Create public users.
                </h6>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3 mt-3 text-center">
          <Link to="/users/create/beat-officer" className="">
            <div className="card">
              <div className="d-flex justify-content-center p-3">
                <img
                  className="card-img-top report-image"
                  src={addUserImage}
                  alt="users"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Create Beat Officers</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Create beat officer users.
                </h6>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3 mt-3 text-center">
          <Link to="/users/create/admin" className="">
            <div className="card">
              <div className="d-flex justify-content-center p-3">
                <img
                  className="card-img-top report-image"
                  src={addUserImage}
                  alt="users"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Create Admin Users</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Create admin users.
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

export default CreateUserPage