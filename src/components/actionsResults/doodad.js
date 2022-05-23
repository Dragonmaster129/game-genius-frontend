import React, { useState } from "react";

const Doodad = (props) => {
  const [cashOut, setcashOut] = useState(1);
  const [cashflowDetrement, setcashflowDetrement] = useState("NONE");

  const onChange = () => {};

  const onSubmit = (event) => {
    event.preventDefault();
    props.setcash(props.cash - cashOut);
    let cData = props.data;
    props.submitted("NONE");
  };
  return (
    <div className="doodad-wrapper">
      <form>
        <select>
          <option onChange={onChange}>CASH</option>
          <option onChange={onChange}>CASHFLOW</option>
        </select>
        <label>DOODAD</label>
        <input
          type="number"
          value={cashOut}
          onChange={(event) => {
            setcashOut(event.target.valueAsNumber);
          }}
        ></input>
        <button onClick={onSubmit}>Get the Doodad</button>
      </form>
    </div>
  );
};

export default Doodad;
