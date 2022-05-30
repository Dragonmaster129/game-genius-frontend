import buyItem from "../../src/functions/buyItem";
import data from "../sampledata";
import endData from "../endDataBuy";

let addedData = {
  type: "STARTERHOUSE",
  name: "STARTERHOUSE",
  cost: 52000,
  mortgage: 50000,
  downpay: 2000,
  value: 20,
};

let choiceOfItem = "realestate";

let setaddedData = (obj) => {
  addedData = obj;
};

let setcash = (num) => {
  props.cash = num;
};

let submitted = (value) => {};

let props = {
  data: data,
  cash: 3950,
  setcash: setcash,
  submitted: submitted,
};

test("buying a STARTERHOUSE buys the right item", () => {
  buyItem(props, choiceOfItem, addedData, setaddedData);
  expect(props.data).toEqual(endData);
});
