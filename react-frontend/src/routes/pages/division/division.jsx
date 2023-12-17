import React, { useEffect, useState } from 'react'
import useAuthToken from '../../../hooks/useAuthToken';
import { API_URL } from '../../../config/config';
import { ErrorMessage, InfoMessage, SuccessMessage } from '../../../components/alert-message';
import Loader from '../../../components/loader';
import { dateFormat } from '../../../utils/utils';
import DivisionForm from '../../../components/forms/division-form';

const DivisionPage = () => {
    const { accessToken } = useAuthToken();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState("");
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(API_URL + "/divisions", {
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
          setData(result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
    
    if (loading) {
      return <Loader />;
    }
  
    // extract all keys for the table headers
    let allKeys = null;
    if (data.length > 0) {
      allKeys = Array.from(new Set(data.flatMap((item) => Object.keys(item))));
    } else {
      return <InfoMessage message="No divisions found!" />;
    }
    const itemsToRemove = ["updatedAt"];
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
      <div className="d-md-flex justify-content-between">
        <h2 className="">Divisions</h2>
        {/* <Link to="/institutions/create" className='btn btn-dark'>Create</Link> */}
        <DivisionForm />
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
            {data.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{dateFormat(item.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DivisionPage