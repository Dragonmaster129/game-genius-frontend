import axios from "axios";
import React, { useState, useEffect } from "react";
import { SERVER_HOST } from "../constants";

const CreateCard = (props) => {
  const [cardType, setcardType] = useState("beginning");
  const [cashflow, setcashflow] = useState(0);
  const [cash, setcash] = useState(0);
  const [baby, setbaby] = useState(false);
  const [title, settitle] = useState("");
  const [cashflowType, setcashflowType] = useState("none");
  const [description, setdescription] = useState("");
  const [stock, setstock] = useState({
    name: "",
    option: "",
    amount: 0,
    costPerShare: 0,
  });
  const [realestate, setrealestate] = useState({
    name: "",
    size: 1,
    cost: 0,
    mortgage: 0,
    downpay: 0,
    value: 0,
  });

  const [result, setresult] = useState("");
  const [cardList, setcardList] = useState({
    beginning: [],
    capitalgain: [],
    cashflow: [],
    doodad: [],
    initialData: [],
    market: [],
  });

  useEffect(() => {
    setresult("");
  }, [cardType, cashflow, cash, baby, cashflowType, description]);

  useEffect(() => {
    axios
      .get(`${SERVER_HOST}/cards`)
      .then((res) => {
        console.log(res);
        setcardList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function doodadSubmit() {
    axios
      .post(`${SERVER_HOST}/card/add/doodad`, {
        cardType: cardType,
        cashflow: cashflow,
        cash: cash,
        baby: baby,
        cashflowType: cashflowType,
        token: props.credentials,
        description: description,
      })
      .then((res) => {
        setresult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function beginningSubmit() {}

  function beginning() {
    return (
      <div className="v">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(event) => {
            settitle(event.target.value);
          }}
        ></input>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(event) => {
            setdescription(event.target.value);
          }}
        ></textarea>
        <label>Cash</label>
        <input
          type="number"
          value={cash}
          onChange={(event) => {
            setcash(event.target.value);
          }}
        ></input>
        <label>
          <h2>Stock</h2>
        </label>
        <label>Name</label>
        <input
          type="text"
          value={stock.name}
          onChange={(event) => {
            setstock({
              name: event.target.value,
              option: stock.option,
              amount: stock.amount,
              costPerShare: stock.costPerShare,
            });
          }}
        ></input>
        <label>Amount</label>
        <input
          type="text"
          value={stock.amount}
          onChange={(event) => {
            setstock({
              name: stock.name,
              option: stock.option,
              amount: event.target.value,
              costPerShare: stock.costPerShare,
            });
          }}
        ></input>
        <label>Cost Per Share</label>
        <input
          type="text"
          value={stock.costPerShare}
          onChange={(event) => {
            setstock({
              name: stock.name,
              option: stock.option,
              amount: stock.amount,
              costPerShare: event.target.value,
            });
          }}
        ></input>
        <label>
          <h2>Real Estate</h2>
        </label>
        <label>Name</label>
        <input
          type="text"
          value={realestate.name}
          onChange={(event) => {
            setrealestate({
              name: event.target.value,
              size: realestate.size,
              cost: realestate.cost,
              mortgage: realestate.mortgage,
              downpay: realestate.downpay,
              value: realestate.value,
            });
          }}
        ></input>
        <label>Size/units</label>
        <input
          type="number"
          value={realestate.size}
          onChange={(event) => {
            setrealestate({
              name: realestate.name,
              size: event.target.value,
              cost: realestate.cost,
              mortgage: realestate.mortgage,
              downpay: realestate.downpay,
              value: realestate.value,
            });
          }}
        ></input>
        <label>Cost</label>
        <input
          type="number"
          value={realestate.cost}
          onChange={(event) => {
            setrealestate({
              name: realestate.name,
              size: realestate.size,
              cost: event.target.value,
              mortgage: realestate.mortgage,
              downpay: realestate.downpay,
              value: realestate.value,
            });
          }}
        ></input>
        <label>Mortgage</label>
        <input
          type="number"
          value={realestate.mortgage}
          onChange={(event) => {
            setrealestate({
              name: realestate.name,
              size: realestate.size,
              cost: realestate.cost,
              mortgage: event.target.value,
              downpay: realestate.downpay,
              value: realestate.value,
            });
          }}
        ></input>
        <label>Down Pay</label>
        <input
          type="number"
          value={realestate.downpay}
          onChange={(event) => {
            setrealestate({
              name: realestate.name,
              size: realestate.size,
              cost: realestate.cost,
              mortgage: realestate.mortgage,
              downpay: event.target.value,
              value: realestate.value,
            });
          }}
        ></input>
        <label>Cash Flow</label>
        <input
          type="number"
          value={realestate.value}
          onChange={(event) => {
            setrealestate({
              name: realestate.name,
              size: realestate.size,
              cost: realestate.cost,
              mortgage: realestate.mortgage,
              downpay: realestate.downpay,
              value: event.target.value,
            });
          }}
        ></input>
        <button onClick={beginningSubmit}>Submit</button>
      </div>
    );
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
            <select>
              <option
                onClick={(event) => {
                  setcashflowType(event.target.value);
                }}
                value="none"
              >
                None
              </option>
              <option
                onClick={(event) => {
                  setcashflowType(event.target.value);
                }}
                value="taxes"
              >
                Taxes
              </option>
              <option
                onClick={(event) => {
                  setcashflowType(event.target.value);
                }}
                value="mortgage"
              >
                Mortgage
              </option>
              <option
                onClick={(event) => {
                  setcashflowType(event.target.value);
                }}
                value="school"
              >
                School
              </option>
              <option
                onClick={(event) => {
                  setcashflowType(event.target.value);
                }}
                value="car"
              >
                Car
              </option>
              <option
                onClick={(event) => {
                  setcashflowType(event.target.value);
                }}
                value="creditCard"
              >
                CreditCard
              </option>
              <option
                onClick={(event) => {
                  setcashflowType(event.target.value);
                }}
                value="retail"
              >
                Retail
              </option>
              <option
                onClick={(event) => {
                  setcashflowType(event.target.value);
                }}
                value="other"
              >
                Other
              </option>
              <option
                onClick={(event) => {
                  setcashflowType(event.target.value);
                }}
                value="child"
              >
                Child
              </option>
              <option
                onClick={(event) => {
                  setcashflowType(event.target.value);
                }}
                value="loan"
              >
                Loan
              </option>
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
        <button onClick={doodadSubmit()}>Submit</button>
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
          <div>
            {Object.keys(item)}: {Object.values(item)}
          </div>
        );
      } else {
        if (Object.values(item)[0][0] == undefined) {
          return <div>{Object.keys(item)[0]}: []</div>;
        } else {
          return (
            <div className="inner">
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
          <select>
            <option
              value="none"
              onClick={(event) => {
                setcardType(event.target.value);
              }}
            >
              None
            </option>
            <option
              value="beginning"
              onClick={(event) => {
                setcardType(event.target.value);
              }}
            >
              Beginning Investment Portfolio
            </option>
            <option
              value="capitalgain"
              onClick={(event) => {
                setcardType(event.target.value);
              }}
            >
              Capital Gain Deal
            </option>
            <option
              value="cashflow"
              onClick={(event) => {
                setcardType(event.target.value);
              }}
            >
              CashFlow Deal
            </option>
            <option
              value="doodad"
              onClick={(event) => {
                setcardType(event.target.value);
              }}
            >
              Doodad
            </option>
            <option
              value="market"
              onClick={(event) => {
                setcardType(event.target.value);
              }}
            >
              Market
            </option>
          </select>
          {cardType == "beginning" ? beginning() : ""}
          {cardType == "capitalgain" ? capitalgain() : ""}
          {cardType == "cashflow" ? cashflow() : ""}
          {cardType == "doodad" ? doodad() : ""}
          {cardType == "market" ? market() : ""}
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
          {cardList.beginning.map((card) => {
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
                          collection: "beginning",
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
          })}
        </div>
        <hr />
        <div>
          <h1>Capital Gain</h1>
          {cardList.capitalgain.map((card) => {
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
                          collection: "capitalgain",
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
          })}
        </div>
        <hr />
        <div>
          <h1>Cash Flow</h1>
          {cardList.cashflow.map((card) => {
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
                          collection: "cashflow",
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
          })}
        </div>
        <hr />
        <div>
          <h1>Doodad</h1>
          {cardList.doodad.map((card) => {
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
                          collection: "doodad",
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
          })}
        </div>
        <hr />
        <div>
          <h1>Market</h1>
          {cardList.market.map((card, key) => {
            return (
              <div key={card["ID"]} className="card">
                <h4>{mapAllValuesAndKeys(card)}</h4>
                <h3
                  onClick={(event) => {
                    axios
                      .get(`${SERVER_HOST}/getcard`, {
                        params: {
                          auth: props.credentials,
                          ID: event.target.accessKey,
                          collection: "market",
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
          })}
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
