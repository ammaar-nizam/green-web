import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    age: 25,
    address: "123 Main St, Cityville",
    phone: "+1 123-456-7890",
    isAdmin: false,
    dateOfBirth: "1997-03-15",
    gender: "Male",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 30,
    address: "456 Oak St, Townsville",
    phone: "+1 987-654-3210",
    isAdmin: true,
    dateOfBirth: "1992-08-22",
    gender: "Female",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    age: 28,
    address: "789 Pine St, Villagetown",
    phone: "+1 555-123-4567",
    isAdmin: false,
    dateOfBirth: "1995-11-10",
    gender: "Male",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice.williams@example.com",
    age: 22,
    address: "101 Cedar St, Countryside",
    phone: "+1 777-555-1234",
    isAdmin: true,
    dateOfBirth: "2000-04-05",
    gender: "Female",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    age: 35,
    address: "202 Maple St, Suburbia",
    phone: "+1 333-444-5678",
    isAdmin: false,
    dateOfBirth: "1988-12-18",
    gender: "Male",
  },
  {
    id: 6,
    name: "Eva Davis",
    email: "eva.davis@example.com",
    age: 29,
    address: "303 Pineapple St, Beachtown",
    phone: "+1 999-888-7777",
    isAdmin: true,
    dateOfBirth: "1994-05-20",
    gender: "Female",
  },
  {
    id: 7,
    name: "Frank Miller",
    email: "frank.miller@example.com",
    age: 32,
    address: "404 Redwood St, Forestville",
    phone: "+1 444-555-6666",
    isAdmin: false,
    dateOfBirth: "1989-09-12",
    gender: "Male",
  },
  {
    id: 8,
    name: "Grace Wilson",
    email: "grace.wilson@example.com",
    age: 27,
    address: "505 Oakwood St, Hilltop",
    phone: "+1 777-999-1111",
    isAdmin: true,
    dateOfBirth: "1996-02-28",
    gender: "Female",
  },
  {
    id: 9,
    name: "Henry Jones",
    email: "henry.jones@example.com",
    age: 31,
    address: "606 Elm St, Riverside",
    phone: "+1 111-222-3333",
    isAdmin: false,
    dateOfBirth: "1991-07-08",
    gender: "Male",
  },
  {
    id: 10,
    name: "Isabel Brown",
    email: "isabel.brown@example.com",
    age: 26,
    address: "707 Birch St, Meadowville",
    phone: "+1 222-333-4444",
    isAdmin: true,
    dateOfBirth: "1998-10-25",
    gender: "Female",
  },
  {
    id: 11,
    name: "Jack Robinson",
    email: "jack.robinson@example.com",
    age: 34,
    address: "808 Pinecone St, Mountainview",
    phone: "+1 333-444-5555",
    isAdmin: false,
    dateOfBirth: "1987-04-30",
    gender: "Male",
  },
  {
    id: 12,
    name: "Katherine White",
    email: "katherine.white@example.com",
    age: 23,
    address: "909 Willow St, Lakeside",
    phone: "+1 444-555-6666",
    isAdmin: true,
    dateOfBirth: "1999-01-15",
    gender: "Female",
  },
  {
    id: 13,
    name: "Leo Garcia",
    email: "leo.garcia@example.com",
    age: 33,
    address: "1010 Magnolia St, Valleytown",
    phone: "+1 555-666-7777",
    isAdmin: false,
    dateOfBirth: "1986-06-03",
    gender: "Male",
  },
  {
    id: 14,
    name: "Mia Taylor",
    email: "mia.taylor@example.com",
    age: 28,
    address: "1111 Rose St, Sunsetville",
    phone: "+1 666-777-8888",
    isAdmin: true,
    dateOfBirth: "1993-11-20",
    gender: "Female",
  },
  {
    id: 15,
    name: "Nathan Harris",
    email: "nathan.harris@example.com",
    age: 30,
    address: "1212 Ivy St, Hillside",
    phone: "+1 777-888-9999",
    isAdmin: false,
    dateOfBirth: "1985-08-09",
    gender: "Male",
  },
  {
    id: 16,
    name: "Olivia Clark",
    email: "olivia.clark@example.com",
    age: 25,
    address: "1313 Pinehurst St, Greenside",
    phone: "+1 888-999-0000",
    isAdmin: true,
    dateOfBirth: "1996-12-05",
    gender: "Female",
  },
  {
    id: 17,
    name: "Paul Anderson",
    email: "paul.anderson@example.com",
    age: 29,
    address: "1414 Elmwood St, Riverside",
    phone: "+1 999-000-1111",
    isAdmin: false,
    dateOfBirth: "1992-03-18",
    gender: "Male",
  },
  {
    id: 18,
    name: "Quinn Martin",
    email: "quinn.martin@example.com",
    age: 27,
    address: "1515 Birch St, Meadowville",
    phone: "+1 000-111-2222",
    isAdmin: true,
    dateOfBirth: "1994-06-21",
    gender: "Female",
  },
  {
    id: 19,
    name: "Rachel Evans",
    email: "rachel.evans@example.com",
    age: 32,
    address: "1616 Maple St, Suburbia",
    phone: "+1 111-222-3333",
    isAdmin: false,
    dateOfBirth: "1989-09-24",
    gender: "Male",
  },
  {
    id: 20,
    name: "Samuel Turner",
    email: "samuel.turner@example.com",
    age: 28,
    address: "1717 Cedar St, Countryside",
    phone: "+1 222-333-4444",
    isAdmin: true,
    dateOfBirth: "1993-02-12",
    gender: "Female",
  },
];

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
  //       This is a info alert—check it out!
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
    return (
      <div class="alert alert-info" role="alert">
        No users found!
      </div>
    );
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
