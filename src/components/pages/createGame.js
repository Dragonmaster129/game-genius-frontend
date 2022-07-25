import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SERVER_HOST } from "../constants";

const CreateGame = (props) => {
  const [numPlayers, setnumPlayers] = useState(1);
  const [gameName, setgameName] = useState("Pellsers");

  function createGame(event) {
    event.preventDefault();
    let redirect = document.getElementById("redirect");
    axios
      .post(`${SERVER_HOST}/create-game`, {
        numPlayers: numPlayers,
        player: props.credentials,
        name: gameName,
      })
      .then((res) => {
        let data = JSON.parse(res.data);
        props.setgameID(data.ID);
        redirect.click();
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Link to="/play" className="hidden" id="redirect"></Link>
      <form onSubmit={createGame} className="v eigth">
        <input
          type="number"
          value={numPlayers}
          onChange={(event) => {
            setnumPlayers(event.target.valueAsNumber);
          }}
        ></input>
        <input
          type="text"
          value={gameName}
          onChange={(event) => {
            setgameName(event.target.valueAsNumber);
          }}
        ></input>
        <button type="submit">CREATE GAME!!!</button>
      </form>
    </div>
  );
};

export default CreateGame;
