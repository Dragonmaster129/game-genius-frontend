import React, { useState } from "react";

import Income from "./income/income";
import Expenses from "./expenses";
import Assets from "./assets";
import Liabilities from "./liabilities";

const App = (props) => {
  const totalUp = (objToTotal) => {
    let total = 0;
    for (const key in objToTotal) {
      let element = objToTotal[key];
      if (key != "passive") {
        if (Array.isArray(element)) {
          for (let index = 0; index < element.length; index++) {
            const item = element[index];
            total = total + item.value;
          }
        } else {
          total = total + element;
        }
      }
    }

    return total;
  };
  const [data, setdata] = useState({
    player: 3,
    profession: "Doctor",
    auditor: "player to the right",
    income: {
      salary: 13200,
      interest: [
        { name: "2Big", value: 30, key: 1 },
        { name: "thingy", value: 40, key: 2 },
        { name: "notherone", value: 50, key: 3 },
        { name: "notherone", value: 50, key: 4 },
        { name: "notherone", value: 50, key: 5 },
        { name: "notherone", value: 50, key: 6 },
      ],
      dividends: [],
      realEstate: [],
      businesses: [],
      passive: 0,
    },
    expenses: {
      taxes: 3420,
      mortgage: 1900,
      school: 750,
      car: 380,
      creditCard: 270,
      retail: 50,
      other: 2880,
      child: {
        count: 0,
        costPer: 640,
      },
      loan: 0,
    },
  });

  const [totalIncome, settotalIncome] = useState(totalUp(data.income));
  const [passive, setpassive] = useState(
    totalUp(data.income) - data.income.salary
  );
  return (
    <div className="app">
      <h1>Player card</h1>
      <h2>Profession: {data.profession}</h2>
      <h2>Player: {data.player}</h2>
      <h2>Auditor: {data.auditor}</h2>
      <h2>Income Statement</h2>
      <Income props={data.income} totalIncome={totalIncome} passive={passive} />
      <Expenses props={data.expenses} />
      <div className="hz">
        <Assets />
        <Liabilities />
      </div>
    </div>
  );
};

export default App;
