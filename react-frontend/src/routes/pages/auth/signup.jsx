import React from 'react'
import { Link } from 'react-router-dom'

const SignupPage = () => {
  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header d-flex justify-content-center">Sign-up</div>
              <div className="card-body">
                <form>
                  <div className="form-group mb-2">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirm-password"
                      placeholder="Confirm your password"
                    />
                  </div>

                  <div className="form-group mb-2">
                    <button
                      type="submit"
                      className="btn btn-primary mt-3 w-100"
                    >
                      Sign-up
                    </button>
                  </div>
                </form>
                <div className="mt-4 d-flex justify-content-center text-muted">
                  <p>Have an account? <Link to='/'>Login</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage