import React from "react";

const Assets = (props) => {
  const showData = (arr) => {
    return arr.map((item) => {
      return (
        <div className="hz asset-item" key={item.key}>
          <div>{item.name}</div>
          <div>
            {item.amount
              ? item.amount.toLocaleString("en-US")
              : item.downpay.toLocaleString("en-US")}
          </div>
          <div>
            {item.costPerShare
              ? item.costPerShare.toLocaleString("en-US")
              : item.cost.toLocaleString("en-US")}
          </div>
        </div>
      );
    });
  };
  return (
    <div className="v">
      <h2>Assets</h2>
      <h3>Savings</h3>
      <div className="stock">
        <div className="hz">
          <h3>Stocks/Mutual's/CDs</h3>
          <h3>Number of Shares</h3>
          <h3>Cost/Share</h3>
        </div>
        {showData(props.props.stock)}
      </div>
      <div className="re">
        <div className="hz heading">
          <h3>Real Estate</h3>
          <h3>Down Pay</h3>
          <h3>Cost</h3>
        </div>
        {showData(props.props.realestate)}
      </div>
      <div className="land">
        <div className="hz heading">
          <h3>Land</h3>
          <h3>Down Pay</h3>
          <h3>Cost</h3>
        </div>
        {showData(props.props.land)}
      </div>
    </div>
  );
};

export default Assets;
