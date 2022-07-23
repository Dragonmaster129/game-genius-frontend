import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter, Redirect } from "react-router-dom";
import App from "./components/app";
import CreateCard from "./components/auth/createCard";
import SelectGame from "./components/selectGame";
import ErrorPage from "./errorPage";
import Login from "./login/login";
import Loading from "./loading";
import { SERVER_HOST } from "./components/constants";

const Router = (props) => {
  const [credentials, setcredentials] = useState(getToken());
  const [credentialsWork, setcredentialsWork] = useState(false);
  const [auth, setauth] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  function getToken() {
    let token = "0";
    let TokenDate = localStorage.getItem("TokenDate") || 0;
    if (new Date().valueOf() - TokenDate < 2 * 60 * 60 * 1000) {
      // 2 hours
      token = localStorage.getItem("Token");
    }
    return token;
  }

  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${SERVER_HOST}/data/${credentials}`)
      .then((res) => {
        if (res.data == "invalid token") {
          setcredentialsWork(false);
        } else {
          res = JSON.parse(res.data);
          if (typeof res == "object") {
            setcredentialsWork(true);
            localStorage.setItem("Token", credentials);
            localStorage.setItem("TokenDate", new Date().valueOf());
          }
        }
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, [credentials]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              credentials={credentials}
              setcredentials={setcredentials}
              setauth={setauth}
            />
          }
        />
        {credentialsWork ? (
          <Route path="/play" element={<App credentials={credentials} />} />
        ) : (
          ""
        )}
        {auth ? (
          <Route
            path="/card/add"
            element={<CreateCard credentials={credentials} />}
          />
        ) : (
          ""
        )}
        {credentialsWork ? (
          <Route
            path="/choose-game"
            element={<SelectGame credentials={credentials} />}
          />
        ) : (
          ""
        )}
        {!isLoading ? (
          <Route path="*" element={<ErrorPage />} />
        ) : (
          <Route path="*" element={<Loading />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
