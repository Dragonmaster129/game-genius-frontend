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
    return gameList.map((game) => {
      return (
        <div key={game.ID}>
          <h3 onClick={() => joinGame(game.ID)}>
            <Link to="/play" key={game.ID} className="gameLink">
              {game.name ? game.name : game.ID}
            </Link>
          </h3>
        </div>
      );
    });
  }

  function joinGame(ID) {
    props.setgameID(ID);
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
