import React from 'react';
import './submit-complaint.css'; // Import the CSS file

const SubmitComplaintPage = () => {
  return (
    <div>
      <form className="user_booking" method="post">
        <table>
          <tbody>
            <tr>
              <th colSpan="2"><h4>Submit Complaint</h4></th>
            </tr>
            <tr>
              <td><label htmlFor="institution">Institution :</label></td>
              <td>
                <select className="form-control" name="institution" id="institution">
                  <option value="wildlife">Wildlife Conservations</option>
                  <option value="forest">Forest Conservations</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label htmlFor="division">Division :</label></td>
              <td>
                <select className="form-control" name="division" id="division">
                  <option value="Gampaha">Gampaha</option>
                  <option value="Anuradhapura">Anuradhapura</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label htmlFor="branch">Branch :</label></td>
              <td>
                <select className="form-control" name="branch" id="branch">
                  <option value="Wattala">Wattala</option>
                  <option value="Ja Ela">Ja Ela</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label htmlFor="incident">Incident :</label></td>
              <td>
                <textarea className="form-control" id="incident" name="incident" rows="4" placeholder='Brief description of the incident...'></textarea>
              </td>
            </tr>
            <tr>
              <td><label htmlFor="evidence">Upload Evidence :</label></td>
              <td><input type="file" className="form-control-file" id="myFile" name="filename" /></td>
            </tr>
            <tr>
            <td colSpan="2" className="text-center">
            <div className="w-20">
                <input type="submit" className="btn btn-primary" value="Submit" />
            </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default SubmitComplaintPage;
