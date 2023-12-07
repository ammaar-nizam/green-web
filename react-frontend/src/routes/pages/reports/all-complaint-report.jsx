import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import { complaints } from "../../../data/dummy-data";

const AllComplaintReport = () => {
  // const [complaints, setComplaints] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://jsonplaceholder.typicode.com/posts/1"
  //       );
  //       setComplaints(response.data);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (loading) {
  //   return (
  //     <div class="alert alert-info" role="alert">
  //       Loading...Please wait!
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div class="alert alert-danger" role="alert">
  //       Error: {error.message}
  //     </div>
  //   );
  // }

  // extract all keys for the table headers
  let allKeys = null;
  if (complaints.length > 0) {
    // all keys except for "Category"
    allKeys = Array.from(new Set(complaints.flatMap((complaint) => Object.keys(complaint)))).filter(key => key !== "category");
  } else {
    return (
      <div class="alert alert-info" role="alert">
        No complaints found!
      </div>
    );
  }

  // headers for the CSV
  const headers = [
    { label: "ID", key: "id" },
    { label: "SUBJECT", key: "subject" },
    { label: "DESCRIPTION", key: "description" },
    { label: "STATUS", key: "status" },
    { label: "DATE", key: "date" },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2 className="">All Complaints Report</h2>
        <CSVLink
          className="btn btn-secondary"
          data={complaints}
          headers={headers}
          filename="all-complaint-report.csv"
        >
          Export CSV
        </CSVLink>
      </div>
      <div className="mt-5 mb-5">
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
    </div>
  );
};

export default AllComplaintReport;
