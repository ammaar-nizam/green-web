import React, { useEffect, useState } from "react";
import useAuthToken from "../../../../hooks/useAuthToken";
import Loader from "../../../../components/loader";
import { API_URL } from "../../../../config/config";

import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { dateFormat } from "../../../../utils/utils";
import { SuccessMessage } from "../../../../components/alert-message";

const PublicUsersPage = () => {
  const { accessToken } = useAuthToken();
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/public-users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token: "Bearer " + accessToken,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setUsers(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // function to handle edit admin users
  const handleEdit = (id) => {
    console.log(id);
  };
  // function to handle delete admin users
  const handleDelete = (id) => {
    console.log(id);
  };

  if (loading) {
    return <Loader />;
  }

  // extract all keys for the table headers
  let allKeys = null;
  if (users.length > 0) {
    allKeys = Array.from(new Set(users.flatMap((user) => Object.keys(user))));
  } else {
    return <InfoMessage message="No users found!" />;
  }
  const itemsToRemove = ["password", "roleId", "updatedAt"];
  allKeys = allKeys.filter((item) => !itemsToRemove.includes(item));

  return (
    <div>
      {error && (
        <div className="mt-2">
          <ErrorMessage message={error.message} />
        </div>
      )}
      {success && (
        <div className="mt-2">
          <SuccessMessage message={success} />
        </div>
      )}
      <div className="d-flex justify-content-between">
        <h2 className="">All Public Users</h2>
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
              <th scope="col" className="text-uppercase">
                actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.nic}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{dateFormat(user.createdAt)}</td>
                <td>
                  <button onClick={() => handleEdit(user.id)} className="btn">
                    <FaRegEdit className="mb-1" />
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="btn">
                    <MdOutlineDelete className="mb-1" />
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

export default PublicUsersPage;
