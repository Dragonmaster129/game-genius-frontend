import React, { useState } from "react";

import Category from "./category";

import totalUp from "../../functions/totalUp";

const Income = (props) => {
  const [incomeValues, setincomeValues] = useState(props.props);
  const [dividendsIsOpen, setdividendsIsOpen] = useState(false);
  const [realIsOpen, setrealIsOpen] = useState(false);
  const [landIsOpen, setlandIsOpen] = useState(false);
  const showData = (dataArr, isOpen) => {
    if (isOpen) {
      return dataArr.map((item) => {
        return (
          <div className="item hz" key={item.key}>
            <div>{item.name}:</div>
            <div>{item.value.toLocaleString("en-US")}</div>
          </div>
        );
      });
    }
  };
  return (
    <div className="income-wrapper">
      <h2 className="title">Income</h2>

      <div className="hz">
        <div className="v income-categories">
          <h3>Salary: {incomeValues.salary}</h3>
          <Category
            showData={showData}
            items={incomeValues.dividends}
            isOpen={dividendsIsOpen}
            click={() => setdividendsIsOpen(!dividendsIsOpen)}
            className="dividends"
            title="Dividends"
            totalValue={totalUp(incomeValues.dividends)}
          />
          <Category
            showData={showData}
            items={incomeValues.realestate}
            isOpen={realIsOpen}
            click={() => setrealIsOpen(!realIsOpen)}
            className="real-estate"
            title="Real Estate"
            totalValue={totalUp(incomeValues.realestate)}
          />
          <Category
            showData={showData}
            items={incomeValues.land}
            isOpen={landIsOpen}
            click={() => setlandIsOpen(!landIsOpen)}
            className="land"
            title="Land"
            totalValue={totalUp(incomeValues.land)}
          />
        </div>
        <div className="v income-main">
          <h3>Passive Income: {props.passive}</h3>
          <h3>Total Income: {props.totalIncome}</h3>
        </div>
      </div>
    </div>
  );
};

export default Income;
