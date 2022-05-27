import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import BorrowLoan from "../../../src/components/actionsResults/borrowloan";
import sampledata from "../../sampledata";
import endData from "../../endDataBorrow";

let cash = 3950;
let setcash = (value) => (cash = value);
let data = sampledata;
let setdata = (value) => (data = value);
let setborrowLoan = (value) => {};

test("borrowloan renders", () => {
  render(
    <BorrowLoan
      cash={cash}
      setcash={setcash}
      data={data}
      setdata={setdata}
      setborrowLoan={setborrowLoan}
    />
  );
  let borrow = screen.getByRole("button");
  expect(borrow).toBeDefined();
});

test("Clicking the button will add a loan to you card", () => {
  render(
    <BorrowLoan
      cash={cash}
      setcash={setcash}
      data={data}
      setdata={setdata}
      setborrowLoan={setborrowLoan}
    />
  );
  let borrowButton = screen.getByRole("button");
  fireEvent.click(borrowButton);
  expect(data).toEqual(endData);
});
