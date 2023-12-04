import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiUrl = "API ENDPOINT URL";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        
        // Handle successful login, such as updating state or redirecting
        window.location.href = '/dashboard';
        
      } else {
        console.error("Login failed:", response.statusText);
        // Handle login failure, such as displaying an error message
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header d-flex justify-content-center">
                Login
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                      required
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
                      required
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
