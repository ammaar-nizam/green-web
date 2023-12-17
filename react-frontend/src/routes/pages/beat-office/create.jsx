import React, { useEffect, useState } from "react";
import Loader from "../../../components/loader";
import useAuthToken from "../../../hooks/useAuthToken";
import {
  ErrorMessage,
  SuccessMessage,
} from "../../../components/alert-message";
import { API_URL } from "../../../config/config";

const CreateBeatOffice = () => {
  const { accessToken } = useAuthToken();
  const [formData, setFormData] = useState({
    name: "",
    branchId: 0,
    divisionId: 0,
    institutionId: 0,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState(null);
  const [divisions, setDivisions] = useState(null);
  const [institutions, setInstitutions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // get branches
        const resBranch = await fetch(API_URL + "/beat-offices", {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    // validation
    if (!formData.name) {
      setError("Please enter name");
      return;
    } else if (formData.branchId == "") {
      setError("Please select branch");
      return;
    } else if (formData.divisionId == "") {
      setError("Please select division");
      return;
    } else if (formData.institutionId == "") {
      setError("Please select institution");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_URL + "/beat-offices", {
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
        setSuccess("Beat office created successfully.");

        setTimeout(() => {
          window.location.href = "/beat-offices";
        }, 2000);
      } else {
        console.error("Beat office creation failed:", response.statusText);
        setError("Something went wrong. Please try again later.");
        return;
      }
    } catch (error) {
      console.error("Error during beat office creation:", error);
      setError("Error occurred. Please try again later");
      return;
    } finally {
      setFormData({
        name: "",
        branchId: "",
        divisionId: "",
        institutionId: "",
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
          <h4>Create Beat Office</h4>
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
              <label htmlFor="branch">Branch</label>
              <select
                id="branch"
                name="branchId"
                value={formData.branchId}
                onChange={handleChange}
                className="form-control"
              >
                <option value="" defaultValue>
                  Select branch...
                </option>
                {branches &&
                  branches.map((branch, index) => (
                    <option key={index} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="division">Division</label>
              <select
                id="division"
                name="divisionId"
                value={formData.divisionId}
                onChange={handleChange}
                className="form-control"
              >
                <option value="" defaultValue>
                  Select division...
                </option>
                {divisions &&
                  divisions.map((division, index) => (
                    <option key={index} value={division.id}>
                      {division.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="institution">Institution</label>
              <select
                id="institution"
                name="institutionId"
                value={formData.institutionId}
                onChange={handleChange}
                className="form-control"
              >
                <option value="" defaultValue>
                  Select institution...
                </option>
                {institutions &&
                  institutions.map((institution, index) => (
                    <option key={index} value={institution.id}>
                      {institution.name}
                    </option>
                  ))}
              </select>
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
  );
};

export default CreateBeatOffice;
