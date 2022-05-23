import React, { useState, useEffect } from "react";

const PayLoan = (props) => {
  const [loanAmount, setloanAmount] = useState(1000);

  useEffect(() => {
    if (props.data.expenses.loan < loanAmount) {
      setloanAmount(loanAmount - 1000);
    }
  }, [loanAmount]);

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
    newData.expenses.loan = newData.expenses.loan - loanAmount;
    props.setdata(newData);
    props.setcash(props.cash - loanAmount);
    props.setborrowLoan("NONE");
  };
  return (
    <div className="loan">
      <form className="v">
        <label>Paying In loan for: </label>
        <input
          type="number"
          value={loanAmount}
          onChange={(event) => {
            if (event.target.valueAsNumber % 5 == 4) {
              setloanAmount(
                Math.floor(event.target.valueAsNumber / 1000) * 1000
              );
            } else {
              setloanAmount(
                Math.ceil(event.target.valueAsNumber / 1000) * 1000
              );
            }
          }}
        ></input>
        <label>Will increase income by: {loanAmount / 10}</label>
        <button onClick={onSubmit} className="pay-loan">
          DO IT!
        </button>
      </form>
    </div>
  );
};

export default PayLoan;
