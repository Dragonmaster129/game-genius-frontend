import React from "react";

const Expenses = (props) => {
  const showData = (obj) => {
    return obj[0].monthly.toLocaleString("en-US");
  };
  return (
    <div className="expenses hz">
      <div className="v">
        <h2>Expenses</h2>
        {props.propstaxes != 0 ? <h3>Taxes: {props.props.taxes}</h3> : ""}
        {props.props.mortgage.monthly != 0 ? (
          <h3>Home Mortgage: {showData(props.props.mortgage)}</h3>
        ) : (
          ""
        )}
        {props.props.school.monthly != 0 ? (
          <h3>School Loan Payment: {showData(props.props.school)}</h3>
        ) : (
          ""
        )}
        {props.props.car.monthly != 0 ? (
          <h3>Car Payment: {showData(props.props.car)}</h3>
        ) : (
          ""
        )}
        {props.props.creditCard.monthly != 0 ? (
          <h3>Credit Card Payment: {showData(props.props.creditCard)}</h3>
        ) : (
          ""
        )}
        {props.props.retail.monthly != 0 ? (
          <h3>Retail Payment: {showData(props.props.retail)}</h3>
        ) : (
          ""
        )}
        {props.props.other != 0 ? (
          <h3>Other Expenses: {props.props.other.toLocaleString("en-US")}</h3>
        ) : (
          ""
        )}
        {props.props.child.count != 0 ? (
          <h3>
            Child Expenses:{" "}
            {props.props.child[0].costPer * props.props.child[0].count}
          </h3>
        ) : (
          ""
        )}
        {props.props.loan != 0 ? (
          <h3>Bank Loan Payment: {props.props.loan / 10}</h3>
        ) : (
          ""
        )}
        {props.props.insurance != 0 ? (
          <h3>Insurance Cost: {props.props.insurance}</h3>
        ) : (
          ""
        )}
      </div>
      <div className="v">
        <h3>Number of Children: {props.props.child[0].count}</h3>
        <h3>Per Child Expense: {props.props.child[0].costPer}</h3>
        <h3>Total Expenses: {props.totalExpenses}</h3>
      </div>
    </div>
  );
};

export default Expenses;
