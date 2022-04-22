import React from "react";
import renderer from "react-test-renderer";
import Category from "../../../src/components/income/category";

import totalUp from "../../../src/functions/totalUp";

const assets = {
  savings: 400,
  salary: 13200,
  interest: [
    { name: "thingy", value: 40, key: 1 },
    { name: "notherone", value: 50, key: 2 },
    { name: "notherone", value: 50, key: 3 },
    { name: "notherone", value: 50, key: 4 },
    { name: "notherone", value: 50, key: 5 },
  ],
  dividends: [{ name: "2Big", value: 30, key: 1 }],
  realEstate: [
    {
      type: "3/2",
      name: "3/2 House",
      cost: 55000,
      downpay: 5000,
      value: 200,
      key: 1,
    },
    {
      type: "3/2",
      name: "3/2 House",
      cost: 55000,
      downpay: 7000,
      value: 400,
      key: 2,
    },
  ],
  businesses: [
    {
      type: "autoParts",
      name: "Auto Parts",
      cost: 100000,
      downpay: 100000,
      value: 1500,
      key: 1,
    },
    {
      type: "autoParts",
      name: "Auto Parts",
      cost: 120000,
      downpay: 120000,
      value: 1700,
      key: 2,
    },
  ],
  passive: 0,
  stock: [{ name: "OK4U", amount: 1000, costPerShare: 1, key: 1 }],
};

const [interestIsOpen, setinterestIsOpen] = useState(false);

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

test("Link changes the class when hovered", () => {
  const component = renderer.create(
    <Category
      showData={showData}
      items={assets.interest}
      isOpen={interestIsOpen}
      click={() => setinterestIsOpen(!interestIsOpen)}
      className="interest"
      title="Interest"
      totalValue={totalUp(assets.interest)}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
