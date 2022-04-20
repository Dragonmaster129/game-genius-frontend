import React, { useState } from "react";

const Expenses = (props) => {
  const [expenses, setExpenses] = useState(props.props);
  return (
    <div className="expenses hz">
      <div className="v">
        <h2>Expenses</h2>
        <h3>Taxes: {expenses.taxes}</h3>
        <h3>Home Mortgage: {expenses.mortgage}</h3>
        <h3>School Loan Payment: {expenses.school}</h3>
        <h3>Car Payment: {expenses.car}</h3>
        <h3>Credit Card Payment: {expenses.creditCard}</h3>
        <h3>Retail Payment: {expenses.retail}</h3>
        <h3>Other Expenses: {expenses.other}</h3>
        <h3>Child Expenses: {expenses.child.costPer * expenses.child.count}</h3>
        <h3>Bank Loan Payment: {expenses.loan}</h3>
      </div>
      <div className="v">
        <h3>Number of Children: {expenses.child.count}</h3>
        <h3>Per Child Expense: {expenses.child.costPer}</h3>
        <h3>Total Expenses: {props.totalExpenses}</h3>
        <h3>Monthly Cash Flow: {props.cashflow}</h3>
      </div>
    </div>
  );
};

export default Expenses;
