import React, { useState } from 'react'
import { ErrorMessage, SuccessMessage } from '../../../../components/alert-message'
import { API_URL } from '../../../../config/config';
import Loader from '../../../../components/loader';
import useAuthToken from '../../../../hooks/useAuthToken';

const CreateAdminUserPage = () => {
  const { accessToken } = useAuthToken();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
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
    
    // validation
    if (!formData.name) {
      setError("Please enter name");
      return;
    } else if (!formData.username) {
      setError("Please enter a user name");
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
    if (!formData.password) {
      setError("Please enter a password");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(API_URL + "/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: "Bearer " + accessToken,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("Something went wrong. Please try again later.");
      }

      if (response.ok) {
        const data = await response.json();
        setSuccess('User creation successful.')
      } else {
        console.error("Registration failed:", response.statusText);
        setError("Something went wrong. Please try again later.");
        return;
      }
    } catch (error) {
      console.error("Error during user creation:", error);
      setError("Error occurred. Please try again later");
      return;
    } finally {
      setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
      })
      setError(null);
      setLoading(false);
    }
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="container mt-5">
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
        <div className='w-100'>
          <h4>Create Admin User</h4>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="row">
            <div className="col-md-6 mb-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter public users name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter public users username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">

            <div className="col-md-6 mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter public users email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter public users password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group mb-2 w-100 text-center">
            <button type="submit" className="btn btn-success mt-3">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateAdminUserPage