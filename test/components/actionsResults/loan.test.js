import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import BorrowLoan from "../../../src/components/actionsResults/loan";
import sampledata from "../../sampledata";

let cash = 3950;
let setcash = (value) => (cash = value);
let data = sampledata;
let setdata = (newdata) => (data = newdata);
let setborrowLoan = (value) => {};

test("When loan isn't rendered there is nothing", () => {
  let nothing = undefined;
  try {
    nothing = screen.getByText("DO IT!");
  } catch (error) {
    console.log("another test failed successfully");
  }
  expect(nothing).toBeUndefined();
});

test("Loan is rendered", () => {
  render(
    <BorrowLoan
      cash={cash}
      setcash={setcash}
      data={data}
      setdata={setdata}
      setborrowLoan={setborrowLoan}
    />
  );
  let borrowLoan = screen.getByText("DO IT!");
  expect(borrowLoan).toBeDefined();
});

test("Clicking the button will add a loan to the playerdata", () => {
  render(
    <BorrowLoan
      cash={cash}
      setcash={setcash}
      data={data}
      setdata={setdata}
      setborrowLoan={setborrowLoan}
    />
  );
  let doitbutton = screen.getByRole("button", { name: "DO IT!" });
  fireEvent.click(doitbutton);
  expect(data.expenses.loan).toEqual(1000);
});
