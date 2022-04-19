import React, { useState } from "react";

import Category from "./category";

const Income = (props) => {
  const [incomeValues, setincomeValues] = useState(props.props);
  const [interestIsOpen, setinterestIsOpen] = useState(false);
  const [dividendsIsOpen, setdividendsIsOpen] = useState(false);
  const [realIsOpen, setrealIsOpen] = useState(false);
  const [businessIsOpen, setbusinessIsOpen] = useState(false);
  const showData = (dataArr) => {
    return dataArr.map((item) => {
      return (
        <div className="item" key={item.key}>
          {item.name}: {item.value}
        </div>
      );
    });
  };
  return (
    <div className="hz">
      <div className="v">
        <h2>Income</h2>
        <h3>Salary: {incomeValues.salary}</h3>
        <Category
          showData={showData}
          items={incomeValues.interest}
          isOpen={interestIsOpen}
          click={() => setinterestIsOpen(!interestIsOpen)}
          className="interest"
          title="Interest"
        />
        <Category
          showData={showData}
          items={incomeValues.dividends}
          isOpen={dividendsIsOpen}
          click={() => setdividendsIsOpen(!dividendsIsOpen)}
          className="dividends"
          title="Dividends"
        />
        <Category
          showData={showData}
          items={incomeValues.realEstate}
          isOpen={realIsOpen}
          click={() => setrealIsOpen(!realIsOpen)}
          className="real-estate"
          title="Real Estate"
        />
        <Category
          showData={showData}
          items={incomeValues.businesses}
          isOpen={businessIsOpen}
          click={() => setbusinessIsOpen(!businessIsOpen)}
          classname="businesses"
          title="Businesses"
        />
      </div>
      <div className="v">
        <h3>Passive Income: {props.passive}</h3>
        <h3>Total Income: {props.totalIncome}</h3>
      </div>
    </div>
  );
};

export default Income;
