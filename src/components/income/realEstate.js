import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const RealEstate = (props) => {
  return (
    <div className="real-estate">
      <h3 onClick={props.click}>
        Real Estate:
        <FontAwesomeIcon icon={faAngleDown} />
      </h3>

      <div className={props.isOpen ? "" : "hidden"}>
        {props.showData(props.realEstate)}
      </div>
    </div>
  );
};

export default RealEstate;
