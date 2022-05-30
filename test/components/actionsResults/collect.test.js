import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Collect from "../../../src/components/actionsResults/collect";

let cash = 3950;
let setcash = (value) => (cash = value);
let onChange = (value) => {};

test("renders the item", () => {
  render(<Collect cash={cash} setcash={setcash} submitted={onChange} />);
  let collect = screen.getByRole("button");
  expect(collect).toBeDefined();
});

test("clicking the button will add cash", () => {
  render(<Collect cash={cash} setcash={setcash} submitted={onChange} />);
  let collectButton = screen.getByRole("button");
  fireEvent.click(collectButton);
  expect(cash).toEqual(4050);
});
