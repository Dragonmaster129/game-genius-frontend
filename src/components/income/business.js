import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Businesses = (props) => {
  return (
    <div className="business">
      <h3 onClick={props.click}>
        Businesses:
        <FontAwesomeIcon icon={faAngleDown} />
      </h3>

      <div className={props.isOpen ? "" : "hidden"}>
        {props.showData(props.businesses)}
      </div>
    </div>
  );
};

export default Businesses;
