import React, { useEffect, useState } from "react";

const categoriesToSell = ["NONE", "STOCK", "REALESTATE", "LAND", "BUSINESS"];

const Sell = (props) => {
  const [itemsToSell, setitemsToSell] = useState(props.data.assets);
  const [choiceOfItem, setchoiceOfItem] = useState("none");
  const [currentItem, setcurrentItem] = useState("NONE");
  const [sellPrice, setsellPrice] = useState(0);
  const [cashback, setcashback] = useState(0);

  const onSubmit = (event) => {
    event.preventDefault();
    props.setcash(props.cash + parseInt(cashback));
    let cData = props.data;
    cData.assets[choiceOfItem].splice(
      cData.assets[choiceOfItem][currentItem],
      1
    );
    props.setdata(cData);
    props.submitted("NONE");
  };

  const showCurrentItem = () => {
    const item = currentItem;
    if (item != "STOCK") {
      return (
        <div className="item hz" key={item.key}>
          <div>{item.name}:</div>
          <div>{item.value}</div>
        </div>
      );
    } else if (item == "STOCK") {
      return (
        <div className="item hz" key={item.key}>
          <div>{item.name}:</div>
          <div>{item.amount}</div>
          <div>{item.costPerShare}</div>
        </div>
      );
    }
  };

  const changeTopChoice = (selection) => {
    const value = selection.target.value.toLowerCase();
    if (choiceOfItem != value) {
      setchoiceOfItem(value);
    }
  };

  const changeChoice = (selection) => {
    const value = selection.target.value;
    if (itemsToSell[choiceOfItem][value - 1].mortgage) {
      setcashback(sellPrice - itemsToSell[choiceOfItem][value - 1].mortgage);
    } else {
      setcashback(sellPrice);
    }
    setcurrentItem(itemsToSell[choiceOfItem][value - 1]);
  };

  const createForm = () => {
    let items = itemsToSell[choiceOfItem];

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

  useEffect(() => {
    if (currentItem.mortgage) {
      setcashback(sellPrice - currentItem.mortgage);
    } else {
      setcashback(sellPrice);
    }
  }, [sellPrice]);

  return (
    <div className="sell-wrapper">
      <select name="select-category-to-sell" className="sell-choice">
        {createOptions(categoriesToSell)}
      </select>
      <div className="select-item-to-sell">
        {choiceOfItem == "none" ? (
          ""
        ) : (
          <select>
            <option
              onClick={itemsToSell[choiceOfItem][0] ? changeChoice : () => {}}
              value={"NONE"}
              key={0}
            >
              NONE
            </option>
            {createForm()}
          </select>
        )}
      </div>
      <div className="show-current-item">
        {currentItem != "NONE" ? (
          <div>
            {showCurrentItem()}
            {cashback}
            <form onSubmit={onSubmit}>
              <label>The sell price is total price for all units</label>
              <input
                type="number"
                value={sellPrice}
                onChange={(event) => {
                  setsellPrice(event.target.valueAsNumber);
                }}
                data-testid="input-target"
              ></input>
              <button type="submit">Sell that asset!</button>
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
