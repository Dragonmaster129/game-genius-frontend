import React, { useState, useEffect } from "react";
import axios from "axios";

import Heading from "./heading";
import Income from "./income/income";
import Expenses from "./expenses";
import Assets from "./assets";
import Liabilities from "./liabilities";
import externalData from "../data";

const App = (props) => {
  const [data, setdata] = useState(externalData);

  const [choiceToStay, setchoiceToStay] = useState(true);
  const [currentAction, setcurrentAction] = useState("NONE");
  const [borrowLoan, setborrowLoan] = useState("NONE");
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const getData = () => {
    axios
      .get(`http://127.0.0.1:8000/data/${props.credentials}`) //, {params: {token: props.credentials}})
      .then((res) => {
        let result = JSON.parse(res.data);
        if (result != "invalid token") {
          setdata(result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const shrinkPlayer = () => {
    if (
      windowDimenion.winWidth <= 650 &&
      (currentAction != "NONE" || borrowLoan != "NONE")
    ) {
      return true;
    }
  };

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  const onChange = (setvalue) => {
    setcurrentAction(setvalue);
  };

  const resetGame = () => {
    axios
      .post(`http://127.0.0.1:8000/reset/${props.credentials}`, { reset: true })
      .then((res) => getData())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

  if (data.passive < data.totalExpenses * 2 || choiceToStay) {
    return (
      <div className={windowDimenion.winWidth <= 1060 ? "app v" : "app hz"}>
        <div className="player">
          <div
            className={shrinkPlayer() ? "v playercardhidden" : "v playercard"}
          >
            <Heading data={data} />
            {shrinkPlayer() ? "" : <hr />}
            <h2>Income Statement</h2>
            <Income
              props={data.assets}
              totalIncome={data.totalIncome.toLocaleString("en-US")}
              passive={data.passive.toLocaleString("en-US")}
            />
            {shrinkPlayer() ? "" : <hr />}
            <Expenses
              props={data.expenses}
              totalExpenses={data.totalExpenses.toLocaleString("en-US")}
            />
            {shrinkPlayer() ? "" : <hr />}
            <div className="v right">
              <h3 className="cash-flow">
                Monthly Cash Flow: {data.cashflow.toLocaleString("en-US")}
              </h3>
              <h3 className="cash">
                Cash: {data.cash.toLocaleString("en-US")}
              </h3>
            </div>
            {shrinkPlayer() ? "" : <hr />}
            <div className="hz">
              <Assets props={data.assets} />
              {shrinkPlayer() ? "" : <hr />}
              <Liabilities props={data.expenses} re={data.assets.realestate} />
            </div>
          </div>
          <hr />
          {data.passive >= data.totalExpenses * 2 && data.passive >= 1 ? (
            <div className="choice-to-leave">
              <h3>Click this button when you want to leave the Rat Race</h3>
              <button
                onClick={() => {
                  setchoiceToStay(false);
                }}
              >
                Leave the Rat Race
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <h3>
            <button onClick={resetGame} className="">
              Reset
            </button>
          </h3>
        </div>
      </div>
    );
  } else {
    return (
      <div className="ending">
        <h1>You Won! Now go on past the rat race!</h1>
        <h2>Stats below.</h2>
        <h3>Passive: {data.passive.toLocaleString("en-US")}</h3>
        <h3>New Income: {(data.passive * 100).toLocaleString("en-US")}</h3>
      </div>
    );
  }
};

export default App;
