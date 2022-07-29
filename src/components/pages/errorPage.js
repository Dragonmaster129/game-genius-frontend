import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = (props) => {
  return (
    <div className="error-page-wrapper">
      <div className="error-page">
        <h1>Uh Oh. There's nothing here.</h1>
        <h1>Sorry about that.</h1>
        <h1>Click on the link below to login.</h1>
        <h1>
          <Link to="login" className="link">
            Login
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default ErrorPage;
