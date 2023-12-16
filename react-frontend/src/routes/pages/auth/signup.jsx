import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ErrorMessage,
  SuccessMessage,
} from "../../../components/alert-message";
import { API_URL } from "../../../config/config";
import Loader from "../../../components/loader";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // validation
    if (!formData.name) {
      setError("Please enter name");
      return;
    } else if (!formData.username) {
      setError("Please enter a user name");
      return;
    } else if (!formData.nic) {
      setError("Please enter NIC number");
      return;
    } else if (!formData.email) {
      setError("Please enter email address");
      return;
    } else if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let isValid = emailRegex.test(formData.email);
      if (!isValid) {
        setError("Please enter a valid email address");
        return;
      }
    }
    if (!formData.mobile) {
      setError("Please enter mobile number");
      return;
    } else if (!formData.password) {
      setError("Please enter a password");
      return;
    } else if (!formData.confirmPassword) {
      setError("Please confirm your password");
      return;
    } else if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm password does not match");
      return;
    }

    try {
      const formDataWithoutPWConfirmation = { ...formData };
      delete formDataWithoutPWConfirmation.confirmPassword;

      const response = await fetch(API_URL + "/registrations/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithoutPWConfirmation),
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("Something went wrong. Please try again later.");
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);

        setSuccess('Registration successful. You will be redirected to the login page.')
        
        // redirect to dashboard on successful registration after 2s
        setTimeout(function() {          
          window.location.href = "/";
        }, 2000)
      } else {
        console.error("Registration failed:", response.statusText);
        setError("Something went wrong. Please try again later.");
        return;
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error);
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
            {success && (
              <div className="mt-2">
                <SuccessMessage message={success} />
              </div>
            )}
            <div className="card">
              <div className="card-header d-flex justify-content-center">
                Sign-up
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-2">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="nic">NIC Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nic"
                      name="nic"
                      placeholder="Enter your NIC number"
                      value={formData.nic}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                      type="test"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      placeholder="Enter your mobile number"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirm-password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
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
                  <p>
                    Have an account? <Link to="/">Login</Link>
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

export default SignupPage;
