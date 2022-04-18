import React, { useState } from "react";

import Income from "./income/income";
import Expenses from "./expenses";
import Assets from "./assets";
import Liabilities from "./liabilities";

const App = (props) => {
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
      ],
      dividends: [],
      realEstate: [],
      businesses: [],
      passive: 120,
    },
    expenses: {
      taxes: 3420,
      mortgage: 1900,
      school: 750,
      car: 380,
      creditCard: 270,
      retail: 50,
      other: 2880,
      child: 0,
      loan: 0,
    },
  });
  return (
    <div className="app">
      <h1>Player card</h1>
      <h2>Profession: {data.profession}</h2>
      <h2>Player: {data.player}</h2>
      <h2>Auditor: {data.auditor}</h2>
      <h2>Income Statement</h2>
      <Income props={data.income} />
      <Expenses props={data.expenses} />
      <div className="hz">
        <Assets />
        <Liabilities />
      </div>
    </div>
  );
};

export default App;
