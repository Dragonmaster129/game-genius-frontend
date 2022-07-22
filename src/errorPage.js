import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = (props) => {
  return (
    <div>
      <h1>Uh Oh. There's nothing here.</h1>
      <h1>Click on the link below to login.</h1>
      <h1>
        <Link to="login" className="link">
          Login
        </Link>
      </h1>
    </div>
  );
};

export default ErrorPage;
