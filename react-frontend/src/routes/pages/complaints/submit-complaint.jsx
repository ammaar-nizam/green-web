import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ErrorMessage,
  SuccessMessage,
} from "../../../components/alert-message";
import { API_URL } from "../../../config/config";
import useAuthToken from "../../../hooks/useAuthToken";
import Loader from "../../../components/loader";

const SubmitComplaintPage = () => {
  const { accessToken } = useAuthToken();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    institutionId: "",
    divisionId: "",
    branchId: "",
    beatOfficeId: "",
    description: "",
    location: "",
    evidence: null,
  });
  const [loading, setLoading] = useState(false);
  const [beatOffices, setBeatOffices] = useState(null);
  const [branches, setBranches] = useState(null);
  const [divisions, setDivisions] = useState(null);
  const [institutions, setInstitutions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // get branches
        const resBranch = await fetch(API_URL + "/branches", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token: "Bearer " + accessToken,
          },
        });
        if (!resBranch.ok) {
          throw new Error("Failed to fetch data");
        }

        const branchesJSON = await resBranch.json();
        setBranches(branchesJSON);

        // get divisions
        const resDivisions = await fetch(API_URL + "/divisions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token: "Bearer " + accessToken,
          },
        });
        if (!resDivisions.ok) {
          throw new Error("Failed to fetch data");
        }

        const divisionsJSON = await resDivisions.json();
        setDivisions(divisionsJSON);

        // get institutions
        const resInstitutions = await fetch(API_URL + "/institutions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token: "Bearer " + accessToken,
          },
        });
        if (!resInstitutions.ok) {
          throw new Error("Failed to fetch data");
        }

        const institutionsJSON = await resInstitutions.json();
        setInstitutions(institutionsJSON);

        // get beat offices
        const resBeatOffices = await fetch(API_URL + "/beat-offices", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token: "Bearer " + accessToken,
          },
        });
        if (!resBeatOffices.ok) {
          throw new Error("Failed to fetch data");
        }

        const beatOfficesJSON = await resBeatOffices.json();
        setBeatOffices(beatOfficesJSON);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({ ...formData, evidence: imageFile });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

    if (formData.institutionId === "" || formData.institutionId === "selection") {
      setError("Please select an institution.");
      return;
    } else if (formData.divisionId === "" || formData.divisionId === "selection") {
      setError("Please select a division.");
      return;
    } else if (formData.branchId === "" || formData.branchId == "selection") {
      setError("Please select branch.");
      return;
    } else if (formData.beatOfficeId === "" || formData.beatOfficeId == "selection") {
      setError("Please select a beat office.");
      return;
    } else if (formData.description === "") {
      setError("Please enter the incident.");
      return;
    } else if (formData.location === "") {
      setError("Please add location of incident.");
      return;
    } else {
      setError(null);
    }

    try {
      setLoading(true);
      const response = await fetch(API_URL + "/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: "Bearer " + accessToken,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        console.log(response);
        // throw new Error("Something went wrong. Please try again later.");
      }

      if (response.ok) {
        const data = await response.json();
        setSuccess("Complaint submitted submitted.");

        setTimeout(() => {
          window.location.href = "/complaints/my-complaints";
        }, 2000);
      } else {
        console.error("Complaint submission failed:", response.statusText);
        setError("Something went wrong. Please try again later.");
        return;
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error submitting form:", error);
    }  finally {
      setFormData({
        institutionId: "",
        divisionId: "",
        branchId: "",
        beatOfficeId: "",
        description: "",
        location: "",
        evidence: null,
      })
      setError(null);
      setLoading(false);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setCurrentLocation(googleMapsLink);
          setFormData({ ...formData, location: googleMapsLink });
        },
        (error) => {
          console.error(error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported by this browser.");
    }
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
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
      <form className="user_booking" onSubmit={handleSubmit}>
        <div className="row  pt-3">
          <div className="col-12">
            <h4 className="text-center">Submit Complaint</h4>
          </div>
        </div>
        <div className="row  pt-3">
          <div className="col-6">
            <label htmlFor="institution" className="submit-complain-label">
              Institution :
            </label>
            <select
              className="form-control"
              name="institutionId"
              id="institution"
              value={formData.institutionId}
              onChange={handleChange}
              required
            >
              <option value="selection" defaultValue>
                --Select Institution--
              </option>
              {institutions &&
                institutions.map((institution, index) => (
                  <option key={index} value={institution.id}>
                    {institution.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="division" className="submit-complain-label">
              Division :
            </label>
            <select
              className="form-control"
              name="divisionId"
              id="division"
              value={formData.divisionId}
              onChange={handleChange}
              required
            >
              <option value="selection">--Select Division--</option>
              {divisions &&
                divisions.map((division, index) => (
                  <option key={index} value={division.id}>
                    {division.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="row  pt-3">
          <div className="col-md-6">
            <label htmlFor="branch" className="submit-complain-label">
              Branch :
            </label>
            <select
              className="form-control"
              name="branchId"
              id="branch"
              value={formData.branchId}
              onChange={handleChange}
              required
            >
              <option value="selection">--Select Branch--</option>
              {branches &&
                branches.map((branch, index) => (
                  <option key={index} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="office" className="submit-complain-label">
              Beat Office :
            </label>
            <select
              className="form-control"
              name="beatOfficeId"
              id="office"
              value={formData.beatOfficeId}
              onChange={handleChange}
              required
            >
              <option value="selection">--Select Beat Office--</option>
              {beatOffices &&
                beatOffices.map((beatOffice, index) => (
                  <option key={index} value={beatOffice.id}>
                    {beatOffice.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="row  pt-3">
          <div className="col-12">
            <label htmlFor="incident" className="submit-complain-label">
              Incident :
            </label>
            <textarea
              className="form-control pt-3"
              id="incident"
              name="description"
              rows="4"
              placeholder="Brief description of the incident..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12">
            <label htmlFor="image" className="submit-complain-label">
              Upload Image:
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              id="image"
              name="evidence"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="row  pt-3">
          <div className="col-12">
            <label htmlFor="location" className="submit-complain-label mr-5">
              Location :{" "}
            </label>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleGetLocation}
            >
              Get Current Location
            </button>
            {currentLocation && (
              <div className="pt-3">
                <input
                  name="location"
                  type="text"
                  id="googleMapsLink"
                  value={currentLocation}
                  readOnly
                  className="form-control"
                  required
                />
              </div>
            )}
          </div>
        </div>
        <div className="row  pt-3">
          <div className="col-12 text-center">
            <input type="submit" className="btn btn-success" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SubmitComplaintPage;
