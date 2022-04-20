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
      if (key != "passive" && key != "loan") {
        if (Array.isArray(element)) {
          for (let index = 0; index < element.length; index++) {
            const item = element[index];
            if (item.value) {
              total = total + item.value;
            }
          }
        } else if (
          Object.prototype.toString.call(element) === "[object Object]"
        ) {
          if (element.monthly) {
            total = total + element.monthly;
          } else {
            total = total + element.count * element.costPer;
          }
        } else {
          total = total + element;
        }
      } else if (key == "loan") {
        total = total + element / 10;
      }
    }

    return total;
  };
  const [data, setdata] = useState({
    player: 3,
    profession: "Doctor",
    auditor: "player to the right",
    assets: {
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
      realEstate: [
        {
          type: "3/2",
          name: "3/2 House",
          cost: 55000,
          downpay: 5000,
          value: 200,
          key: 1,
        },
      ],
      businesses: [],
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
  return (
    <div className="app">
      <h1>Player card</h1>
      <h2>Profession: {data.profession}</h2>
      <h2>Player: {data.player}</h2>
      <h2>Auditor: {data.auditor}</h2>
      <h2>Income Statement</h2>
      <Income props={data.assets} totalIncome={totalIncome} passive={passive} />
      <Expenses
        props={data.expenses}
        totalExpenses={totalExpenses}
        cashflow={cashflow}
      />
      <div className="hz">
        <Assets props={data.assets} />
        <Liabilities props={data.expenses} re={data.assets.realEstate} />
      </div>
    </div>
  );
};

export default App;
