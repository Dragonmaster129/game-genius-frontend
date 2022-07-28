import React, { useState, useEffect } from "react";
import axios from "axios";

import Heading from "../heading";
import Income from "../income/income";
import Expenses from "../expenses";
import Assets from "../assets";
import Liabilities from "../liabilities";
import externalData from "../../data";
import { SERVER_HOST, WEBSOCKET_URL } from "../constants";

const App = (props) => {
  const [data, setdata] = useState(externalData);

  const [choiceToStay, setchoiceToStay] = useState(true);
  const [currentAction, setcurrentAction] = useState("NONE");
  const [borrowLoan, setborrowLoan] = useState("NONE");
  const [currentEvent, setcurrentEvent] = useState({ EVENT: "STARTGAME" });
  const [paycheckCount, setpaycheckCount] = useState(0);
  const [buySellAmount, setbuySellAmount] = useState(1);
  const [card, setcard] = useState({});
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const [socketConnection, setsocketConnection] = useState({});

  const getData = () => {
    axios
      .get(`${SERVER_HOST}/data/${props.credentials}`) //, {params: {token: props.credentials}})
      .then((res) => {
        let result = JSON.parse(res.data);
        if (result != "invalid token") {
          setdata(result.playerData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // function checkGameState() {
  //   axios.get()
  // }

  function establishSocket() {
    let socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = function (e) {
      socket.send(JSON.stringify([props.credentials, props.gameID]));
    };

    socket.onmessage = function (event) {
      // process the event
      let data = JSON.parse(event.data);
      if (data.EVENT) {
        setcurrentEvent(data);
      } else {
        setcard(data);
      }
    };

    socket.onclose = function (event) {
      if (event.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log("[close] Connection died");
      }
    };

    socket.onerror = function (error) {
      console.log(`[error] ${error.message}`);
    };

    return socket;
  }

  const shrinkPlayer = () => {
    if (
      windowDimenion.winWidth <= 650 &&
      (currentAction != "NONE" || borrowLoan != "NONE")
    ) {
      return true;
    }
  };

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  const onChange = (setvalue) => {
    setcurrentAction(setvalue);
  };

  const resetGame = () => {
    axios
      .post(`${SERVER_HOST}/reset/${props.credentials}`, { reset: true })
      .then((res) => getData())
      .catch((err) => console.log(err));
  };

  function buttonResults(res) {
    setcard(res.data);
    setcurrentEvent({ EVENT: "CAPITALGAIN" });
    setcurrentAction("CAPITALGAIN");
  }

  function actionButton(path, name) {
    return (
      <button
        onClick={(event) => {
          axios
            .post(`${SERVER_HOST}/${path}`, {
              ID: props.credentials,
              gameID: props.gameID,
            })
            .then((res) => {
              if (name === "Market") {
                setcurrentEvent({ EVENT: "CARD" });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {name}
      </button>
    );
  }

  useEffect(() => {
    setsocketConnection(establishSocket());
    getData();
  }, []);

  useEffect(() => {
    if (currentEvent.EVENT == "STARTTURN") {
      setpaycheckCount(0);
    }
  }, [currentEvent]);

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

  if (currentEvent.EVENT == "STARTGAME") {
    return (
      <div>
        {props.gameCreator ? (
          <button
            onClick={() => {
              axios
                .post(`${SERVER_HOST}/start-game`, { ID: props.gameID })
                .then((res) => {})
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            START GAME!
          </button>
        ) : (
          <h1>waiting for game to start</h1>
        )}
      </div>
    );
  } else {
    if (data.passive < data.totalExpenses * 2 || choiceToStay) {
      return (
        <div className={windowDimenion.winWidth <= 1060 ? "app v" : "app hz"}>
          <div className="player top">
            <div
              className={shrinkPlayer() ? "v playercardhidden" : "v playercard"}
            >
              <Heading data={data} />
              {shrinkPlayer() ? "" : <hr />}
              <h2>Income Statement</h2>
              <Income
                props={data.assets}
                totalIncome={data.totalIncome}
                passive={data.passive}
              />
              {shrinkPlayer() ? "" : <hr />}
              <Expenses
                props={data.expenses}
                totalExpenses={data.totalExpenses}
              />
              {shrinkPlayer() ? "" : <hr />}
              <div className="v right">
                <h3 className="cash-flow">
                  Monthly Cash Flow: {data.cashflow}
                </h3>
                <h3 className="cash">Cash: {data.cash}</h3>
              </div>
              {shrinkPlayer() ? "" : <hr />}
              <div className="hz">
                <Assets props={data.assets} />
                {shrinkPlayer() ? "" : <hr />}
                <Liabilities
                  props={data.expenses}
                  re={data.assets.realestate}
                />
              </div>
              <hr />
              <div className="buttons">
                {currentEvent.EVENT == "STARTTURN" ? (
                  <div>
                    {(data.charity != 0 && paycheckCount < 2) ||
                    paycheckCount == 0 ? (
                      <button
                        onClick={() => {
                          setpaycheckCount(paycheckCount + 1);
                          axios
                            .post(`${SERVER_HOST}/paycheck`, {
                              ID: props.credentials,
                              gameID: props.gameID,
                              amount: 0,
                            })
                            .then((res) => {
                              getData();
                            });
                        }}
                      >
                        Paycheck
                      </button>
                    ) : (
                      ""
                    )}
                    {actionButton("capitalGain", "Capital Gain")}
                    {actionButton("cashflow", "Cashflow")}
                    {actionButton("doodad", "Doodad")}
                    {actionButton("market", "Market")}
                    {actionButton("charity", "Charity")}
                    {actionButton("baby", "Baby")}
                    {actionButton("downsized", "Downsized")}
                    {actionButton("end-turn", "End Turn")}
                  </div>
                ) : (
                  ""
                )}
                {currentEvent.EVENT == "MARKET" ? (
                  <div>{actionButton("market", "Market")}</div>
                ) : (
                  ""
                )}
                {currentEvent.EVENT == "ENDTURN" ? (
                  <div>{actionButton("end-turn", "End Turn")}</div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <hr />
            {data.passive >= data.totalExpenses * 2 && data.passive >= 1 ? (
              <div className="choice-to-leave">
                <h3>Click this button when you want to leave the Rat Race</h3>
                <button
                  onClick={() => {
                    setchoiceToStay(false);
                  }}
                >
                  Leave the Rat Race
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="centered">
            {card.description ? (
              <div className="quarter">
                <h1>{card.title}</h1>
                <h3>{card.description}</h3>
                {card.options.map((option) => {
                  if (option != "Amount") {
                    let optionLink = option;
                    optionLink.split(" ").join("_");
                    return (
                      <button
                        onClick={(event) => {
                          axios
                            .post(`${SERVER_HOST}/choice/${optionLink}`, {
                              ID: props.credentials,
                              gameID: props.gameID,
                              amount: buySellAmount || 0,
                            })
                            .then((res) => {
                              if (typeof res.data == "object") {
                                if (res.data.cash) {
                                  setdata(res.data);
                                }
                              }
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                          setcard({});
                        }}
                        key={option}
                      >
                        {option}
                      </button>
                    );
                  } else {
                    return (
                      <input
                        key={option}
                        value={buySellAmount}
                        onChange={(event) => {
                          setbuySellAmount(event.target.valueAsNumber);
                        }}
                        type="number"
                      ></input>
                    );
                  }
                })}
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <h3>
              <button onClick={resetGame} className="">
                Reset
              </button>
            </h3>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ending">
          <h1>You Won! Now go on past the rat race!</h1>
          <h2>Stats below.</h2>
          <h3>Passive: {data.passive.toLocaleString("en-US")}</h3>
          <h3>New Income: {(data.passive * 100).toLocaleString("en-US")}</h3>
        </div>
      );
    }
  }
};

export default App;
