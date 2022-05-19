import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, screen } from "@testing-library/react";
import Income from "../../../src/components/income/income";
import "@testing-library/jest-dom";
import totalUp from "../../../src/functions/totalUp";

import data from "../../sampledata";

test("income is rendered", () => {
  render(<Income props={data.assets} totalIncome={12000} passive={4000} />);
  let heading = screen.getByRole("heading", { name: "Income" });
  expect(heading).toBeDefined();
});

test("clicking the categories will open them", () => {
  render(<Income props={data.assets} totalIncome={12000} passive={4000} />);
  let interestCategory = screen.getByRole("heading", {
    name: `Interest: ${totalUp(data.assets.interest)}`,
  });
  fireEvent.click(interestCategory);
  let interestItems = screen.getByText(data.assets.interest[0].name + ":");
  expect(interestItems).toBeDefined();
});

test("not clicking the categories will display nothing", () => {
  render(<Income props={data.assets} totalIncome={12000} passive={4000} />);
  let earlyInterestItems = undefined;
  try {
    dearlyInterestItems = screen.getByDisplayValue(
      data.assets.interest[0].name + ":"
    );
  } catch (error) {
    console.log("Task failed successfully");
  }
  expect(earlyInterestItems).toBeUndefined();
});
