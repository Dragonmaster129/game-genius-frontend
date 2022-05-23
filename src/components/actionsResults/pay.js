import React, { useState } from "react";

const Pay = (props) => {
  const [amount, setamount] = useState(1);

  const onSubmit = (event) => {
    event.preventDefault();
    props.setcash(props.cash - amount);
    props.submitted("NONE");
  };
  return (
    <div>
      <h3>PAY</h3>
      <form>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(event) => {
            setamount(event.target.valueAsNumber);
          }}
        ></input>
        <button type="submit" onClick={onSubmit}>
          Pay
        </button>
      </form>
    </div>
  );
};

export default Pay;
