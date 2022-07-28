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
  const [doodadCategory, setdoodadCategory] = useState("other");
  const [beginningStockCount, setbeginningStockCount] = useState(0);
  const [beginningRealestateCount, setbeginningRealestateCount] = useState(0);
  const [cardID, setcardID] = useState("");
  const [result, setresult] = useState(false);

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
      child: false,
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
    if (currentMode === "create") {
      setobjectToSend(format[cardType]);
      settypeDropdown("realestate");
    }
    setpreviousCardType(cardType);
  }, [cardType]);

  useEffect(() => {
    let object = {};
    for (let key in objectToSend) {
      object[key] = objectToSend[key];
    }
    if (currentMode === "create") {
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
        cashflowSetup(object);
      } else if (cardType === "market") {
        object = {};
        for (const key in format[cardType]) {
          object[key] = objectToSend[key] || "";
        }
        marketSetup(object);
      } else if (cardType === "beginning") {
        beginningSetup(object, beginningStockCount, beginningRealestateCount);
      } else if (cardType === "doodad") {
        object["category"] = doodadCategory;
      }
    } else {
      if (cardType === "beginning") {
        beginningSetup(object, object.stock.length, object.realestate.length);
      } else if (cardType === "market") {
        object = {};
        for (const key in format[cardType]) {
          object[key] = objectToSend[key] || "";
        }
        marketSetup(object);
      } else if (cardType === "doodad") {
        object["category"] = doodadCategory;
      } else if (cardType === "cashflow") {
        cashflowSetup(object);
      }
    }
    setobjectToSend(object);
  }, [
    typeDropdown,
    stockOption,
    previousCardType,
    cardName,
    targetPlayer,
    beginningStockCount,
    beginningRealestateCount,
    doodadCategory,
    d2yOption,
  ]);

  function cashflowSetup(object) {
    object["card"] = { type: typeDropdown, name: "" };
    if (typeDropdown === "realestate") {
      object["card"]["name"] = cardName;
      object["card"]["size"] = objectToSend["card"]["size"] || 1;
      object["card"]["cost"] = objectToSend["card"]["cost"] || 0;
      object["card"]["mortgage"] = objectToSend["card"]["mortgage"] || 0;
      object["card"]["downpay"] = objectToSend["card"]["downpay"] || 0;
      object["card"]["value"] = objectToSend["card"]["value"] || 0;
    } else if (typeDropdown === "d2y") {
      object["card"]["name"] = d2yOption;
      if (d2yOption === "card1") {
        object["card"]["cost"] = objectToSend["card"]["cost"] || 200;
        object["card"]["downpay"] = objectToSend["card"]["downpay"] || 200;
      } else {
        object["card"]["value"] = 500;
      }
    } else if (typeDropdown === "royalty") {
      object["card"]["cost"] = objectToSend["card"]["cost"] || 12000;
      object["card"]["downpay"] = objectToSend["card"]["downpay"] || 12000;
      object["card"]["value"] = objectToSend["card"]["value"] || 400;
    } else if (typeDropdown === "dividend") {
      object["card"]["cost"] = objectToSend["card"]["cost"] || 25000;
      object["card"]["downpay"] = objectToSend["card"]["downpay"] || 25000;
      object["card"]["value"] = objectToSend["card"]["value"] || 380;
    } else if (typeDropdown === "option On Realestate") {
      delete object["card"];
      object["title"] = objectToSend["title"] || "Option on Real Estate";
      object["price"] = objectToSend["price"] || 1000;
      object["description"] =
        objectToSend["description"] ||
        `For $[price] now, you may take the next realestate deal drawn by any other Player and pay the price and terms stated on the card. The $[price] is NOT part of the Down Payment.
Option expires with next real estate deal drawn. If this Option isn't used or sold then deal goes back to Player who drew it.
This Option may be sold to another Player now or at the next real estate card drawn. Hold this card until then.`;
    }
  }

  function marketSetup(object) {
    object["type"] = typeDropdown;
    object["target"] = targetPlayer;
    if (typeDropdown === "realestate") {
      object["name"] = cardName;
      object["highest"] = objectToSend["highest"] || false;
      object["size"] = objectToSend["size"] || 1;
      object["price"] = objectToSend["price"] || 0;
      object["forcedSale"] = objectToSend["forcedSale"] || false;
    } else if (typeDropdown === "realestate Exchange") {
      object["title"] = "Real Estate Exchange Deal";
      object["name"] = cardName;
      object["newProperty"] = objectToSend["newProperty"] || {
        size: 1,
        cost: 0,
        mortgage: 0,
        downpay: 0,
        value: 0,
      };
      object["newProperty"]["name"] = "";
    } else if (typeDropdown === "stock") {
      object["name"] = cardName;
      object["bankrupt"] = objectToSend["bankrupt"] || false;
      object["price"] = objectToSend["price"] || 0;
      object["forcedSale"] = objectToSend["forcedSale"] || false;
    } else if (typeDropdown === "d2y") {
      object["value"] = objectToSend["value"] || 7000;
    } else if (typeDropdown === "land") {
      object["size"] = objectToSend["size"] || 5;
      object["price"] = objectToSend["price"] || 0;
    } else if (typeDropdown === "Trade Improves/Recession Strikes") {
      object["title"] = objectToSend["title"] || "";
      object["description"] = objectToSend["description"] || "";
      object["amount"] = objectToSend["amount"] || 0;
    }
  }

  function beginningSetup(object, stockCount, realestateCount) {
    object["title"] = "Your Beginning Investment Portfolio";
    object["stock"] = [];
    for (let index = 0; index < stockCount; index++) {
      object["stock"][index] = objectToSend["stock"][index] || {
        name: "",
        option: "regular",
        amount: 0,
        costPerShare: 0,
      };
    }
    object["realestate"] = [];
    for (let index = 0; index < realestateCount; index++) {
      object["realestate"][index] = objectToSend["realestate"][index] || {
        name: "",
        size: 1,
        cost: 0,
        mortgage: 0,
        downpay: 0,
        value: 0,
      };
    }
  }

  useEffect(() => {
    axios
      .get(`${SERVER_HOST}/cards`)
      .then((res) => {
        setcardList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function HandleChange({ target }) {
    let smallObject = {};
    let keys = Object.keys(objectToSend);
    let key = target.name;
    let value = target.value;
    if (target.type === "checkbox") {
      value = target.checked;
    } else {
      if (target.type === "number") {
        value = target.valueAsNumber;
      } else if (target.type === "text" && key !== "title") {
        value = value.toUpperCase();
      }
    }
    keys.forEach((element) => {
      smallObject[element] = objectToSend[element];
    });
    if (key.includes(".")) {
      let keyArr = key.split(".");
      if (keyArr.length === 3) {
        smallObject[keyArr[0]][keyArr[1]][keyArr[2]] = value;
      } else {
        smallObject[keyArr[0]][keyArr[1]] = value;
      }
    } else {
      smallObject[key] = value;
    }
    setobjectToSend(smallObject);
  }

  function generateInput(key, type, value) {
    return (
      <div key={key} className="v">
        <label>{key[0].toUpperCase() + key.substring(1)}</label>
        <input
          type={`${type}`}
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

  function generateCheckbox(key, value) {
    return (
      <div key={key} className="v">
        <label>{key[0].toUpperCase() + key.substring(1)}</label>
        <input
          type="checkbox"
          name={key}
          checked={value}
          onChange={HandleChange}
        ></input>
      </div>
    );
  }

  function generateDropdown(value, setter, options, label) {
    return (
      <div className="v" key={value + options}>
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
      if (key === "name" || key === "type" || key === "category") {
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
        return generateCheckbox(key, objectToSend[key]);
      } else if (typeof objectToSend[key] === "object") {
        if (Array.isArray(objectToSend[key])) {
          return objectToSend[key].map((field, littleKey) => {
            return Object.keys(field).map((fieldKey) => {
              if (typeof field[fieldKey] === "string") {
                return generateInput(
                  key + "." + littleKey + "." + fieldKey,
                  "text",
                  field[fieldKey]
                );
              } else if (typeof field[fieldKey] === "number") {
                return generateInput(
                  key + "." + littleKey + "." + fieldKey,
                  "number",
                  field[fieldKey]
                );
              }
            });
          });
        } else {
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
    if (typeDropdown === "stock" && cardType === "market") {
      mapping.unshift(
        generateDropdown(cardName, setcardName, ["OK4U", "MYT4U"], "Stock Name")
      );
    }
    if (cardType === "doodad") {
      mapping.push(
        generateDropdown(
          doodadCategory,
          setdoodadCategory,
          ["other", "home", "school", "car", "creditCard", "retail"],
          "Doodad Cashflow Category"
        )
      );
    }
    if (
      typeDropdown === "realestate" ||
      (typeDropdown === "realestate Exchange" && cardType !== "doodad")
    ) {
      if (cardType === "market") {
        mapping.unshift(
          generateDropdown(
            cardName,
            setcardName,
            [
              "starterhouse",
              "plex",
              "duplex",
              "4-plex",
              "8-plex",
              "apartmentcomplex",
            ],
            "Realestate Name"
          )
        );
      } else {
        mapping.unshift(
          generateDropdown(
            cardName,
            setcardName,
            ["starterhouse", "duplex", "4-plex", "8-plex", "apartmentcomplex"],
            "Realestate Name"
          )
        );
      }
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
    if (cardType === "beginning") {
      mapping.unshift(
        generateDropdown(
          beginningRealestateCount,
          setbeginningRealestateCount,
          [0, 1],
          "Realestate count"
        )
      );
      mapping.unshift(
        generateDropdown(
          beginningStockCount,
          setbeginningStockCount,
          [0, 1, 2, 3],
          "Stock count"
        )
      );
    }
    if (types.length !== 0) {
      if (currentMode === "create") {
        mapping.unshift(
          generateDropdown(typeDropdown, settypeDropdown, types, "Type of Card")
        );
      } else {
        mapping.unshift(
          <h3 key="h3">
            <label>Type of Card</label>: {" " + typeDropdown}
          </h3>
        );
      }
    }
    return mapping;
  }

  function DuplicateCardDataForEditing() {
    let newCardList = {};
    for (const key in cardList) {
      newCardList[key] = [];
      for (let index = 0; index < cardList[key].length; index++) {
        newCardList[key][index] = cardList[key][index];
      }
    }
    return newCardList;
  }

  function SubmitData() {
    if (currentMode === "create") {
      axios
        .post(`${SERVER_HOST}/card/add`, {
          token: props.credentials,
          card: objectToSend,
          cardType: cardType,
        })
        .then((res) => {
          let newCardList = DuplicateCardDataForEditing();
          newCardList[cardType].push(objectToSend);
          setcardList(newCardList);
          setobjectToSend(format[cardType]);
          setpreviousCardType("none");
          setresult(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .patch(`${SERVER_HOST}/card/update`, {
          token: props.credentials,
          card: objectToSend,
          cardType: cardType,
          cardID: cardID,
        })
        .then((res) => {
          let newCardList = DuplicateCardDataForEditing();
          objectToSend["ID"] = cardID;
          newCardList[cardType] = newCardList[cardType].map((card) =>
            card["ID"] === cardID ? objectToSend : card
          );
          setcardList(newCardList);
          setobjectToSend(format[cardType]);
          setpreviousCardType("none");
          setresult(res.data);
          setcurrentMode("create");
        })
        .catch((err) => {
          console.log(err);
        });
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
                  let data = res.data;
                  setcardID(data.ID);
                  delete data["ID"];
                  setcurrentMode("edit");
                  setobjectToSend(data);
                  setcardType(collection);
                  settypeDropdown(data.card.type || data.type);
                  if (collection === "beginning") {
                    setbeginningRealestateCount(res.data.realestate.length);
                    setbeginningStockCount(res.data.stock.length);
                  } else if (collection === "market") {
                    setcardName(res.data.name);
                  } else if (collection === "doodad") {
                    setdoodadCategory(res.data.category);
                  } else if (collection === "cashflow") {
                    setd2yOption(res.data.card.name);
                  }
                })
                .catch((err) => console.log(err));
            }}
            accessKey={card["ID"]}
          >
            Edit
          </h3>
          <h3
            onClick={({ target }) => {
              axios
                .delete(`${SERVER_HOST}/delete-card`, {
                  params: {
                    auth: props.credentials,
                    ID: target.accessKey,
                    collection: collection,
                  },
                })
                .then((res) => {
                  if (res.data) {
                    let newCardList = DuplicateCardDataForEditing();
                    newCardList[collection] = newCardList[collection].filter(
                      (card) => card["ID"] !== target.accessKey
                    );
                    setcardList(newCardList);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            accessKey={card["ID"]}
          >
            Delete
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
      } else if (typeof Object.values(item)[0] == "boolean") {
        return (
          <div key={Object.keys(item)}>
            {Object.keys(item)}: {Object.values(item)[0] ? "True" : "False"}
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
          {currentMode === "create" ? (
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
          ) : (
            <h2>{cardType}</h2>
          )}
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
                "option On Realestate",
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
                "Trade Improves/Recession Strikes",
              ])
            : ""}
          <button type="submit">Submit</button>
        </form>
        {currentMode === "edit" ? (
          <button
            onClick={() => {
              setobjectToSend(format[cardType]);
              setpreviousCardType("none");
              setcurrentMode("create");
            }}
          >
            Exit Edit Mode
          </button>
        ) : (
          ""
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
