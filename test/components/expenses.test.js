import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Expenses from "../../src/components/expenses";
import sampledata from "../sampledata";
import totalUp from "../../src/functions/totalUp";

let totalExpenses = totalUp(sampledata.expenses);

test("expenses shows up", () => {
  render(
    <Expenses props={sampledata.expenses} totalExpenses={totalExpenses} />
  );
  let expenses = screen.getByRole("heading", { name: "Expenses" });
  expect(expenses).toBeDefined();
});
