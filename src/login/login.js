import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_HOST } from "../components/constants";

const Login = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [fail, setfail] = useState("");

  useEffect(() => {
    setfail("");
  }, [email, password]);

  function SuccessfulLogin(token) {
    let redirect = document.getElementById("redirect");
    props.setcredentials(token[0]);
    redirect.click();
  }

  function FailedLogin() {
    setfail("FAIL");
  }

  function onSubmit(event) {
    event.preventDefault();
    axios
      .post(`${SERVER_HOST}/login`, { email: email, password: password })
      .then((res) => {
        let result = JSON.parse(res.data);
        if (result != false) {
          SuccessfulLogin(result);
        } else {
          FailedLogin();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="login-page-wrapper">
      <div className="login-page">
        <h2>Please login</h2>
        <Link className="hidden" id="redirect" to="/choose-game" />
        <form onSubmit={onSubmit} className="v login-form">
          <label>Email</label>
          <input
            type="email"
            onChange={(event) => {
              setemail(event.target.value);
            }}
            value={email}
            className="email"
          ></input>
          <label>Password</label>
          <input
            type="password"
            onChange={(event) => {
              setpassword(event.target.value);
            }}
            value={password}
            className="password"
          ></input>
          {fail == "FAIL" ? <h3>Login Credentials Incorrect</h3> : ""}
          <label>
            <h4 className="sign-up-link">
              Don't have an account? <Link to="/signup">Sign up here.</Link>
            </h4>
          </label>
          <button type="submit" className="login-button">
            LOGIN!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
