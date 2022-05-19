import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import sampledata from "../../sampledata";
import Sell from "../../../src/components/actionsResults/sell";
import endData from "../../endDataSell";

let data = sampledata;
let cash = 3950;
let setdata = (value) => (data = value);
let setcash = (value) => (cash = value);
let onChange = (value) => {};

test("renders data", () => {
  render(
    <Sell
      data={data}
      setdata={setdata}
      cash={cash}
      setcash={setcash}
      submitted={onChange}
    />
  );
  let sell = screen.getByText("No Item Selected");
  expect(sell).toBeDefined();
});

test("when selling an item it removes it from data", () => {
  render(
    <Sell
      data={data}
      setdata={setdata}
      cash={cash}
      setcash={setcash}
      submitted={onChange}
    />
  );
  fireEvent.click(screen.getByRole("option", { name: "REALESTATE" }));
  fireEvent.click(screen.getAllByRole("option", { name: "3/2 HOUSE" })[0]);
  fireEvent.change(
    screen.getByTestId("input-target", { target: { value: "100000" } })
  );
  fireEvent.click(screen.getByRole("button"));
  expect(data).toEqual(endData);
});
