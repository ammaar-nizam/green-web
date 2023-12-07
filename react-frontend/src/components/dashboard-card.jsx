import React from "react";

const DashboardCard = ({ title, data }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <div className="mt-4 ">
          {data.map((item, index) => (
            <div className="row" key={index}>
              <div className="col-12 d-flex">
                <div className="col-6 text-start">{item.title}</div>
                <div className="col-6 text-end">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
