import buyItem from "../../src/functions/buyItem";
import data from "../sampledata";
import endData from "../endData";

let addedData = {
  type: "STARTERHOUSE",
  name: "STARTERHOUSE",
  cost: 52000,
  mortgage: 46000,
  downpay: 6000,
  value: 20,
};

let choiceOfItem = "realestate";

let setaddedData = (obj) => {
  addedData = obj;
};

let setcash = (num) => {
  props.cash = num;
};

let submitted = (value) => {
  console.log(value);
};

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
