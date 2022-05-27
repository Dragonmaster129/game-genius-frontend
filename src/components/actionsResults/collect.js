import React, { useState } from "react";

const Collect = (props) => {
  const [amount, setamount] = useState(100);

  const onSubmit = (event) => {
    event.preventDefault();
    props.setcash(props.cash + amount);
    props.submitted("NONE");
  };
  return (
    <div>
      <h3>COLLECT</h3>
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
          Collect
        </button>
      </form>
    </div>
  );
};

export default Collect;
