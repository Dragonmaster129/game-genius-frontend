import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import App from "./components/app";
import CreateCard from "./components/auth/createCard";
import Login from "./login/login";

const Router = (props) => {
  const [credentials, setcredentials] = useState("1");
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/play" element={<App credentials={credentials} />} />
        <Route
          path="/login"
          element={
            <Login credentials={credentials} setcredentials={setcredentials} />
          }
        />
        <Route
          path="/card/add"
          element={<CreateCard credentials={credentials} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
