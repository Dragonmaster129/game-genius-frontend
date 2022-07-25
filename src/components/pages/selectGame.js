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
        console.log(res);
        setgameList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function ShowGameList() {
    return gameList.map((game) => {
      return (
        <div key={game.ID}>
          <h3 onClick={joinGame}>
            <Link to="/play" className="gameLink">
              {game.name ? game.name : game.ID}
            </Link>
          </h3>
        </div>
      );
    });
  }

  function joinGame(event) {
    props.setgameID(event.target.key);
  }

  return (
    <div>
      <Link to="/create-game" className="gameLink create">
        Create Game
      </Link>
      {ShowGameList()}
    </div>
  );
};

export default SelectGame;