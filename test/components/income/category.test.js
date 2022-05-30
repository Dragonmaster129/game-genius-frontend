import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import data from "../../sampledata";
import Category from "../../../src/components/income/category";

import totalUp from "../../../src/functions/totalUp";

let interestIsOpen = false;

const showData = (dataArr, isOpen) => {
  if (isOpen) {
    return dataArr.map((item) => {
      return (
        <div className="item hz" key={item.key}>
          <div>{item.name}:</div>
          <div>{item.value}</div>
        </div>
      );
    });
  }
};

test("category is rendered", () => {
  let noInterest = undefined;
  try {
    noInterest = screen.getByText(
      `Interest: ${totalUp(data.assets.interest).toLocaleString("en-US")}`
    );
  } catch (error) {
    console.log("Failed Successfully");
  }

  render(
    <Category
      showData={showData}
      items={data.assets.interest}
      isOpen={interestIsOpen}
      click={() => (interestIsOpen = !interestIsOpen)}
      className="interest"
      title="Interest"
      totalValue={totalUp(data.assets.interest)}
    />
  );
  let interest = screen.getByText(
    `Interest: ${totalUp(data.assets.interest).toLocaleString("en-US")}`
  );
  expect(noInterest).toBeUndefined();
  expect(interest).toBeDefined();
});

test("Clicking on the interest will open the section", () => {
  render(
    <Category
      showData={showData}
      items={data.assets.interest}
      isOpen={interestIsOpen}
      click={() => (interestIsOpen = !interestIsOpen)}
      className="interest"
      title="Interest"
      totalValue={totalUp(data.assets.interest)}
    />
  );
  let button = screen.getByRole("heading", {
    name: `Interest: ${totalUp(data.assets.interest).toLocaleString("en-US")}`,
  });
  fireEvent.click(button);
  render(
    <Category
      showData={showData}
      items={data.assets.interest}
      isOpen={interestIsOpen}
      click={() => (interestIsOpen = !interestIsOpen)}
      className="interest"
      title="Interest"
      totalValue={totalUp(data.assets.interest)}
    />
  );
  let lowerData = screen.getByText("40");
  expect(lowerData).toBeDefined();
});
