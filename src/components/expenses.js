import React from "react";

const Expenses = (props) => {
  return (
    <div className="expenses hz">
      <div className="v">
        <h2>Expenses</h2>
        <h3>Taxes: {props.taxes}</h3>
        <h3>Home Mortgage: {props.mortgage}</h3>
        <h3>School Loan Payment</h3>
        <h3>Car Payment</h3>
        <h3>Credit Card Payment</h3>
        <h3>Retail Payment</h3>
        <h3>Other Expenses</h3>
        <h3>Child Expenses</h3>
        <h3>Bank Loan Payment</h3>
      </div>
      <div className="v">
        <h3>Number of Children</h3>
        <h3>Per Child Expense</h3>
        <h3>Total Expenses</h3>
        <h3>Monthly Cash Flow</h3>
      </div>
    </div>
  );
};

export default Expenses;
