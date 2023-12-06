import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";

const complaints = [
  {
    id: 1,
    category: "complaints",
    subject: "Slow Internet Connection",
    description:
      "Experiencing very slow internet speeds, especially during peak hours.",
    status: "Open",
    date: "2023-01-10",
  },
  {
    id: 2,
    category: "complaints",
    subject: "Billing Discrepancy",
    description:
      "Incorrect charges on the monthly bill. Need clarification and correction.",
    status: "In Progress",
    date: "2023-02-05",
  },
  {
    id: 3,
    category: "complaints",
    subject: "Service Outage",
    description:
      "No service for the past 24 hours. Unable to make calls or use the internet.",
    status: "Resolved",
    date: "2023-03-20",
  },
  {
    id: 4,
    category: "complaints",
    subject: "Unresponsive Customer Support",
    description:
      "Tried contacting customer support multiple times, but no response.",
    status: "Open",
    date: "2023-04-15",
  },
  {
    id: 5,
    category: "complaints",
    subject: "Hardware Malfunction",
    description: "Router hardware malfunctioning, need replacement or repair.",
    status: "In Progress",
    date: "2023-05-02",
  },
  {
    id: 6,
    category: "complaints",
    subject: "Frequent Service Disconnections",
    description:
      "Experiencing frequent disconnections. Need a permanent solution.",
    status: "Open",
    date: "2023-06-18",
  },
  {
    id: 7,
    category: "complaints",
    subject: "Data Cap Issues",
    description:
      "Receiving notifications about reaching data cap, but usage seems normal.",
    status: "In Progress",
    date: "2023-07-11",
  },
  {
    id: 8,
    category: "complaints",
    subject: "Unsatisfactory Customer Service",
    description:
      "Received unsatisfactory responses from customer service representatives.",
    status: "Resolved",
    date: "2023-08-30",
  },
  {
    id: 9,
    category: "complaints",
    subject: "Cable TV Signal Issues",
    description:
      "Poor signal quality on cable TV channels. Frequent pixelation and disruptions.",
    status: "Open",
    date: "2023-09-25",
  },
  {
    id: 10,
    category: "complaints",
    subject: "Late Technician Visit",
    description:
      "Scheduled technician visit did not happen on time. Need urgent attention.",
    status: "In Progress",
    date: "2023-10-12",
  },
  {
    id: 11,
    category: "complaints",
    subject: "Network Congestion",
    description:
      "Experiencing network congestion during peak hours. Slow speeds and dropped calls.",
    status: "Open",
    date: "2023-11-05",
  },
  {
    id: 12,
    category: "complaints",
    subject: "Unauthorized Charges",
    description:
      "Identified unauthorized charges on the billing statement. Need investigation.",
    status: "In Progress",
    date: "2023-12-20",
  },
  {
    id: 13,
    category: "complaints",
    subject: "Voice Quality Issues",
    description:
      "Poor voice quality during phone calls. Difficulty in communication.",
    status: "Open",
    date: "2024-01-15",
  },
  {
    id: 14,
    category: "complaints",
    subject: "Mobile Data Speeds",
    description:
      "Slow mobile data speeds. Unable to stream videos or use data-intensive apps.",
    status: "In Progress",
    date: "2024-02-02",
  },
  {
    id: 15,
    category: "complaints",
    subject: "Email Connectivity Issues",
    description:
      "Issues with connecting to the email server. Unable to send or receive emails.",
    status: "Resolved",
    date: "2024-03-18",
  },
  {
    id: 16,
    category: "complaints",
    subject: "Router Configuration Problem",
    description:
      "Router configuration issues affecting internet connectivity. Need assistance.",
    status: "Open",
    date: "2024-04-11",
  },
  {
    id: 17,
    category: "complaints",
    subject: "TV Channel Package Error",
    description:
      "Incorrect TV channel package assigned. Missing subscribed channels.",
    status: "In Progress",
    date: "2024-05-25",
  },
  {
    id: 18,
    category: "complaints",
    subject: "Website Access Restrictions",
    description:
      "Unable to access certain websites. Need restrictions to be lifted.",
    status: "Open",
    date: "2024-06-10",
  },
  {
    id: 19,
    category: "complaints",
    subject: "Smart Home Device Connectivity",
    description:
      "Issues with connecting smart home devices to the network. Need assistance.",
    status: "Resolved",
    date: "2024-07-28",
  },
  {
    id: 20,
    category: "complaints",
    subject: "Digital Phone Line Noise",
    description:
      "Hearing noise on the digital phone line. Difficulty in clear communication.",
    status: "Open",
    date: "2024-08-15",
  },
];

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
