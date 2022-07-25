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

  return (
    <div>
      <h3>I am the SelectGame component!</h3>
      <Link to="/create-game">Create Game</Link>
    </div>
  );
};

export default SelectGame;
