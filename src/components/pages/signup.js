import React, { useState } from "react";

const SignUp = (props) => {
  const [email, setemail] = useState("");
  const [pwd, setpwd] = useState("");

  function Submit(event) {
    event.preventDefault();
  }
  return (
    <div className="sign-up-wrapper">
      <div className="sign-up">
        <h1>Sign Up to use the app.</h1>
      </div>
    </div>
  );
};

export default SignUp;
