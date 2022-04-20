import React from "react";

const Assets = (props) => {
  const showData = (arr) => {
    return arr.map((item) => {
      return (
        <div className="hz">
          <div>{item.name}</div>
          <div>{item.downpay}</div>
          <div>{item.cost}</div>
        </div>
      );
    });
  };
  return (
    <div className="v">
      <h2>Assets</h2>
      <h3>Savings</h3>
      <div className="hz">
        <h3>Stocks/Mutual's/CDs</h3>
        <h3>Number of Shares</h3>
        <h3>Cost/Share</h3>
      </div>
      <div className="re">
        <div className="hz heading">
          <h3>Real Estate</h3>
          <h3>Down Pay</h3>
          <h3>Cost</h3>
        </div>
        {showData(props.props.realEstate)}
      </div>
      <div className="hz">
        <h3>Business</h3>
        <h3>Down Pay</h3>
        <h3>Cost</h3>
      </div>
    </div>
  );
};

export default Assets;
