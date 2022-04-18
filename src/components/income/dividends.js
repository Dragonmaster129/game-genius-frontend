import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Dividends = (props) => {
  return (
    <div className="dividends">
      <h3 onClick={props.click}>
        Dividends:
        <FontAwesomeIcon icon={faAngleDown} />
      </h3>

      <div className={props.isOpen ? "" : "hidden"}>
        {props.showData(props.dividends)}
      </div>
    </div>
  );
};

export default Dividends;
