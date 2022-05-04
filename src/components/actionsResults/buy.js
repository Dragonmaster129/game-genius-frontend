import React, { useState } from "react";

const choiceTypes = {
  NONE: {},
  STOCK: {
    StockType: ["OK4U", "MYT4U"],
    TypeOfOption: ["PUT", "CALL", "SHORT", "REGULAR"],
    CostPerShare: "",
    NumberOfShares: "",
    Spent: "FILLED",
  },
  REALESTATE: {
    RealEstateType: {
      STARTERHOUSE: 1,
      HOUSE: 1,
      DUPLEX: 2,
      "4PLEX": 4,
      "8PLEX": 8,
      APARTMENTCOMPLEX: "",
    },
    Cost: "",
    Mortgage: "",
    Downpay: "",
    CashFlow: "",
  },
  // STARTERHOUSE: "",
  // HOUSE: "",
  // DUPLEX: "",
  // "4-PLEX": "",
  // "8-PLEX": "",
  // APARTMENTCOMPLEX: "",
  D2Y: "",
  LAND: "",
  BUSINESS: "",
};

const Buy = (props) => {
  const [choiceOfItem, setchoiceOfItem] = useState("NONE");
  const changeChoice = (selection) => {
    const value = selection.target.value.toUpperCase();
    if (choiceOfItem != value) {
      setchoiceOfItem(value);
    }
  };
  const createOptions = (values) => {
    let valuesKey = Object.keys(values);
    return valuesKey.map((value) => {
      return (
        <option onClick={changeChoice} value={value}>
          {value}
        </option>
      );
    });
  };
  return (
    <div className="buy">
      <select name="select-item-to-buy" className="buy-choice">
        {createOptions(choiceTypes)}
      </select>
      <div>
        <h1>{choiceOfItem}</h1>
        <form>
          <h3></h3>
          <input type="text"></input>
        </form>
      </div>
    </div>
  );
};

export default Buy;
