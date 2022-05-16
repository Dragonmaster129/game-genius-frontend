import React, { useState } from "react";

const categoriesToSell = ["NONE", "STOCK", "REALESTATE", "LAND", "BUSINESS"];

const Sell = (props) => {
  const [itemsToSell, setitemsToSell] = useState(props.data.assets);
  const [choiceOfItem, setchoiceOfItem] = useState("none");
  const [currentItem, setcurrentItem] = useState("NONE");

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const showCurrentItem = () => {
    const item = currentItem;
    return (
      <div className="item hz" key={item.key}>
        <div>{item.name}:</div>
        <div>{item.value}</div>
      </div>
    );
  };

  const changeTopChoice = (selection) => {
    const value = selection.target.value.toLowerCase();
    if (choiceOfItem != value) {
      setchoiceOfItem(value);
    }
  };

  const changeChoice = (selection) => {
    const value = selection.target.value;
    console.log(value);
    setcurrentItem(itemsToSell[choiceOfItem][value - 1]);
  };

  const createForm = () => {
    let items = itemsToSell[choiceOfItem];
    console.log(items);
    return items.map((item) => {
      return (
        <option onClick={changeChoice} value={item.key} key={item.key}>
          {item.name}
        </option>
      );
    });
  };

  const createOptions = (values) => {
    return values.map((value) => {
      return (
        <option onClick={changeTopChoice} value={value} key={value}>
          {value}
        </option>
      );
    });
  };
  return (
    <div className="sell-wrapper">
      <select name="select-category-to-sell" className="sell-choice">
        {createOptions(categoriesToSell)}
      </select>
      <div className="select-item-to-sell">
        {choiceOfItem == "none" ? "" : <select>{createForm()}</select>}
      </div>
      <div className="show-current-item">
        {currentItem != "NONE" ? (
          <div>
            {showCurrentItem()}
            <form onSubmit={onSubmit}>
              <input type="number"></input>
            </form>
          </div>
        ) : (
          "No Item Selected"
        )}
      </div>
    </div>
  );
};

export default Sell;
