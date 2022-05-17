import React from "react";
import renderer from "react-test-renderer";
import App from "../../src/components/app";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
import { render, fireEvent, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

render(<App />);

test("app is the same as it was last time", () => {
  let buybutton = screen.getByRole("button", { name: "Buy" });
  fireEvent.click(buybutton);
  let buyIsVisible = screen.getByText("BUY");
  expect(buyIsVisible).toBeDefined();
});
