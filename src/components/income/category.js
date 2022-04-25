import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Category = (props) => {
  return (
    <div className={props.className + " category"}>
      <h3 className="category-click" onClick={props.click}>
        {props.title + ":" + props.totalValue}
        <FontAwesomeIcon icon={faAngleDown} />
      </h3>

      <div className={props.isOpen ? "item-wrapper" : "item-wrapper hidden"}>
        {props.showData(props.items)}
      </div>
    </div>
  );
};

export default Category;
