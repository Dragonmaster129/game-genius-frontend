import React, { useState } from "react";

import Income from "./income";
import Expenses from "./expenses";
import Assets from "./assets";
import Liabilities from "./liabilities";

const App = (props) => {
  const [value, setValue] = useState({
    player: 3,
    profession: "Doctor",
    auditor: "player to the right",
  });
  return (
    <div className="app">
      <h1>Player card</h1>
      <h2>Profession: {value.profession}</h2>
      <h2>Player: {value.player}</h2>
      <h2>Auditor: {value.auditor}</h2>
      <h2>Income Statement</h2>
      <Income />
      <Expenses />
      <div className="hz">
        <Assets />
        <Liabilities />
      </div>
    </div>
  );
};

export default App;
