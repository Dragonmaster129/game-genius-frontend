import React from "react";
import renderer from "react-test-renderer";
import Assets from "../../src/components/assets";
import externalData from "../sampledata";

test("assets component is the same as what it was", () => {
  const component = renderer.create(<Assets props={externalData.assets} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
