import React from "react";
import renderer from "react-test-renderer";
import App from "../../src/components/app";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const component = renderer.create(<App />);
render(<App />);
let tree = component.toJSON();

test("app is the same as it was last time", () => {
  // TODO change tests to use testing-library/react
  let buybutton = screen.getByRole("button", { name: "Buy" });
  // TypeError: element.getRootNode is not a function
  fireEvent.click(buybutton);
  let buyIsVisible = screen.getByText("BUY");
  expect(buyIsVisible).toBeDefined();
  // renderer.act(() => {
  //   // Incomplete!!! TODO
  //   wrapper.find("Button").prop("onClick")();
  // });
  // tree = component.toJSON();
  // expect(tree2).toMatchSnapshot();
});

// test("click", () => {
//   render(
//     <div>
//       <label htmlFor="checkbox">Check</label>
//       <input id="checkbox" type="checkbox" />
//     </div>
//   );

//   userEvent.click(screen.getByText("Check"));
//   expect(screen.getByLabelText("Check")).toBeChecked();
// });
