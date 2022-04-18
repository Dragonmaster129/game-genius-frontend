import React, { useState } from "react";
import Businesses from "./business";
import Dividends from "./dividends";

import Interest from "./interest";
import RealEstate from "./realEstate";

const Income = (props) => {
  const [incomeValues, setincomeValues] = useState(props);
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
        <h3>Salary: {incomeValues.props.salary}</h3>
        <Interest
          showData={showData}
          interest={incomeValues.props.interest}
          isOpen={interestIsOpen}
          click={() => setinterestIsOpen(!interestIsOpen)}
        />
        <Dividends
          showData={showData}
          dividends={incomeValues.props.dividends}
          isOpen={dividendsIsOpen}
          click={() => setdividendsIsOpen(!dividendsIsOpen)}
        />
        <RealEstate
          showData={showData}
          realEstate={incomeValues.props.realEstate}
          isOpen={realIsOpen}
          click={() => setrealIsOpen(!realIsOpen)}
        />
        <Businesses
          showData={showData}
          businesses={incomeValues.props.businesses}
          isOpen={businessIsOpen}
          click={() => setbusinessIsOpen(!businessIsOpen)}
        />
      </div>
      <div className="v">
        <h3>Passive Income: {incomeValues.props.passive}</h3>
        <h3>
          Total Income: {incomeValues.props.salary + incomeValues.props.passive}
        </h3>
      </div>
    </div>
  );
};

export default Income;
