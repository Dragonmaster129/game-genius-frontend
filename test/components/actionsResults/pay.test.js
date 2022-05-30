import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Pay from "../../../src/components/actionsResults/pay";

let cash = 3950;
let setcash = (value) => (cash = value);
let onChange = (value) => {};

test("renders", () => {
  render(<Pay cash={cash} setcash={setcash} submitted={onChange} />);
  let pay = screen.getByRole("button");
  expect(pay).toBeDefined();
});

test("clicking will decrease your cash", () => {
  render(<Pay cash={cash} setcash={setcash} submitted={onChange} />);
  let pay = screen.getByRole("button");
  fireEvent.click(pay);
  expect(cash).toEqual(3850);
});
