import React, { useState } from 'react';



const SubmitComplaintPage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error(error.message);
          // Handle error
        }
      );
    } else {
      console.error('Geolocation is not supported by this brow  pt-3ser.');
      // Handle no geolocation support
    }
  };

  const getGoogleMapsLink = () => {
    if (currentLocation) {
      const { latitude, longitude } = currentLocation;
      return `https://www.google.com/maps?q=${latitude},${longitude}`;
    }
    return '';
  };

  return (
    <div className="container">
      <form className="user_booking" method="post">
        <div className="row  pt-3 ">
          <div className="col-12">
            <h4 className="text-center">Submit Complaint</h4>
          </div>
        </div>
        <div className="row  pt-3">
          <div className="col-12">
            <label htmlFor="institution" className='submit-complain-label'>Institution :</label>
            <select className="form-control" name="institution" id="institution">
              <option value="wildlife">Wildlife Conservations</option>
              <option value="forest">Forest Conservations</option>
            </select>
          </div>
        </div>
        <div className="row  pt-3">
          <div className="col-md-6">
            <label htmlFor="division" className='submit-complain-label'>Division :</label>
            <select className="form-control" name="division" id="division">
              <option value="Gampaha">Gampaha</option>
              <option value="Anuradhapura">Anuradhapura</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="branch" className='submit-complain-label'>Branch :</label>
            <select className="form-control" name="branch" id="branch">
              <option value="Wattala">Wattala</option>
              <option value="Ja Ela">Ja Ela</option>
            </select>
          </div>
        </div>
        <div className="row  pt-3">
          <div className="col-12">
            <label htmlFor="incident" className='submit-complain-label'>Incident :</label>
            <textarea className="form-control" id="incident" name="incident" row  pt-3s="4" placeholder='Brief description of the incident...'></textarea>
          </div>
        </div>
        <div className="row  pt-3">
          <div className="col-12" >
            <label htmlFor="location" className='pr-3 submit-complain-label' >Location : </label>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleGetLocation} >Get Current Location</button>
            {currentLocation && (
              <div className='pt-3'>
                 <input
                  type="text"
                  id="googleMapsLink"
                  value={getGoogleMapsLink()}
                  readOnly
                  className="form-control"
                />
              </div>
            )}
          </div>
        </div>
        <div className="row  pt-3">
          <div className="col-12 text-center" >
            <input type="submit" className="btn btn-success" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SubmitComplaintPage;
