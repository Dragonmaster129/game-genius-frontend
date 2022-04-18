import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Interest = (props) => {
  return (
    <div className="interest">
      <h3 onClick={props.click}>
        Interest:
        <FontAwesomeIcon icon={faAngleDown} />
      </h3>

      <div className={props.isOpen ? "" : "hidden"}>
        {props.showData(props.interest)}
      </div>
    </div>
  );
};

export default Interest;
