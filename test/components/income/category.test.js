import React from "react";
import renderer from "react-test-renderer";
import Category from "../../../src/components/income/category";
import data from "../../sampledata";

import totalUp from "../../../src/functions/totalUp";

let interestIsOpen = false;

const showData = (dataArr) => {
  return dataArr.map((item) => {
    return (
      <div className="item hz" key={item.key}>
        <div>{item.name}:</div>
        <div>{item.value}</div>
      </div>
    );
  });
};

test("Component returns a value", () => {
  const component = renderer.create(
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
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
