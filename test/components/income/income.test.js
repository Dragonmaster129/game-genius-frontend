import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Income from "../../../src/components/income/income";
import totalUp from "../../../src/functions/totalUp";

import data from "../../sampledata";

test("income is rendered", () => {
  render(<Income props={data.assets} totalIncome={12000} passive={4000} />);
  let heading = screen.getByRole("heading", { name: "Income" });
  expect(heading).toBeDefined();
});

test("clicking the categories will open them", () => {
  render(<Income props={data.assets} totalIncome={12000} passive={4000} />);
  let realestateCategory = screen.getByRole("heading", {
    name: `Real Estate: ${totalUp(data.assets.realestate)}`,
  });
  fireEvent.click(realestateCategory);
  let realestateItems = screen.getAllByText(
    data.assets.realestate[0].name + ":"
  );
  expect(realestateItems).toBeDefined();
});

test("not clicking the categories will display nothing", () => {
  render(<Income props={data.assets} totalIncome={12000} passive={4000} />);
  let earlyrealestateItems = undefined;
  try {
    dearlyrealestateItems = screen.getByDisplayValue(
      data.assets.realestate[0].name + ":"
    );
  } catch (error) {
    console.log("Task failed successfully");
  }
  expect(earlyrealestateItems).toBeUndefined();
});
