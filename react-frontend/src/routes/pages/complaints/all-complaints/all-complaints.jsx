import React, { useEffect, useState } from "react";
import useAuthToken from "../../../../hooks/useAuthToken";
import {
  ErrorMessage,
  InfoMessage,
  SuccessMessage,
} from "../../../../components/alert-message";
import Loader from "../../../../components/loader";
import { API_URL } from "../../../../config/config";
import { dateFormat } from "../../../../utils/utils";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import UpdateComplaintModal from "../../../../components/modals/update-complaint-modal";

const AllComplaints = () => {
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuthToken();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [complaintId, setComplaintId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL + "/complaints", {
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
    setComplaintId(id);
    setShowModal(true);
  };

  const handleConfirm = async (formData) => {
    console.log("Action confirmed!");
    console.log(formData);
    try {
      setLoading(true);

      const response = await fetch(API_URL + "/complaints/" + complaintId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Token: "Bearer " + accessToken,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setSuccess("Complaint updated successfully");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setShowModal(false);
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // extract all keys for the table headers
  let allKeys = null;
  if (data && data.length > 0) {
    // all keys except for "Category"
    allKeys = Array.from(
      new Set(data.flatMap((complaint) => Object.keys(complaint)))
    ).filter(
      (key) =>
        ![
          "adminId",
          // "beatOfficeId",
          "beatOfficerId",
          "publicUserId",
          "evidence",
          "createdAt",
          "updatedAt",
        ].includes(key)
    );
    // .filter((key) => key !== "category");
  } else {
    return <InfoMessage message="No complaints found!" />;
  }

  return (
    <div>
      <UpdateComplaintModal
        show={showModal}
        onHide={handleModalClose}
        onConfirm={handleConfirm}
      />
      {error && <ErrorMessage message={error} />}
      {success && (
        <div className="mt-2">
          <SuccessMessage message={success} />
        </div>
      )}
      <div className="d-md-flex justify-content-between">
        <h2 className="">All Complaints</h2>
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
                Date Complained
              </th>
              <th scope="col" className="text-uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((complaint, index) => (
              <tr key={index}>
                <th scope="row">{complaint.id}</th>
                <td>{complaint.description ?? "N/A"}</td>
                <td>{complaint.location ? (<a className="link-primary link-underline link-underline-opacity-0" href={complaint.location} target="_blank">View Location</a>) : 'N/A'}</td>
                <td>{complaint.status ?? "N/A"}</td>
                <td>{complaint.beatOfficeId ?? "N/A"}</td>
                <td>{dateFormat(complaint.createdAt) ?? "N/A"}</td>
                <td>
                  <button
                    onClick={() => handleEdit(complaint.id)}
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

export default AllComplaints;
