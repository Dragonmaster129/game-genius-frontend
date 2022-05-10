import React, { useState } from "react";
import buyItem from "../../functions/buyItem";

const choiceTypes = {
  NONE: {},
  STOCK: {
    name: ["NONE", "OK4U", "MYT4U"],
    option: ["NONE", "PUT", "CALL", "SHORT", "REGULAR"],
    costPerShare: "",
    amount: "",
    spent: "AUTOFILLED",
  },
  REALESTATE: {
    type: {
      NONE: 0,
      STARTERHOUSE: 1,
      "3/2 HOUSE": 1,
      DUPLEX: 2,
      "4PLEX": 4,
      "8PLEX": 8,
      APARTMENTCOMPLEX: "",
    },
    cost: "",
    mortgage: "",
    downpay: "",
    cashFlow: "",
  },
  D2Y: {
    type: {
      NONE: 0,
      "Card One": { cost: 200 },
      "Card Two": { cashflow: "" },
      "Card Three": { cashflow: "" },
    },
  },
  LAND: {
    amount: ["NONE", "20 Acres", "40 Acres"],
    cost: "",
    mortgage: "",
    downpay: "",
    cashFlow: "",
  },
  BUSINESS: "",
};

const Buy = (props) => {
  const [choiceOfItem, setchoiceOfItem] = useState("NONE");
  const [addedData, setaddedData] = useState({});
  const changeChoice = (selection) => {
    const value = selection.target.value.toUpperCase();
    if (choiceOfItem != value) {
      setchoiceOfItem(value);
      setaddedData({});
    }
  };
  const onChange = (event) => {
    let klass = event.target.className;
    let value = event.target.value;
    let newData = addedData;
    if (klass != "type" && klass != "name") {
      if (klass == "cashFlow") {
        newData["value"] = parseInt(value);
      } else {
        newData[klass] = parseInt(value);
      }
    } else {
      newData[klass] = value;
      newData["name"] = value;
    }
    setaddedData(newData);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("calling buyItem");
    buyItem(props, choiceOfItem, addedData, setaddedData);
  };
  // Creates the form which you fill in to get the assets
  const createForm = () => {
    let form = choiceTypes[choiceOfItem];
    let keys = Object.keys(form);
    return keys.map((key) => {
      if (Object.prototype.toString.call(form[key]) === "[object Object]") {
        let object = form[key];
        let objkeys = Object.keys(object);
        return (
          <div key={key}>
            <h3>{key}</h3>
            <select onChange={onChange} className={key}>
              {objkeys.map((objkey) => {
                return <option key={objkey}>{objkey}</option>;
              })}
            </select>
          </div>
        );
      } else if (Array.isArray(form[key])) {
        let arr = form[key];
        return (
          <div key={key}>
            <h3>{key}</h3>
            <select onChange={onChange} className={key}>
              {arr.map((item) => {
                return <option key={item}>{item}</option>;
              })}
            </select>
          </div>
        );
      } else if (form[key] == "") {
        return (
          <div key={key}>
            <h3>{key}</h3>
            <input type="text" onChange={onChange} className={key}></input>
          </div>
        );
      } else if (form[key] == "AUTOFILLED") {
        return (
          <div key={key}>
            <h3>{key}</h3>
            <h3>{(addedData.costPerShare * addedData.amount).toString()}</h3>
          </div>
        );
      }
    });
  };
  const createOptions = (values) => {
    let valuesKey = Object.keys(values);
    return valuesKey.map((value) => {
      return (
        <option onClick={changeChoice} value={value} key={value}>
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
        <form className="v">
          {createForm()}
          <button onClick={onSubmit}>BUY</button>
        </form>
      </div>
    </div>
  );
};

export default Buy;
