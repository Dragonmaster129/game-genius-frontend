import React, { useState } from "react";

import Category from "./category";

import totalUp from "../../functions/totalUp";

const Income = (props) => {
  const [incomeValues, setincomeValues] = useState(props.props);
  const [interestIsOpen, setinterestIsOpen] = useState(false);
  const [dividendsIsOpen, setdividendsIsOpen] = useState(false);
  const [realIsOpen, setrealIsOpen] = useState(false);
  const [businessIsOpen, setbusinessIsOpen] = useState(false);
  const showData = (dataArr) => {
    return dataArr.map((item) => {
      return (
        <div className="item hz" key={item.key}>
          <div>{item.name}:</div>
          <div>{item.value}</div>
        </div>
      );
    });
  };
  return (
    <div className="income-wrapper">
      <h2 className="title">Income</h2>

      <div className="hz">
        <div className="v income-categories">
          <h3>Salary: {incomeValues.salary}</h3>
          <Category
            showData={showData}
            items={incomeValues.interest}
            isOpen={interestIsOpen}
            click={() => setinterestIsOpen(!interestIsOpen)}
            className="interest"
            title="Interest"
            totalValue={totalUp(incomeValues.interest)}
          />
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
            items={incomeValues.realEstate}
            isOpen={realIsOpen}
            click={() => setrealIsOpen(!realIsOpen)}
            className="real-estate"
            title="Real Estate"
            totalValue={totalUp(incomeValues.realEstate)}
          />
          <Category
            showData={showData}
            items={incomeValues.businesses}
            isOpen={businessIsOpen}
            click={() => setbusinessIsOpen(!businessIsOpen)}
            className="businesses"
            title="Businesses"
            totalValue={totalUp(incomeValues.businesses)}
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
