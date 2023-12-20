import React, { useEffect, useState } from "react";
import Notifications from "../notifications";
import { complaints, notifications } from "../../data/dummy-data";
import useAuthToken from "../../hooks/useAuthToken";
import { API_URL } from "../../config/config";
import Loader from "../loader";

const PublicDashboard = () => {
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuthToken();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL + "/complaints/my-complaints", {
          headers: {
            Token: "Bearer " + accessToken,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data. Please try again");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortedArray = data && [...data].sort((item1, item2) => item2.id - item1.id);
  if (loading) {
    return <Loader/>;
  }
  return (
    <div className="text-center">
      {error && <ErrorMessage message={error} />}
      <div className="d-flex">
        <div className="col-12 col-md-8 px-3">
          {/* <div className="row d-md-none">
            <Notifications notifications={notifications} />
          </div> */}
          <div className="row pt-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Recent Complaints</h5>
                {sortedArray && sortedArray
                  .map((item, index) => (
                    <div className="card mb-2 text-start p-2" key={index}>
                      <div className="d-flex justify-content-between h-100">
                        <div>
                          <p className="mb-0">{item.description}</p>
                          {/* <p className="mb-0 text-muted">{item.description}</p> */}
                        </div>
                        <div className="align-middle">
                          <p>{item.status}</p>
                        </div>
                      </div>
                    </div>
                  ))
                  .slice(0, 5)}
              </div>
            </div>
          </div>
          <div className="row px-md-3"></div>
        </div>
        {/* <div className="col-4 d-none d-md-block p-2">
          <Notifications notifications={notifications} />
        </div> */}
      </div>
    </div>
  );
};

export default PublicDashboard;
