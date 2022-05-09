import React, { useState } from "react";

import Income from "./income/income";
import Expenses from "./expenses";
import Assets from "./assets";
import Liabilities from "./liabilities";

import totalUp from "../functions/totalUp";
import Buy from "./actionsResults/buy";
import externalData from "../data";
import Heading from "./heading";

const App = (props) => {
  const payday = () => {
    onChange("NONE");
    setcash(cash + cashflow);
  };

  const buy = () => {
    setcurrentAction("BUY");
  };

  const onChange = (setvalue) => {
    setcurrentAction(setvalue);
    settotalIncome(totalUp(data.assets));
    settotalExpenses(totalUp(data.expenses));
    setpassive(totalUp(data.assets) - data.assets.salary);
    setcashflow(totalIncome - totalExpenses);
  };

  const [data, setdata] = useState(externalData);

  const [totalIncome, settotalIncome] = useState(totalUp(data.assets));
  const [passive, setpassive] = useState(
    totalUp(data.assets) - data.assets.salary
  );
  const [totalExpenses, settotalExpenses] = useState(totalUp(data.expenses));
  const [cashflow, setcashflow] = useState(totalIncome - totalExpenses);
  const [cash, setcash] = useState(cashflow + data.assets.savings);
  const choiceToStay = true;
  const [currentAction, setcurrentAction] = useState("NONE");
  if (passive < totalExpenses * 2 || choiceToStay) {
    return (
      <div className="app hz">
        <div className="player">
          <div className="v playerCard">
            <Heading data={data} />
            <hr />
            <h2>Income Statement</h2>
            <Income
              props={data.assets}
              totalIncome={totalIncome}
              passive={passive}
            />
            <hr />
            <Expenses props={data.expenses} totalExpenses={totalExpenses} />
            <hr />
            <div className="v right">
              <h3 className="cash-flow">Monthly Cash Flow: {cashflow}</h3>
              <h3 className="cash">Cash: {cash}</h3>
            </div>
            <hr />
            <div className="hz">
              <Assets props={data.assets} />
              <hr />
              <Liabilities props={data.expenses} re={data.assets.realestate} />
            </div>
          </div>
          <hr />
          <div className="actions hz">
            <div className="payday">
              <button onClick={payday}>Payday</button>
            </div>
            <div className="buy">
              <button onClick={buy}>Buy</button>
            </div>
            <div className="doodad">
              <button onClick={payday}>Doodad</button>
            </div>
            <div className="sell">
              <button onClick={payday}>Sell</button>
            </div>
            <div className="pay-loan">
              <button onClick={payday}>Pay Loan</button>
            </div>
          </div>
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
          <div className="loan"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="ending">
        <h1>You Won! Now go on past the rat race!</h1>
        <h2>Stats below.</h2>
        <h3>Passive: {passive}</h3>
      </div>
    );
  }
};

export default App;
