import React, { useState } from "react";

import Income from "./income/income";
import Expenses from "./expenses";
import Assets from "./assets";
import Liabilities from "./liabilities";

import totalUp from "../functions/totalUp";

const App = (props) => {
  const payday = () => {
    setcash(cash + cashflow);
  };

  const buy = () => {
    setcurrentAction("BUY");
  };

  const [data, setdata] = useState({
    player: 3,
    profession: "Doctor",
    auditor: "player to the right",
    assets: {
      savings: 400,
      salary: 13200,
      interest: [
        { name: "thingy", value: 40, key: 1 },
        { name: "notherone", value: 50, key: 2 },
        { name: "notherone", value: 50, key: 3 },
        { name: "notherone", value: 50, key: 4 },
        { name: "notherone", value: 50, key: 5 },
      ],
      dividends: [{ name: "2Big", value: 30, key: 1 }],
      realEstate: [
        {
          type: "3/2",
          name: "3/2 House",
          cost: 55000,
          downpay: 5000,
          value: 200,
          key: 1,
        },
        {
          type: "3/2",
          name: "3/2 House",
          cost: 55000,
          downpay: 7000,
          value: 400,
          key: 2,
        },
      ],
      businesses: [
        {
          type: "autoParts",
          name: "Auto Parts",
          cost: 100000,
          downpay: 100000,
          value: 1500,
          key: 1,
        },
        {
          type: "autoParts",
          name: "Auto Parts",
          cost: 120000,
          downpay: 120000,
          value: 1700,
          key: 2,
        },
      ],
      passive: 0,
      stock: [{ name: "OK4U", amount: 1000, costPerShare: 1, key: 1 }],
    },
    expenses: {
      taxes: 3420,
      mortgage: { monthly: 1900, totalCost: 202000 },
      school: { monthly: 750, totalCost: 150000 },
      car: { monthly: 380, totalCost: 19000 },
      creditCard: { monthly: 270, totalCost: 9000 },
      retail: { monthly: 50, totalCost: 1000 },
      other: 2880,
      child: {
        count: 0,
        costPer: 640,
      },
      loan: 0,
    },
  });

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
            <h1>Player card</h1>
            <h2>Profession: {data.profession}</h2>
            <h2>Player: {data.player}</h2>
            <h2>Auditor: {data.auditor}</h2>
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
              <Liabilities props={data.expenses} re={data.assets.realEstate} />
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
            <div className="buy">
              <form>
                <select className="buy-choice">
                  <option>Stock</option>
                  <option>2/1 Starter Home</option>
                  <option>3/2 House</option>
                  <option>Duplex</option>
                  <option>4-plex</option>
                  <option>8-plex</option>
                  <option>Apartment Complex</option>
                  <option>D2Y</option>
                  <option>Land</option>
                </select>
              </form>
            </div>
          ) : (
            ""
          )}
          <h3>Current Action</h3>
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
