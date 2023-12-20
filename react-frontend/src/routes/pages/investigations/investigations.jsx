import React, { useEffect, useState } from "react";
import useAuthToken from "../../../hooks/useAuthToken";
import { InfoMessage } from "../../../components/alert-message";
import { API_URL } from "../../../config/config";
import Loader from "../../../components/loader";
import { dateFormat } from "../../../utils/utils";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const InvestigationsPage = () => {
  const { accessToken } = useAuthToken();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [investigationId, setInvestigationId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL + "/investigations", {
          headers: {
            Token: "Bearer " + accessToken,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data. Please try again");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  // function to handle edit admin users
  const handleEdit = (id) => {
    setInvestigationId(id);
    window.location.href = '/investigations/update/' + id
  };


  // extract all keys for the table headers
  let allKeys = null;
  if (data && data.length > 0) {
    // all keys except for
    allKeys = Array.from(
      new Set(data.flatMap((investigation) => Object.keys(investigation)))
    ).filter((key) => !["evidence", "updatedAt"].includes(key));
  } else {
    return <InfoMessage message="No investigations found!" />;
  }

  return (
    <div>
      {error && <ErrorMessage message={error} />}
      <div className="d-md-flex justify-content-between">
        <h2 className="">Investigations</h2>
        <Link to="/investigations/create" className="btn btn-dark">
          Create
        </Link>
      </div>
      <div className="mt-5">
        <table className="table">
          <thead>
            <tr>
              {allKeys.map((item, index) => (
                <th key={index} scope="col" className="text-uppercase">
                  {item}
                </th>
              ))}
              <th scope="col" className="text-uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((investigation, index) => (
              <tr key={index}>
                <th scope="row">{investigation.id}</th>
                <td>{investigation.complaintId ?? "N/A"}</td>
                <td>{investigation.description ?? "N/A"}</td>
                <td>{dateFormat(investigation.createdAt) ?? "N/A"}</td>
                <td>
                  <button
                    onClick={() => handleEdit(investigation.id)}
                    className="btn"
                  >
                    <FaRegEdit className="mb-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestigationsPage;
