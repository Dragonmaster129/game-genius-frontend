import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import data from "../../sampledata";
import Category from "../../../src/components/income/category";

import totalUp from "../../../src/functions/totalUp";

let realestateIsOpen = false;

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
  let norealestate = undefined;
  try {
    norealestate = screen.getByText(
      `Real Estate: ${totalUp(data.assets.realestate).toLocaleString("en-US")}`
    );
  } catch (error) {
    console.log("Failed Successfully");
  }

  render(
    <Category
      showData={showData}
      items={data.assets.realestate}
      isOpen={realestateIsOpen}
      click={() => (realestateIsOpen = !realestateIsOpen)}
      className="realestate"
      title="realestate"
      totalValue={totalUp(data.assets.realestate)}
    />
  );
  let realestate = screen.getByText(
    `realestate: ${totalUp(data.assets.realestate).toLocaleString("en-US")}`
  );
  expect(norealestate).toBeUndefined();
  expect(realestate).toBeDefined();
});

test("Clicking on the realestate will open the section", () => {
  render(
    <Category
      showData={showData}
      items={data.assets.realestate}
      isOpen={realestateIsOpen}
      click={() => (realestateIsOpen = !realestateIsOpen)}
      className="realestate"
      title="realestate"
      totalValue={totalUp(data.assets.realestate)}
    />
  );
  let button = screen.getByRole("heading", {
    name: `realestate: ${totalUp(data.assets.realestate).toLocaleString(
      "en-US"
    )}`,
  });
  fireEvent.click(button);
  render(
    <Category
      showData={showData}
      items={data.assets.realestate}
      isOpen={realestateIsOpen}
      click={() => (realestateIsOpen = !realestateIsOpen)}
      className="realestate"
      title="realestate"
      totalValue={totalUp(data.assets.realestate)}
    />
  );
  let lowerData = screen.getByText("200");
  expect(lowerData).toBeDefined();
});
