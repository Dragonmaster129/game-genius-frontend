import React from "react";
import renderer from "react-test-renderer";
import Income from "../../../src/components/income/income";

import data from "../../sampledata";

test("income returns the same as what it was", () => {
  const income = renderer.create(
    <Income props={data.assets} totalIncome={12000} passive={4000} />
  );
  let tree = income.toJSON();
  expect(tree).toMatchSnapshot();
});
