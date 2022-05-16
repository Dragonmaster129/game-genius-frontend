import React from "react";
import renderer from "react-test-renderer";
import Buy from "../../../src/components/actionsResults/buy";
import sampledata from "../../sampledata";

let data = sampledata;

const setdata = (value) => {
  data = value;
};

const onChange = () => {};

let cash = 3950;

const setcash = (value) => (cash = value);

test("buy component is the same", () => {
  const component = renderer.create(
    <Buy
      data={data}
      setdata={setdata}
      submitted={onChange}
      cash={cash}
      setcash={setcash}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
