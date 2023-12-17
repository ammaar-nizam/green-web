import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../../../components/alert-message";
import { API_URL } from "../../../config/config";
import Loader from "../../../components/loader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const roleOptions = [
    { value: "publicUser", label: "Public User" },
    { value: "beatOfficer", label: "Beat Officer" },
    { value: "admin", label: "Admin User" },
  ];

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setUserRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // validations
    if (!userRole) {
      setError("Please select the user role");
      return;
    }
    if (!email) {
      setError("Please enter the email address");
      return;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let isValid = emailRegex.test(email);
      if (!isValid) {
        setError("Please enter a valid email address");
        return;
      }
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    // change endpoint url according to the user role
    let endpoint = "";
    if (userRole == "publicUser") {
      endpoint = API_URL + "/registrations/login";
    } else if (userRole == "beatOfficer") {
      endpoint = API_URL + "/beat-officers/login";
    } else if (userRole == "admin" || userRole == "superAdmin") {
      endpoint = API_URL + "/admins/login";
    }

    try {
      setLoading(true);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again later.");
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);

        // store token in session storage
        localStorage.setItem('accessToken', data.accessToken);

        // redirect to dashboard on successful login
        window.location.href = "/dashboard";
      } else {
        console.error("Login failed:", response.statusText);
        // Handle login failure, such as displaying an error message
        setError("User not found. Please check credentials and try again.");
        return;
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message);
      return;
    } finally {
      setError(null);
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            {error && (
              <div className="mt-2">
                <ErrorMessage message={error} />
              </div>
            )}
            <div className="card">
              <div className="card-header d-flex justify-content-center">
                Login
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-2">
                    <label htmlFor="user-role">User Role</label>
                    <select
                      id="user-role"
                      value={userRole}
                      onChange={handleRoleChange}
                      className="form-control"
                    >
                      <option value="" defaultValue>
                        Select user role...
                      </option>
                      {roleOptions.map((role, index) => (
                        <option key={index} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary mt-3 w-100"
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div className="mt-4 d-flex justify-content-center text-muted">
                  <p>
                    Don't have an account? <Link to="/sign-up">Sign-up</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;