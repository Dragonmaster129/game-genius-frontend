import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SERVER_HOST } from "../constants";

const CreateGame = (props) => {
  const [gameName, setgameName] = useState("Pellsers");

  function createGame(event) {
    event.preventDefault();
    let redirect = document.getElementById("redirect");
    axios
      .post(`${SERVER_HOST}/create-game`, {
        player: props.credentials,
        name: gameName,
      })
      .then((res) => {
        let data = JSON.parse(res.data);
        props.setgameID(data.ID);
        props.setgameCreator(true);
        redirect.click();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="create-game-wrapper">
      <div className="create-game">
        <Link to="/play" className="hidden" id="redirect"></Link>
        <form onSubmit={createGame} className="v eigth">
          <label className="game-name label">Game Name</label>
          <input
            type="text"
            value={gameName}
            onChange={(event) => {
              setgameName(event.target.value);
            }}
            className="game-name"
          ></input>
          <button type="submit" className="game-button">
            CREATE GAME!!!
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGame;
