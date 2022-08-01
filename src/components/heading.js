import React from "react";

const Heading = (props) => {
  return (
    <div className="heading">
      <h1>Player card</h1>
      <div className="hz">
        <h2>Profession: {props.data.profession}</h2>
        <h2>Player: {props.data.player}</h2>
      </div>
    </div>
  );
};

export default Heading;
