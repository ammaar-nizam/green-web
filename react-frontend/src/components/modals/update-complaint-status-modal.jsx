import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const UpdateComplaintStatusModal = ({ show, onHide, onConfirm }) => {
  const [status, setStatus] = useState("");

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Update Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-4">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={handleStatusChange}
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => onConfirm(status)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateComplaintStatusModal;
