import React, { useEffect, useState } from "react";
import useAuthToken from "../../../hooks/useAuthToken";
import Loader from "../../../components/loader";
import {
  ErrorMessage,
  SuccessMessage,
} from "../../../components/alert-message";
import { API_URL } from "../../../config/config";
import { useParams } from "react-router-dom";

const UpdateInvestigation = () => {
  const { id } = useParams();
  const { accessToken } = useAuthToken();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [complaints, setComplaints] = useState(null);
  const [investigation, setInvestigation] = useState(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    complaintId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // get complaints
        const response = await fetch(API_URL + "/complaints", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token: "Bearer " + accessToken,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const complaints = await response.json();
        setComplaints(complaints);

        // get investigation
        const resInvestigation = await fetch(
          API_URL + "/investigations/" + id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Token: "Bearer " + accessToken,
            },
          }
        );
        if (!resInvestigation.ok) {
          throw new Error("Failed to fetch data");
        }

        const investigation = await resInvestigation.json();
        setInvestigation(investigation);
        // set initial data
        formData.complaintId = investigation.complaintId;
        formData.description = investigation.description;
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // validation
    if (formData.complaintId == "") {
      setError("Please select complaint");
      return;
    } else if (formData.description == "") {
      setError("Please enter description");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_URL + "/investigations/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Token: "Bearer " + accessToken,
        },
        // FIXME: 403 forbidden error
        body: JSON.stringify({
          description: formData.description,
          evidence: file
        }),
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("Something went wrong. Please try again later.");
      }

      if (response.ok) {
        const data = await response.json();
        setSuccess("Investigation created successfully.");

        setTimeout(() => {
          window.location.href = "/investigations";
        }, 2000);
      } else {
        console.error("Investigation creation failed:", response.statusText);
        setError("Something went wrong. Please try again later.");
        return;
      }
    } catch (error) {
      console.error("Error during investigation creation:", error);
      setError("Error occurred. Please try again later");
      return;
    } finally {
      setFormData({
        description: "",
        complaintId: "",
      });
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
        <div className="w-100">
          <h4>Update an Investigation</h4>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 col-md-12">
          <div className="col">
            <div className="mb-4">
              <label htmlFor="complaint">Complaint</label>
              <select
                id="complaint"
                name="complaintId"
                value={formData.complaintId}
                onChange={handleChange}
                className="form-control"
              >
                <option value="" defaultValue>
                  Select complaint...
                </option>
                {complaints &&
                  complaints.map((complaint, index) => (
                    <option key={index} value={complaint.id}>
                      {complaint.description}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="description">Description</label>
              <textarea
                rows="5"
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="evidence">Upload evidence</label>
              <input
                type="file"
                className="form-control"
                id="evidence"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="form-group mb-2 w-100 text-center">
            <button type="submit" className="btn btn-success mt-3">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateInvestigation;
