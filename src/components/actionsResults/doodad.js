import React, { useState } from "react";

const Doodad = (props) => {
  const [cashOut, setcashOut] = useState(0);
  const [doodadType, setdoodadType] = useState("NONE");
  const [cashflowOut, setcashflowOut] = useState(0);

  const onSubmit = (event) => {
    event.preventDefault();
    props.setcash(props.cash - cashOut);
    let cData = {};
    for (const key in props.data) {
      if (Object.hasOwnProperty.call(props.data, key)) {
        const element = props.data[key];
        cData[key] = element;
      }
    }
    cData.expenses.other = cData.expenses.other + cashflowOut;
    props.setdata(cData);
    props.submitted("NONE");
  };
  return (
    <div className="doodad-wrapper">
      <form>
        <select>
          <option
            onClick={() => {
              setdoodadType("NONE");
            }}
          >
            NONE
          </option>
          <option
            onClick={() => {
              setdoodadType("CASH");
            }}
          >
            CASH
          </option>
          <option
            onClick={() => {
              setdoodadType("CASHFLOW");
            }}
          >
            CASHFLOW
          </option>
          <option
            onClick={() => {
              setdoodadType("BOTH");
            }}
          >
            CASH AND CASHFLOW
          </option>
        </select>
        <label>
          <h3>DOODAD</h3>
        </label>
        {doodadType == "CASH" || doodadType == "BOTH" ? (
          <div>
            <label>CASH</label>
            <input
              type="number"
              value={cashOut}
              onChange={(event) => {
                setcashOut(event.target.valueAsNumber);
              }}
            ></input>
          </div>
        ) : (
          ""
        )}
        {doodadType == "CASHFLOW" || doodadType == "BOTH" ? (
          <div>
            <label>CASHFLOW</label>
            <input
              type="number"
              value={cashflowOut}
              onChange={(event) => {
                setcashflowOut(event.target.valueAsNumber);
              }}
            ></input>
          </div>
        ) : (
          ""
        )}
        <button onClick={onSubmit}>Get the Doodad</button>
      </form>
    </div>
  );
};

export default Doodad;
