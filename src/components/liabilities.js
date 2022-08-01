import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Liabilities = (props) => {
  const [isOpen, setisOpen] = useState(false);

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
    <div className="v" onClick={() => setisOpen(!isOpen)}>
      <h2>
        Liabilities{" "}
        {props.windowDimenion.winWidth <= 650 ? (
          <FontAwesomeIcon icon={faAngleDown} />
        ) : (
          ""
        )}
      </h2>
      {isOpen || props.windowDimenion.winWidth >= 650 ? (
        <div>
          <h3>
            Home Mortgage:{" "}
            {props.props.mortgage[0].totalCost.toLocaleString("en-US")}
          </h3>
          <h3>
            School Loans:{" "}
            {props.props.school[0].totalCost.toLocaleString("en-US")}
          </h3>
          <h3>
            Car Loans: {props.props.car[0].totalCost.toLocaleString("en-US")}
          </h3>
          <h3>
            Credit Cards:{" "}
            {props.props.creditCard[0].totalCost.toLocaleString("en-US")}
          </h3>
          <h3>
            Retail Debt:{" "}
            {props.props.retail[0].totalCost.toLocaleString("en-US")}
          </h3>
          <h3>RE Mortgage: {showRE(props.re)}</h3>
        </div>
      ) : (
        ""
      )}
      <h3>Bank Loan: {props.props.loan.toLocaleString("en-US")}</h3>
    </div>
  );
};

export default Liabilities;
