import React from "react";

const Liabilities = (props) => {
  const showRE = (re) => {
    return re.map((item) => {
      return (
        <div className="re-liability" key={item.key}>
          {item.name}: {item.mortgage.toLocaleString("en-US")}
        </div>
      );
    });
  };
  return (
    <div className="v">
      <h2>Liabilities</h2>
      <h3>
        Home Mortgage:{" "}
        {props.props.mortgage[0].totalCost.toLocaleString("en-US")}
      </h3>
      <h3>
        School Loans: {props.props.school[0].totalCost.toLocaleString("en-US")}
      </h3>
      <h3>Car Loans: {props.props.car[0].totalCost.toLocaleString("en-US")}</h3>
      <h3>
        Credit Cards:{" "}
        {props.props.creditCard[0].totalCost.toLocaleString("en-US")}
      </h3>
      <h3>
        Retail Debt: {props.props.retail[0].totalCost.toLocaleString("en-US")}
      </h3>
      <h3>RE Mortgage: {showRE(props.re)}</h3>
      <h3>Bank Loan: {props.props.loan.toLocaleString("en-US")}</h3>
    </div>
  );
};

export default Liabilities;
