import React from "react";
import { ErrorMessage } from "../../../components/alert-message";

const UnauthorizedPage = () => {
  return (
    <div>
      <ErrorMessage message="You do not have the permissions to view this page." />
    </div>
  );
};

export default UnauthorizedPage;
