import React from "react";

const Notifications = ({ notifications }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Notifications</h5>
        <div className="mt-4 notifications custom-scroll">
          {notifications.map((item, index) => (
            <div className="card mb-2 text-start p-2" key={index}>
              <p className="mb-0">{item.title}</p>
              <p className="mb-0 text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
