import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import { users } from "../../../data/dummy-data";
import { InfoMessage } from "../../../components/alert-message";

const AllUserReport = () => {
  // const [users, setUsers] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://jsonplaceholder.typicode.com/posts/1"
  //       );
  //       setUsers(response.data);
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
  if (users.length > 0) {
    allKeys = Array.from(new Set(users.flatMap((user) => Object.keys(user))));
  } else {
    return <InfoMessage message="No users found!" />;
  }

  // headers for the CSV
  const headers = [
    { label: "ID", key: "id" },
    { label: "NAME", key: "name" },
    { label: "EMAIL", key: "email" },
    { label: "AGE", key: "age" },
    { label: "ADDRESS", key: "address" },
    { label: "PHONE", key: "phone" },
    { label: "IS ADMIN", key: "isAdmin" },
    { label: "DATE OF BIRTH", key: "dateOfBirth" },
    { label: "GENDER", key: "gender" },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2 className="">All Users Report</h2>
        <CSVLink
          className="btn btn-secondary"
          data={users}
          headers={headers}
          filename="all-user-report.csv"
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
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
                <td>{user.isAdmin ? "Admin" : "User"}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUserReport;
