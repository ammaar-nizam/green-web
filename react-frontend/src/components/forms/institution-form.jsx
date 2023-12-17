import React, { useState } from "react";
import useAuthToken from "../../hooks/useAuthToken";
import { ErrorMessage } from "../alert-message";
import { API_URL } from "../../config/config";
import Loader from "../loader";

const InstitutionForm = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const { accessToken } = useAuthToken();
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // validations
    if (!name) {
      // setError("Please enter a name for the institution");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_URL + '/institutions', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: "Bearer " + accessToken,
        },
        body: JSON.stringify({ name }),
      });
      if(response.status == 403) {
        setAuthorized(false)
      }

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again later.");
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Institution created:", data);
        // reload page to update table
        window.location.reload();
      } else {
        console.error("Institution creation failed:", response.statusText);
        setError("Institution creation failed");
        return;
      }
    } catch (error) {
      console.error("Error during creation:", error);
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
  if (!authorized) {
    return <ErrorMessage message="You do not have permissions to create institutions." />;
  }

  return (
    <div>
      {error && (
        <div className="mt-2">
          <ErrorMessage message={error} />
        </div>
      )}
      <form onSubmit={handleSubmit} className="d-flex">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleNameChange}
            id="name"
            placeholder="Institution name"
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Create
        </button>
      </form>
    </div>
  );
};

export default InstitutionForm;
