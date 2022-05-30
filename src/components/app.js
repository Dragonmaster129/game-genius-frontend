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
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

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
  }, [
    data,
    data.assets.interest,
    data.assets.dividends,
    data.assets.realestate,
    data.assets.businesses,
  ]);

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
              totalIncome={totalIncome.toLocaleString("en-US")}
              passive={passive.toLocaleString("en-US")}
            />
            {shrinkPlayer() ? "" : <hr />}
            <Expenses
              props={data.expenses}
              totalExpenses={totalExpenses.toLocaleString("en-US")}
            />
            {shrinkPlayer() ? "" : <hr />}
            <div className="v right">
              <h3 className="cash-flow">
                Monthly Cash Flow: {cashflow.toLocaleString("en-US")}
              </h3>
              <h3 className="cash">Cash: {cash.toLocaleString("en-US")}</h3>
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
            {/* <div className="payday">
              <button onClick={() => payday(setcash, cash, cashflow, onChange)}>
                Payday
              </button>
            </div>
            <div className="doodad">
              <button
                onClick={() => {
                  onChange("DOODAD");
                }}
              >
                Doodad
              </button>
            </div>
            <div className="downsized">
              <button
                onClick={() => {
                  onChange("DOWNSIZED");
                }}
              >
                Downsized
              </button>
            </div>
            <div className="collect-money">
              <button
                onClick={() => {
                  onChange("COLLECT");
                }}
              >
                Collect
              </button>
            </div>
            <div className="pay-money">
              <button
                onClick={() => {
                  onChange("PAY");
                }}
              >
                Pay
              </button>
            </div>
            <div className="charity">
              <button
                onClick={() => {
                  onChange("CHARITY");
                }}
              >
                Charity
              </button>
            </div>
            <div className="buy">
              <button
                onClick={() => {
                  onChange("BUY");
                }}
              >
                Buy
              </button>
            </div>
            <div className="sell">
              <button
                onClick={() => {
                  onChange("SELL");
                }}
              >
                Sell
              </button>
            </div>
            <div className="baby">
              <button
                onClick={() => {
                  onChange("BABY");
                }}
              >
                Baby
              </button>
            </div> */}
            <div className="pay-loan">
              <button
                onClick={() => {
                  setborrowLoan("PAYLOAN");
                }}
              >
                Pay Loan
              </button>
            </div>
            <div className="borrowloan">
              <button
                onClick={() => {
                  setborrowLoan("BORROW");
                }}
              >
                Borrow Loan
              </button>
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
              cash={cash}
              setcash={setcash}
            />
          ) : (
            ""
          )}
          {currentAction == "DOODAD" ? (
            <Doodad
              data={data}
              setdata={setdata}
              cash={cash}
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
              cash={cash}
              setcash={setcash}
              submitted={onChange}
            />
          ) : (
            ""
          )}
          {currentAction == "COLLECT" ? (
            <Collect cash={cash} setcash={setcash} submitted={onChange} />
          ) : (
            ""
          )}
          {currentAction == "PAY" ? (
            <Pay cash={cash} setcash={setcash} submitted={onChange} />
          ) : (
            ""
          )}
          <div className="loan">
            {borrowLoan == "BORROW" ? (
              <BorrowLoan
                cash={cash}
                setcash={setcash}
                data={data}
                setdata={setdata}
                setborrowLoan={setborrowLoan}
              />
            ) : borrowLoan == "PAYLOAN" ? (
              <PayLoan
                cash={cash}
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
        <h3>Passive: {passive.toLocaleString("en-US")}</h3>
        <h3>New Income: {(passive * 100).toLocaleString("en-US")}</h3>
      </div>
    );
  }
};

export default App;
