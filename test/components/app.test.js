import React from "react";
import renderer from "react-test-renderer";
import App from "../../src/components/app";

const component = renderer.create(<App />);
const tree = component.toJSON();

test("app is the same as it was last time", () => {
  expect(tree).toMatchSnapshot();
});
