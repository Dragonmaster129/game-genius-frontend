import React, { useState } from "react";

const BorrowLoan = (props) => {
  const [loanAmount, setloanAmount] = useState(1000);

  const onSubmit = (event) => {
    event.preventDefault();
    let cData = props.data;
    let newData = {};
    for (const key in cData) {
      if (Object.hasOwnProperty.call(cData, key)) {
        const element = cData[key];
        newData[key] = element;
      }
    }
    newData.expenses.loan = newData.expenses.loan + loanAmount;
    props.setdata(newData);
    props.setcash(props.cash + loanAmount);
    props.setborrowLoan("NONE");
  };
  return (
    <div className="loan">
      <form className="v">
        <label>Taking out loan for: </label>
        <input
          type="number"
          value={loanAmount}
          onChange={(event) => {
            setloanAmount(Math.ceil(event.target.valueAsNumber / 1000) * 1000);
          }}
        ></input>
        <label>Will reduce income by: {loanAmount / 10}</label>
        <button onClick={onSubmit} className="borrow-loan">
          DO IT!
        </button>
      </form>
    </div>
  );
};

export default BorrowLoan;
