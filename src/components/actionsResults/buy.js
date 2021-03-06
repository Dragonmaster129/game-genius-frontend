import React, { useEffect, useState } from "react";
import buyItem from "../../functions/buyItem";

const choiceTypes = {
  NONE: {},
  STOCK: {
    name: ["NONE", "OK4U", "MYT4U"],
    option: ["NONE", "PUT", "CALL", "SHORT", "REGULAR"],
    costPerShare: "",
    amount: "",
  },
  REALESTATE: {
    type: {
      NONE: 0,
      STARTERHOUSE: 1,
      "3/2 HOUSE": 1,
      DUPLEX: 2,
      "4PLEX": 4,
      "8PLEX": 8,
      "12APARTMENTCOMPLEX": 12,
      "16APARTMENTCOMPLEX": 16,
      "24APARTMENTCOMPLEX": 24,
      "30APARTMENTCOMPLEX": 30,
      "50APARTMENTCOMPLEX": 50,
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
    size: ["NONE", 20, 40],
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
  const [needLoan, setneedLoan] = useState(false);
  const [spending, setspending] = useState(0);

  useEffect(() => {
    if (addedData.costPerShare && addedData.value) {
      setspending(addedData.costPerShare * addedData.value);
    }
  }, [addedData.costPerShare, addedData.value, addedData]);

  useEffect(() => {
    if (addedData.downpay > props.cash) {
      setneedLoan(true);
    } else if (addedData.downpay < props.cash) {
      setneedLoan(false);
    }
  }, [props.cash]);

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
    if (klass == "downpay" && value > props.cash) {
      setspending(value);
      setneedLoan(true);
    } else if (klass == "downpay" && value < props.cash) {
      setspending(value);
      setneedLoan(false);
    }
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
    if (!needLoan) {
      buyItem(props, choiceOfItem, addedData, setaddedData);
    }
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
            <select onChange={onChange} className={key} required>
              {objkeys.map((objkey) => {
                return (
                  <option
                    key={objkey}
                    data-testid={objkey}
                    className={key}
                    onClick={onChange}
                  >
                    {objkey}
                  </option>
                );
              })}
            </select>
          </div>
        );
      } else if (Array.isArray(form[key])) {
        let arr = form[key];
        return (
          <div key={key}>
            <h3>{key}</h3>
            <select onChange={onChange} className={key} required>
              {arr.map((item) => {
                return (
                  <option key={item} onClick={onChange} className={key}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        );
      } else if (form[key] == "") {
        return (
          <div key={key}>
            <h3>{key}</h3>
            <input
              type="number"
              onChange={onChange}
              className={key}
              data-testid={key}
              required
            ></input>
          </div>
        );
      }
    });
  };

  const createOptions = (values) => {
    let valuesKey = Object.keys(values);
    return valuesKey.map((value) => {
      return (
        <option
          onClick={changeChoice}
          value={value}
          key={value}
          data-testid={value}
        >
          {value}
        </option>
      );
    });
  };

  return (
    <div className="buy">
      <select
        name="select-item-to-buy"
        className="buy-choice"
        data-testid="header-target"
      >
        {createOptions(choiceTypes)}
      </select>
      <div>
        <h1>{choiceOfItem}</h1>
        <form className="v">
          {createForm()}
          <label>Spending:</label>
          {spending.toLocaleString("en-US")}
          <label>
            <h3>Cash:</h3>
          </label>
          <h3>{props.cash.toLocaleString("en-US")}</h3>
          {needLoan ? <h4>NEED TO TAKE A LOAN OUT</h4> : ""}
          <button onClick={onSubmit}>BUY</button>
        </form>
      </div>
    </div>
  );
};

export default Buy;
