import React from "react";
import { complaints } from "../../../data/dummy-data";

const MyComplaints = () => {
  // extract all keys for the table headers
  let allKeys = null;
  if (complaints.length > 0) {
    // all keys except for "Category"
    allKeys = Array.from(
      new Set(complaints.flatMap((complaint) => Object.keys(complaint)))
    ).filter((key) => key !== "category");
  } else {
    return <InfoMessage message="No complaints found!" />;
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {allKeys.map((item, index) => (
              <th key={index} scope="col" className="text-uppercase">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint, index) => (
            <tr key={index}>
              <th scope="row">{complaint.id}</th>
              <td>{complaint.subject}</td>
              <td>{complaint.description}</td>
              <td>{complaint.status}</td>
              <td>{complaint.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyComplaints;
