import React, { useState } from "react";

import Category from "./category";

import totalUp from "../../functions/totalUp";

const Income = (props) => {
  const [dividendsIsOpen, setdividendsIsOpen] = useState(false);
  const [realIsOpen, setrealIsOpen] = useState(false);
  const [landIsOpen, setlandIsOpen] = useState(false);
  const [businessIsOpen, setbusinessIsOpen] = useState(false);
  const showData = (dataArr, isOpen) => {
    if (isOpen) {
      return dataArr.map((item) => {
        return (
          <div className="item hz" key={item.key}>
            <div>{item.name}:</div>
            <div>{item.value ? item.value.toLocaleString("en-US") : ""}</div>
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
          <h3>Salary: {props.props.salary}</h3>
          <Category
            showData={showData}
            items={props.props.dividends}
            isOpen={dividendsIsOpen}
            click={() => setdividendsIsOpen(!dividendsIsOpen)}
            className="dividends"
            title="Dividends"
            totalValue={totalUp(props.props.dividends)}
          />
          <Category
            showData={showData}
            items={props.props.realestate}
            isOpen={realIsOpen}
            click={() => setrealIsOpen(!realIsOpen)}
            className="real-estate"
            title="Real Estate"
            totalValue={totalUp(props.props.realestate)}
          />
          <Category
            showData={showData}
            items={props.props.land}
            isOpen={landIsOpen}
            click={() => setlandIsOpen(!landIsOpen)}
            className="land"
            title="Land"
            totalValue={totalUp(props.props.land)}
          />
          <Category
            showData={showData}
            items={props.props.business}
            isOpen={businessIsOpen}
            click={() => setbusinessIsOpen(!businessIsOpen)}
            className="business"
            title="Business"
            totalValue={totalUp(props.props.business)}
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
