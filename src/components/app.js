import React, { useState, useEffect } from "react";

import Income from "./income/income";
import Expenses from "./expenses";
import Assets from "./assets";
import Liabilities from "./liabilities";

import totalUp from "../functions/totalUp";
import Buy from "./actionsResults/buy";
import Sell from "./actionsResults/sell";
import externalData from "../data";
import Heading from "./heading";
import Doodad from "./actionsResults/doodad";
import payday from "../functions/payday";
import BorrowLoan from "./actionsResults/borrowloan";
import PayLoan from "./actionsResults/payloan";
import Collect from "./actionsResults/collect";
import Pay from "./actionsResults/pay";

let socket = new WebSocket("ws://localhost:9999");

const App = (props) => {
  const [data, setdata] = useState(externalData);

  const [totalIncome, settotalIncome] = useState(totalUp(data.assets));
  const [passive, setpassive] = useState(
    totalUp(data.assets) - data.assets.salary
  );
  const [totalExpenses, settotalExpenses] = useState(totalUp(data.expenses));
  const [cashflow, setcashflow] = useState(totalIncome - totalExpenses);
  const [cash, setcash] = useState(cashflow + data.savings);
  const [choiceToStay, setchoiceToStay] = useState(true);
  const [currentAction, setcurrentAction] = useState("NONE");
  const [borrowLoan, setborrowLoan] = useState("NONE");
  const [event, setevent] = useState({});
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  socket.onopen = function (e) {
    socket.send("My name is Josh");
  };

  socket.onmessage = function (event) {
    let parsedData = JSON.parse(event.data);
    if (parsedData.externaldata) {
      setdata(parsedData.externaldata);
    } else if (parsedData[0] == "EVENT") {
      setevent(parsedData[1]);
    }
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

  useEffect(() => {
    settotalExpenses(totalUp(data.expenses));
  }, [data, data.expenses]);

  useEffect(() => {
    settotalIncome(totalUp(data.assets));
    setpassive(totalUp(data.assets) - data.assets.salary);
  }, [data, data.assets.dividends, data.assets.realestate, data.assets.land]);

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

  useEffect(() => {
    setcashflow(totalIncome - totalExpenses);
  }, [totalIncome, totalExpenses]);
  if (passive < totalExpenses * 2 || choiceToStay) {
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
          <div className="actions hz">
            <div className="payday">
              <button>Payday</button>
            </div>
          </div>
          {passive >= totalExpenses * 2 ? (
            <div classname="choice-to-leave">
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
        <div className="card">
          {currentAction == "BUY" ? (
            <Buy
              data={data}
              setdata={setdata}
              submitted={onChange}
              cash={data.cash}
              setcash={setcash}
            />
          ) : (
            ""
          )}
          {currentAction == "DOODAD" ? (
            <Doodad
              data={data}
              setdata={setdata}
              cash={data.cash}
              setcash={setcash}
              submitted={onChange}
            />
          ) : (
            ""
          )}
          {currentAction == "SELL" ? (
            <Sell
              data={data}
              setdata={setdata}
              cash={data.cash}
              setcash={setcash}
              submitted={onChange}
            />
          ) : (
            ""
          )}
          {currentAction == "COLLECT" ? (
            <Collect cash={data.cash} setcash={setcash} submitted={onChange} />
          ) : (
            ""
          )}
          {currentAction == "PAY" ? (
            <Pay cash={data.cash} setcash={setcash} submitted={onChange} />
          ) : (
            ""
          )}
          <div className="loan">
            {borrowLoan == "BORROW" ? (
              <BorrowLoan
                cash={data.cash}
                setcash={setcash}
                data={data}
                setdata={setdata}
                setborrowLoan={setborrowLoan}
              />
            ) : borrowLoan == "PAYLOAN" ? (
              <PayLoan
                cash={data.cash}
                setcash={setcash}
                data={data}
                setdata={setdata}
                setborrowLoan={setborrowLoan}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="spacer"></div>
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
