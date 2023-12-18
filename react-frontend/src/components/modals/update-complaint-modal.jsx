import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import useAuthToken from "../../hooks/useAuthToken";
import { API_URL } from "../../config/config";
import Loader from "../loader";

const UpdateComplaintModal = ({ show, onHide, onConfirm }) => {
    const { accessToken } = useAuthToken();
    const [beatOffices, setBeatOffices] = useState(null);
    const [beatOfficers, setBeatOfficers] = useState(null);
    const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    status: "",
    beatOfficerId: 0,
    beatOfficeId: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
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

        const beatOffices = await resBeatOffices.json();
        setBeatOffices(beatOffices);

        // get beat officers
        const resBeatOfficers = await fetch(API_URL + "/beat-officers", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Token: "Bearer " + accessToken,
            },
          });
          if (!resBeatOfficers.ok) {
            throw new Error("Failed to fetch data");
          }
  
          const beatOfficers = await resBeatOfficers.json();
          setBeatOfficers(beatOfficers);
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
 
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Update Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form >
            <div className="mb-4">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control"
              >
                <option value="" defaultValue>
                  Select status...
                </option>
                <option value="NEW">NEW</option>
                <option value="IN PROGRESS">IN PROGRESS</option>
                <option value="UNDER INVESTIGATION">UNDER INVESTIGATION</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="beatOffice">Beat Office</label>
              <select
                id="beatOffice"
                name="beatOfficeId"
                value={formData.beatOfficeId}
                onChange={handleChange}
                className="form-control"
              >
                <option value="" defaultValue>
                  Select beat office...
                </option>
                {beatOffices &&
                  beatOffices.map((beatOffice, index) => (
                    <option key={index} value={beatOffice.id}>
                      {beatOffice.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="beatOfficer">Beat Officer</label>
              <select
                id="beatOfficer"
                name="beatOfficerId"
                value={formData.beatOfficerId}
                onChange={handleChange}
                className="form-control"
              >
                <option value="" defaultValue>
                  Select beat officer...
                </option>
                {beatOfficers &&
                  beatOfficers.map((beatOfficer, index) => (
                    <option key={index} value={beatOfficer.id}>
                      {beatOfficer.name}
                    </option>
                  ))}
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => onConfirm(formData)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateComplaintModal;
