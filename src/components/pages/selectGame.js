import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SERVER_HOST } from "../constants";

const SelectGame = (props) => {
  const [gameList, setgameList] = useState([]);

  useEffect(() => {
    axios
      .get(`${SERVER_HOST}/games`)
      .then((res) => {
        setgameList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function ShowGameList() {
    return gameList.map((game, key) => {
      return (
        <div key={game.ID} className="game-item">
          <div onClick={() => joinGame(game.ID)}>
            <Link to="/play" key={game.ID} className="gameLink">
              <h3>{game.name ? game.name : game.ID}</h3>
            </Link>
          </div>
        </div>
      );
    });
  }

  function joinGame(ID) {
    props.setgameID(ID);
  }

  return (
    <div className="select-game-wrapper">
      <div className="select-game">
        <Link to="/create-game" className="gameLink create">
          Create Game
        </Link>
        {ShowGameList()}
      </div>
    </div>
  );
};

export default SelectGame;
