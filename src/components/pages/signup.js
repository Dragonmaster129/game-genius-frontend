import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SERVER_HOST } from "../constants";

const SignUp = (props) => {
  const [email, setemail] = useState("");
  const [pwd, setpwd] = useState("");
  const [results, setresults] = useState(0);

  useEffect(() => {
    setresults(0);
  }, [email, pwd]);

  function Submit(event) {
    event.preventDefault();
    axios
      .post(`${SERVER_HOST}/signup`, { email: email, password: pwd })
      .then((res) => {
        setresults(res.data);
      })
      .catch((err) => [console.log(err)]);
  }
  return (
    <div className="sign-up-wrapper">
      <div className="sign-up">
        <h1>Sign up to play.</h1>
        <form className="sign-up-form" onSubmit={Submit}>
          <label>UserName</label>
          <input
            value={email}
            onChange={({ target }) => {
              setemail(target.value);
            }}
          ></input>
          <label>Password</label>
          <input
            type="password"
            value={pwd}
            onChange={({ target }) => {
              setpwd(target.value);
            }}
          ></input>
          <button type="submit">Sign Up</button>
          <div className="results">
            {results !== 0 ? (
              results === 1 ? (
                <h2>
                  Short answer, you couldn't create account since that email is
                  already taken <Link to="/login">Try Logging in?</Link>
                </h2>
              ) : (
                <Link to="/login" className="result-worked">
                  It worked! Log in here.
                </Link>
              )
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
