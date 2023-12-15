import React, { useState } from "react";
import axios from "axios";
import { ErrorMessage } from "../../../components/alert-message";

const SubmitComplaintPage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    institution: "",
    division: "",
    branch: "",
    office:"",
    incident: "",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({ ...formData, image: imageFile });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.institution === '' || formData.institution === 'selection')
    {
      setError("Please select an institution.");
      return;
    }
    
    else if (formData.division === '' || formData.division === 'selection')
    {
      setError("Please select a division.");
      return;
    }
    else if (formData.branch === '' || formData.branch == 'selection')
    {
      setError("Please select branch.");
      return;
    }
    else if (formData.office === '' || formData.office == 'selection')
    {
      setError("Please select a beat office office.");
      return;
    }
     else if (formData.location === "") {
      setError("Please add location of incident.");
      return;
    } 
    else {
      setError(null);
    }

    console.log(formData);

    try {
      // const formDataToSend = new FormData();
      // formDataToSend.append("institution", formData.institution);
      // formDataToSend.append("division", formData.division);
      // formDataToSend.append("branch", formData.branch);
      // formDataToSend.append("office", formData.office);
      // formDataToSend.append("incident", formData.incident);
      // formDataToSend.append("location", formData.location);
      // formDataToSend.append("image", formData.image); 

      // const response = await axios.post("YOUR_API_ENDPOINT", formDataToSend);
      // console.log("Form submitted successfully!", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error submitting form:", error);
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
      // Handle no geolocation support
    }
  };

  return (
    <div className="container">
      {error && <ErrorMessage message={error} />}
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
              name="institution"
              id="institution"
              value={formData.institution}
              onChange={handleChange}
              required
            >
              <option value="selection">--Select Institution--</option>
              <option value="wildlife">Wildlife Conservations</option>
              <option value="forest">Forest Conservations</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="division" className="submit-complain-label">
              Division :
            </label>
            <select
              className="form-control"
              name="division"
              id="division"
              value={formData.division}
              onChange={handleChange}
              required
            >
              <option value="selection">--Select Division--</option>
              <option value="Gampaha">Gampaha</option>
              <option value="Anuradhapura">Anuradhapura</option>
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
              name="branch"
              id="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            >
              <option value="selection">--Select Branch--</option>
              <option value="Wattala">Wattala</option>
              <option value="Ja Ela">Ja Ela</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="office" className="submit-complain-label">
              Beat Office :
            </label>
            <select
              className="form-control"
              name="office"
              id="office"
              value={formData.office}
              onChange={handleChange}
              required
            >
              <option value="selection">--Select Beat Office--</option>
              <option value="Wattala">Yala Wildlife BO</option>
              <option value="Ja Ela">Monaragala Forest BO</option>
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
              name="incident"
              rows="4"
              placeholder="Brief description of the incident..."
              value={formData.incident}
              onChange={handleChange}
              required
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
            name="image"
            onChange={handleImageChange}
            required
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
