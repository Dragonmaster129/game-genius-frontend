import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Buy from "../../../src/components/actionsResults/buy";
import sampledata from "../../sampledata";
import endData from "../../endDataBuy";

let cash = 3950;
const setcash = (value) => {
  console.log("in setcash");
  cash = value;
};
let data = sampledata;
const setdata = (value) => {
  console.log("in setdata");
  data = value;
};
const onChange = (value) => {
  console.log("in onChange");
};

test("renders", () => {
  render(
    <Buy
      data={data}
      setdata={setdata}
      submitted={onChange}
      cash={cash}
      setcash={setcash}
    />
  );
  let buy = screen.getByRole("button");
  expect(buy).toBeDefined();
});

test("buy an item", async () => {
  render(
    <Buy
      data={data}
      setdata={setdata}
      submitted={onChange}
      cash={cash}
      setcash={setcash}
    />
  );
  let header = screen.getByTestId("REALESTATE");
  fireEvent.click(header);
  let cost = screen.getByTestId("cost");
  let mortgage = screen.getByTestId("mortgage");
  let cashFlow = screen.getByTestId("cashFlow");
  let STARTERHOUSE = screen.getByTestId("STARTERHOUSE");
  let downpay = screen.getByTestId("downpay");
  fireEvent.click(STARTERHOUSE);
  fireEvent.change(cost, { target: { value: 52000 } });
  fireEvent.change(mortgage, { target: { value: 50000 } });
  fireEvent.change(downpay, { target: { value: 2000 } });
  fireEvent.change(cashFlow, { target: { value: 20 } });
  let BUY = screen.getByRole("button");
  fireEvent.click(BUY);
  expect(data).toEqual(endData);
});
