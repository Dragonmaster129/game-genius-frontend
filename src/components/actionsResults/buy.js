import React from "react";

const Buy = (props) => {
  return (
    <div className="buy">
      <select name="select-item-to-buy" className="buy-choice">
        <option>Stock</option>
        <option>2/1 Starter Home</option>
        <option>3/2 House</option>
        <option>Duplex</option>
        <option>4-plex</option>
        <option>8-plex</option>
        <option>Apartment Complex</option>
        <option>D2Y</option>
        <option>Land</option>
      </select>
    </div>
  );
};

export default Buy;
