import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Category = (props) => {
  return (
    <div className={props.className}>
      <h3 onClick={props.click}>
        {props.title + ":"}
        <FontAwesomeIcon icon={faAngleDown} />
      </h3>

      <div className={props.isOpen ? "" : "hidden"}>
        {props.showData(props.items)}
      </div>
    </div>
  );
};

export default Category;
