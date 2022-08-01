import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Assets = (props) => {
  const [stocksIsOpen, setstocksIsOpen] = useState(false);
  const [realestateIsOpen, setrealestateIsOpen] = useState(false);
  const [landIsOpen, setlandIsOpen] = useState(false);

  const showData = (arr, isOpen) => {
    if (isOpen || props.windowDimenion.winWidth >= 650) {
      return arr.map((item) => {
        return (
          <div className="hz asset-item" key={item.key}>
            <div>
              {item.name + " "}
              {item.option ? item.option : ""}
            </div>
            <div>
              {item.amount
                ? item.amount.toLocaleString("en-US")
                : item.downpay.toLocaleString("en-US")}
            </div>
            <div>
              {item.costPerShare
                ? item.costPerShare.toLocaleString("en-US")
                : item.cost.toLocaleString("en-US")}
            </div>
          </div>
        );
      });
    }
  };
  return (
    <div className="v">
      <h2>Assets</h2>
      <div
        className="stock"
        onClick={() => {
          setstocksIsOpen(!stocksIsOpen);
        }}
      >
        <div className="hz">
          <h3>Stocks/Mutual's/CDs</h3>
          <h3>Number of Shares</h3>
          <h3>Cost/Share</h3>
          {props.windowDimenion.winWidth <= 650 ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : (
            ""
          )}
        </div>
        {props.props.stock[0] != undefined
          ? showData(props.props.stock, stocksIsOpen)
          : ""}
      </div>
      <div
        className="re"
        onClick={() => {
          setrealestateIsOpen(!realestateIsOpen);
        }}
      >
        <div className="hz heading">
          <h3>Real Estate</h3>
          <h3>Down Pay</h3>
          <h3>Cost</h3>
          {props.windowDimenion.winWidth <= 650 ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : (
            ""
          )}
        </div>
        {props.props.realestate[0] != undefined
          ? showData(props.props.realestate, realestateIsOpen)
          : ""}
      </div>
      <div
        className="land"
        onClick={() => {
          setlandIsOpen(!landIsOpen);
        }}
      >
        <div className="hz heading">
          <h3>Land</h3>
          <h3>Down Pay</h3>
          <h3>Cost</h3>
          {props.windowDimenion.winWidth <= 650 ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : (
            ""
          )}
        </div>
        {props.props.land[0] != undefined
          ? showData(props.props.land, landIsOpen)
          : ""}
      </div>
    </div>
  );
};

export default Assets;
