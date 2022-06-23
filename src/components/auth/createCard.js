import axios from "axios";
import React, { useState, useEffect } from "react";

const CreateCard = (props) => {
  const [cardType, setcardType] = useState("doodad");
  const [cashflow, setcashflow] = useState(0);
  const [cash, setcash] = useState(0);
  const [baby, setbaby] = useState(false);
  const [cashflowType, setcashflowType] = useState("none");
  const [description, setdescription] = useState("");
  const [result, setresult] = useState("");

  useEffect(() => {
    setresult("");
  }, [cardType, cashflow, cash, baby, cashflowType, description]);

  function submit(event) {
    event.preventDefault();
    axios
      .post(`http://localhost:8000/card/add/`, {
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

  function doodad() {
    return (
      <div className="v quarter">
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
        <label>Description</label>
        <textarea
          value={description}
          onChange={(event) => {
            setdescription(event.target.value);
          }}
        ></textarea>
        <button type="submit">Submit</button>
      </div>
    );
  }

  return (
    <div>
      <h1>CreateCard</h1>
      <form onSubmit={submit}>
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
            value="doodad"
            onClick={(event) => {
              setcardType(event.target.value);
            }}
          >
            Doodad
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
            value="capitalgain"
            onClick={(event) => {
              setcardType(event.target.value);
            }}
          >
            Capital Gain Deal
          </option>
          <option
            value="markets"
            onClick={(event) => {
              setcardType(event.target.value);
            }}
          >
            Market
          </option>
          <option
            value="beginning"
            onClick={(event) => {
              setcardType(event.target.value);
            }}
          >
            Beginning Investment Portfolio
          </option>
        </select>
        {cardType == "doodad" ? doodad() : ""}
      </form>
      {result == "" ? (
        ""
      ) : result ? (
        <div>Card Submitted</div>
      ) : (
        <div>Card Failed to submit, try logging in</div>
      )}
    </div>
  );
};

export default CreateCard;
