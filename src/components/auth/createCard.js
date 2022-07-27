import axios from "axios";
import React, { useState, useEffect } from "react";
import { SERVER_HOST } from "../constants";

const CreateCard = (props) => {
  const [cardType, setcardType] = useState("capitalgain");
  const [cashflow, setcashflow] = useState(0);
  const [cash, setcash] = useState(0);
  const [baby, setbaby] = useState(false);
  const [title, settitle] = useState("");
  const [cashflowType, setcashflowType] = useState("other");
  const [description, setdescription] = useState("");
  const [stockOption, setstockOption] = useState("regular");
  const [d2yOption, setd2yOption] = useState("card1");

  const [objectToSend, setobjectToSend] = useState({ title: "" });
  const [typeDropdown, settypeDropdown] = useState("realestate");
  const [currentMode, setcurrentMode] = useState("create");

  const [result, setresult] = useState("");
  const [cardList, setcardList] = useState({
    beginning: [],
    capitalgain: [],
    cashflow: [],
    doodad: [],
    market: [],
  });

  const [format, setformat] = useState({
    doodad: {
      title: "",
      description: "",
      cash: 0,
      cashflow: 0,
      category: "",
    },

    market: {
      title: "",
      description: "",
      type: "",
      name: "",
      highest: true,
      price: 0,
      bankrupt: true,
      size: 0,
      value: 0,
      property: {},
      forcedSale: true,
      target: "",
    },

    capitalgain: {
      title: "",
      description: "",
      card: {
        type: "",
        name: "",
      },
    },

    cashflow: {
      title: "",
      description: "",
      card: {
        type: "",
        name: "",
      },
    },

    beginning: {
      title: "",
      description: "",
      cash: 0,
      stock: {},
      realestate: {},
    },
  });

  useEffect(() => {
    setresult("");
  }, [cardType, cashflow, cash, baby, cashflowType, description]);

  useEffect(() => {
    settypeDropdown("realestate");
    setobjectToSend(format[cardType]);
  }, [cardType]);

  useEffect(() => {
    if (currentMode === "create") {
      let object = {};
      for (let key in objectToSend) {
        object[key] = objectToSend[key];
      }
      if (cardType === "capitalgain") {
        object["card"] = { type: "", name: "" };
        if (typeDropdown === "realestate") {
          object["card"]["size"] = 1;
          object["card"]["cost"] = 0;
          object["card"]["mortgage"] = 0;
          object["card"]["downpay"] = 0;
          object["card"]["value"] = 0;
        } else if (typeDropdown === "stock") {
          object["card"]["option"] = "";
          object["card"]["costPerShare"] = 0;
          if (stockOption === "call" || stockOption === "put") {
            object["card"]["strikePrice"] = 0;
          }
        } else if (typeDropdown === "d2y") {
          object["card"]["cost"] = 200;
          object["card"]["downpay"] = 200;
        }
      } else if (cardType === "cashflow") {
        object["card"] = { type: "", name: "" };
        if (typeDropdown === "realestate") {
          object["card"]["size"] = 1;
          object["card"]["cost"] = 0;
          object["card"]["mortgage"] = 0;
          object["card"]["downpay"] = 0;
          object["card"]["value"] = 0;
        } else if (typeDropdown === "d2y") {
          object["card"]["name"] = "card1";
          object["card"]["cost"] = 200;
          object["card"]["downpay"] = 200;
        }
      }
      setobjectToSend(object);
    }
  }, [typeDropdown, stockOption]);

  useEffect(() => {
    if (cardType === "cashflow") {
      if (typeDropdown === "d2y") {
        let object = {};

        for (let key in objectToSend) {
          object[key] = objectToSend[key];
        }
        if (d2yOption === "card1") {
          object["card"]["cost"] = 200;
          object["card"]["downpay"] = 200;
          delete object["card"]["value"];
        } else {
          object["card"]["value"] = 500;
          delete object["card"]["cost"];
          delete object["card"]["downpay"];
        }
        setobjectToSend(object);
      }
    }
  }, [d2yOption]);

  useEffect(() => {
    axios
      .get(`${SERVER_HOST}/cards`)
      .then((res) => {
        console.log(res);
        setcardList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function doodadSubmit(event) {
    event.preventDefault();
    axios
      .post(`${SERVER_HOST}/card/add/doodad`, {
        cardType: cardType,
        cashflow: cashflow,
        cash: cash,
        baby: baby,
        cashflowType: cashflowType,
        token: props.credentials,
        title: title,
        description: description,
      })
      .then((res) => {
        setresult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function HandleChange({ target }) {
    let smallObject = {};
    let keys = Object.keys(objectToSend);
    let key = target.name;
    keys.forEach((element) => {
      smallObject[element] = objectToSend[element];
    });
    if (key.includes(".")) {
      let keyArr = key.split(".");
      smallObject[keyArr[0]][keyArr[1]] = target.value;
    } else {
      smallObject[key] = target.value;
    }
    setobjectToSend(smallObject);
  }

  function generateInput(key, type, value) {
    return (
      <div key={key} className="v">
        <label>{key[0].toUpperCase() + key.substring(1)}</label>
        <input
          type={type}
          name={key}
          value={value}
          onChange={HandleChange}
        ></input>
      </div>
    );
  }

  function generateDropdown(value, setter, options) {
    return (
      <select
        key={value}
        value={value}
        onChange={(event) => {
          setter(event.target.value);
        }}
      >
        {options.map((optionValue) => {
          return (
            <option key={optionValue} value={optionValue}>
              {optionValue}
            </option>
          );
        })}
      </select>
    );
  }

  function ShowCreateCardChoices(types) {
    let keys = Object.keys(objectToSend);
    let mapping = keys.map((key) => {
      if (typeof objectToSend[key] === "string") {
        return generateInput(key, "text", objectToSend[key]);
      } else if (typeof objectToSend[key] === "number") {
        return generateInput(key, "number", objectToSend[key]);
      } else if (typeof objectToSend[key] === "object") {
        return Object.keys(objectToSend[key]).map((field) => {
          if (field === "type") {
            return null;
          } else if (field === "option") {
            return null;
          } else if (
            typeDropdown === "d2y" &&
            field === "name" &&
            cardType === "cashflow"
          ) {
            return null;
          }
          return generateInput(
            key + "." + field,
            "text",
            objectToSend[key][field]
          );
        });
      }
    });
    if (typeDropdown === "stock") {
      mapping.unshift(
        generateDropdown(stockOption, setstockOption, [
          "regular",
          "call",
          "put",
          "short",
        ])
      );
    }
    if (typeDropdown === "d2y" && cardType === "cashflow") {
      mapping.unshift(
        generateDropdown(d2yOption, setd2yOption, ["card1", "card2", "card3"])
      );
    }
    mapping.unshift(generateDropdown(typeDropdown, settypeDropdown, types));
    return mapping;
  }

  function sendCard() {
    console.log(objectToSend);
  }

  function ShowCards(collection) {
    return cardList[collection].map((card) => {
      return (
        <div key={card.ID} className="card">
          <h4>{mapAllValuesAndKeys(card)}</h4>
          <h3
            onClick={(event) => {
              axios
                .get(`${SERVER_HOST}/getcard`, {
                  params: {
                    auth: props.credentials,
                    ID: event.target.accessKey,
                    collection: collection,
                  },
                })
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => console.log(err));
            }}
            accessKey={card["ID"]}
          >
            Edit
          </h3>
        </div>
      );
    });
  }

  function doodad() {
    return (
      <div className="v">
        <label>CashFlow</label>
        <input
          type="number"
          value={cashflow}
          onChange={(event) => setcashflow(event.target.value)}
        ></input>
        {cashflow > 0 ? (
          <div>
            <select
              value={cashflowType}
              onChange={(event) => {
                setcashflowType(event.target.value);
              }}
            >
              <option value="taxes">Taxes</option>
              <option value="mortgage">Mortgage</option>
              <option value="school">School</option>
              <option value="car">Car</option>
              <option value="creditCard">CreditCard</option>
              <option value="retail">Retail</option>
              <option value="other">Other</option>
              <option value="child">Child</option>
              <option value="loan">Loan</option>
            </select>
          </div>
        ) : (
          ""
        )}
        <label>Cash</label>
        <input
          type="number"
          value={cash}
          onChange={(event) => setcash(event.target.value)}
        ></input>
        <div className="hz">
          <input
            type="checkbox"
            checked={baby}
            onChange={(event) => setbaby(!baby)}
          ></input>
          <label>Needs Baby?</label>
        </div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(event) => settitle(event.target.value)}
        ></input>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(event) => {
            setdescription(event.target.value);
          }}
        ></textarea>
        <button onClick={doodadSubmit}>Submit</button>
      </div>
    );
  }

  function mapAllValuesAndKeys(card) {
    let returnValue = [];
    let string = "";
    for (const key in card) {
      string = { [key]: card[key] };
      returnValue.push(string);
    }
    return returnValue.map((item) => {
      if (
        typeof Object.values(item)[0] == "string" ||
        typeof Object.values(item)[0] == "number"
      ) {
        return (
          <div key={Object.keys(item)}>
            {Object.keys(item)}: {Object.values(item)}
          </div>
        );
      } else {
        if (Object.values(item)[0][0] == undefined) {
          return (
            <div key={Object.keys(item)[0]}>{Object.keys(item)[0]}: []</div>
          );
        } else {
          return (
            <div className="inner" key={Object.keys(item)[0]}>
              {Object.keys(item)[0]}:{" {"}
              {mapAllValuesAndKeys(Object.values(item)[0][0])}
              {"}"}
            </div>
          );
        }
      }
    });
  }

  return (
    <div className="create-card-wrapper">
      <div className="card-form-wrapper">
        <h1>CreateCard</h1>
        <form>
          <select
            value={cardType}
            onChange={(event) => {
              setcardType(event.target.value);
            }}
          >
            <option value="beginning">Beginning Investment Portfolio</option>
            <option value="capitalgain">Capital Gain Deal</option>
            <option value="cashflow">CashFlow Deal</option>
            <option value="doodad">Doodad</option>
            <option value="market">Market</option>
          </select>
          {cardType == "beginning" ? ShowCreateCardChoices() : ""}
          {cardType == "capitalgain"
            ? ShowCreateCardChoices(["stock", "realestate", "d2y"])
            : ""}
          {cardType == "cashflow"
            ? ShowCreateCardChoices(["stock", "realestate", "d2y"])
            : ""}
          {cardType == "doodad" ? doodad() : ""}
          {cardType == "market"
            ? ShowCreateCardChoices(["stock", "realestate"])
            : ""}
        </form>
        {result == "" ? (
          ""
        ) : result ? (
          <div>Card Submitted</div>
        ) : (
          <div>Card Failed to submit, try logging in</div>
        )}
      </div>
      <div className="card-wrapper">
        <div>
          <h1>Beginning Investment Portfolios</h1>
          {ShowCards("beginning")}
        </div>
        <hr />
        <div>
          <h1>Capital Gain</h1>
          {ShowCards("capitalgain")}
        </div>
        <hr />
        <div>
          <h1>Cash Flow</h1>
          {ShowCards("cashflow")}
        </div>
        <hr />
        <div>
          <h1>Doodad</h1>
          {ShowCards("doodad")}
        </div>
        <hr />
        <div>
          <h1>Market</h1>
          {ShowCards("market")}
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
