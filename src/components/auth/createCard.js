import axios from "axios";
import React, { useState, useEffect } from "react";
import { SERVER_HOST } from "../constants";

const CreateCard = (props) => {
  const [cardType, setcardType] = useState("market");
  const [previousCardType, setpreviousCardType] = useState("");
  const [stockOption, setstockOption] = useState("regular");
  const [d2yOption, setd2yOption] = useState("card1");
  const [targetPlayer, settargetPlayer] = useState("player");
  const [cardName, setcardName] = useState("starterhouse");
  const [cardID, setcardID] = useState("");

  const [objectToSend, setobjectToSend] = useState({ title: "" });
  const [typeDropdown, settypeDropdown] = useState("realestate");
  const [currentMode, setcurrentMode] = useState("create");

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
    setobjectToSend(format[cardType]);
    settypeDropdown("realestate");
    setpreviousCardType(cardType);
  }, [cardType]);

  useEffect(() => {
    if (currentMode === "create") {
      let object = {};
      for (let key in objectToSend) {
        object[key] = objectToSend[key];
      }
      if (cardType === "capitalgain") {
        object["card"] = { type: typeDropdown, name: "" };
        if (typeDropdown === "realestate" || typeDropdown === "land") {
          object["card"]["name"] = cardName;
          object["card"]["size"] = objectToSend["card"]["size"] || 1;
          object["card"]["cost"] = objectToSend["card"]["cost"] || 0;
          object["card"]["mortgage"] = objectToSend["card"]["mortgage"] || 0;
          object["card"]["downpay"] = objectToSend["card"]["downpay"] || 0;
          object["card"]["value"] = objectToSend["card"]["value"] || 0;
        } else if (typeDropdown === "stock") {
          object["card"]["option"] =
            objectToSend["card"]["option"] || stockOption;
          object["card"]["costPerShare"] =
            objectToSend["card"]["costPerShare"] || 0;
          if (stockOption === "regular") {
            object["card"]["target"] = targetPlayer;
          }
          if (stockOption === "call" || stockOption === "put") {
            object["card"]["strikePrice"] =
              objectToSend["card"]["strikePrice"] || 0;
          }
        } else if (typeDropdown === "d2y") {
          object["card"]["name"] = objectToSend["card"]["name"] || "card1";
          object["card"]["cost"] = objectToSend["card"]["cost"] || 200;
          object["card"]["downpay"] = objectToSend["card"]["downpay"] || 200;
        }
      } else if (cardType === "cashflow") {
        object["card"] = { type: typeDropdown, name: "" };
        if (typeDropdown === "realestate") {
          object["card"]["name"] = cardName;
          object["card"]["size"] = objectToSend["card"]["size"] || 1;
          object["card"]["cost"] = objectToSend["card"]["cost"] || 0;
          object["card"]["mortgage"] = objectToSend["card"]["mortgage"] || 0;
          object["card"]["downpay"] = objectToSend["card"]["downpay"] || 0;
          object["card"]["value"] = objectToSend["card"]["value"] || 0;
        } else if (typeDropdown === "d2y") {
          object["card"]["name"] = objectToSend["card"]["name"] || "card1";
          object["card"]["cost"] = objectToSend["card"]["cost"] || 200;
          object["card"]["downpay"] = objectToSend["card"]["downpay"] || 200;
        } else if (typeDropdown === "royalty") {
          object["card"]["cost"] = objectToSend["card"]["name"] || 12000;
          object["card"]["downpay"] = objectToSend["card"]["downpay"] || 12000;
          object["card"]["value"] = objectToSend["card"]["value"] || 400;
        } else if (typeDropdown === "dividend") {
          object["card"]["cost"] = objectToSend["card"]["cost"] || 25000;
          object["card"]["downpay"] = objectToSend["card"]["downpay"] || 25000;
          object["card"]["value"] = objectToSend["card"]["value"] || 380;
        }
      } else if (cardType === "market") {
        object = {};
        for (const key in format[cardType]) {
          object[key] = objectToSend[key] || "";
        }
        object["type"] = typeDropdown;
        object["target"] = targetPlayer;
        if (typeDropdown === "realestate") {
          object["name"] = cardName;
          object["highest"] = objectToSend["highest"] || false;
          object["size"] = objectToSend["size"] || 1;
          object["price"] = objectToSend["price"] || 0;
          object["forcedSale"] = objectToSend["forcedSale"] || false;
        } else if (typeDropdown === "realestate Exchange") {
          object["newProperty"] = {
            name: cardName,
            size: objectToSend["newProperty"]["size"] || 1,
            cost: objectToSend["newProperty"]["cost"] || 0,
            mortgage: objectToSend["newProperty"]["mortgage"] || 0,
            downpay: objectToSend["newProperty"]["downpay"] || 0,
            value: objectToSend["newProperty"]["value"] || 0,
          };
        } else if (typeDropdown === "stock") {
          object["bankrupt"] = objectToSend["bankrupt"] || false;
          object["price"] = objectToSend["price"] || 0;
          object["forcedSale"] = objectToSend["forcedSale"] || false;
        } else if (typeDropdown === "d2y") {
          object["value"] = objectToSend["value"] || 7000;
        } else if (typeDropdown === "land") {
          object["size"] = objectToSend["size"] || 5;
          object["price"] = objectToSend["price"] || 0;
        }
      } else if (cardType === "beginning") {
        object["stock"] = {};
        object["stock"]["name"] = "";
        object["stock"]["option"] = "";
        object["stock"]["amount"] = 0;
        object["stock"]["costPerShare"] = 0;
        object["realestate"] = {};
        object["realestate"]["name"] = "";
        object["realestate"]["size"] = 1;
        object["realestate"]["cost"] = 0;
        object["realestate"]["mortgage"] = 0;
        object["realestate"]["downpay"] = 0;
        object["realestate"]["value"] = 0;
      }
      setobjectToSend(object);
    }
  }, [typeDropdown, stockOption, previousCardType, cardName, targetPlayer]);

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

  function generateDescription(key, type, value) {
    return (
      <div key={key} className="v">
        <label>{key[0].toUpperCase() + key.substring(1)}</label>
        <textarea
          type={type}
          name={key}
          value={value}
          onChange={HandleChange}
        ></textarea>
      </div>
    );
  }

  function generateDropdown(value, setter, options, label) {
    return (
      <div className="v" key={value}>
        <label>{label}</label>
        <select
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
      </div>
    );
  }

  function ShowCreateCardChoices(types) {
    let keys = Object.keys(objectToSend);
    let mapping = keys.map((key) => {
      if (key === "name" || key === "type") {
        return null;
      } else if (key === "target") {
        return generateDropdown(
          targetPlayer,
          settargetPlayer,
          ["you", "right", "all"],
          "Target Player"
        );
      } else if (key === "description") {
        return generateDescription(key, "text", objectToSend[key]);
      }
      if (typeof objectToSend[key] === "string") {
        return generateInput(key, "text", objectToSend[key]);
      } else if (typeof objectToSend[key] === "number") {
        return generateInput(key, "number", objectToSend[key]);
      } else if (typeof objectToSend[key] === "boolean") {
        return generateInput(key, "checkbox", objectToSend[key]);
      } else if (typeof objectToSend[key] === "object") {
        return Object.keys(objectToSend[key]).map((field) => {
          if (field === "type") {
            return null;
          } else if (field === "option") {
            return null;
          } else if (
            (typeDropdown !== "royalty" &&
              typeDropdown !== "dividend" &&
              field === "name" &&
              cardType === "cashflow") ||
            (typeDropdown === "realestate" && field === "name")
          ) {
            return null;
          } else if (field === "target") {
            return generateDropdown(
              targetPlayer,
              settargetPlayer,
              ["you", "right", "all"],
              "Target Player"
            );
          }
          if (typeof objectToSend[key][field] === "string") {
            return generateInput(
              key + "." + field,
              "text",
              objectToSend[key][field]
            );
          } else if (typeof objectToSend[key][field] === "number") {
            return generateInput(
              key + "." + field,
              "number",
              objectToSend[key][field]
            );
          }
        });
      }
    });
    if (typeDropdown === "stock" && cardType !== "market") {
      mapping.unshift(
        generateDropdown(
          stockOption,
          setstockOption,
          ["regular", "call", "put", "short"],
          "stock type"
        )
      );
    }
    if (typeDropdown === "realestate" && cardType !== "doodad") {
      mapping.unshift(
        generateDropdown(
          cardName,
          setcardName,
          ["starterhouse", "duplex", "4-plex", "8-plex", "apartmentcomplex"],
          "Realestate Name"
        )
      );
    }
    if (typeDropdown === "d2y" && cardType === "cashflow") {
      mapping.unshift(
        generateDropdown(
          d2yOption,
          setd2yOption,
          ["card1", "card2", "card3"],
          "d2y Option"
        )
      );
    }
    if (types.length !== 0) {
      mapping.unshift(
        generateDropdown(typeDropdown, settypeDropdown, types, "type of card")
      );
    }
    return mapping;
  }

  function SubmitData() {
    if (cardID === "") {
      console.log("post");
      axios
        .post(`${SERVER_HOST}/card/add`, {
          token: props.credentials,
          card: objectToSend,
          cardType: cardType,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("update");
    }
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
        <form
          onSubmit={(event) => {
            event.preventDefault();
            SubmitData();
          }}
        >
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
          {cardType == "beginning" ? ShowCreateCardChoices([]) : ""}
          {cardType == "capitalgain"
            ? ShowCreateCardChoices(["stock", "realestate", "d2y", "land"])
            : ""}
          {cardType == "cashflow"
            ? ShowCreateCardChoices([
                "realestate",
                "d2y",
                "royalty",
                "dividend",
              ])
            : ""}
          {cardType == "doodad" ? ShowCreateCardChoices([]) : ""}
          {cardType == "market"
            ? ShowCreateCardChoices([
                "stock",
                "realestate",
                "realestate Exchange",
                "d2y",
                "land",
              ])
            : ""}
          <button type="submit">Submit</button>
        </form>
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
