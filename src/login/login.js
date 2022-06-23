import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [fail, setfail] = useState("");

  useEffect(() => {
    setfail("");
  }, [email, password]);

  function SuccessfulLogin(token) {
    let redirect = document.getElementById("redirect-to-home");
    props.setcredentials(token);
    redirect.click();
  }

  function FailedLogin() {
    setfail("FAIL");
  }

  function onSubmit(event) {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/login", { email: email, password: password })
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
    <div>
      <h2>Please login</h2>
      <Link className="hidden" id="redirect-to-home" to="/play" />
      <form onSubmit={onSubmit} className="v login">
        <label>Email</label>
        <input
          type="email"
          onChange={(event) => {
            setemail(event.target.value);
          }}
          value={email}
        ></input>
        <label>Password</label>
        <input
          type="password"
          onChange={(event) => {
            setpassword(event.target.value);
          }}
          value={password}
        ></input>
        {fail == "FAIL" ? <h3>Login Credentials Incorrect</h3> : ""}
        <button type="submit">LOGIN!</button>
      </form>
    </div>
  );
};

export default Login;
