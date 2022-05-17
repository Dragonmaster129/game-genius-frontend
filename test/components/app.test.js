import React from "react";
import App from "../../src/components/app";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
import { render, fireEvent, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

test("app rendered", () => {
  render(<App />);
  let app = screen.getByRole("heading", { name: "Player card" });
  expect(app).toBeDefined();
});

test("clicking the buy button activates the buy function", () => {
  render(<App />);
  let buyButton = screen.getByRole("button", { name: "Buy" });
  fireEvent.click(buyButton);
  let buyIsVisible = screen.getByText("BUY");
  expect(buyIsVisible).toBeDefined();
});

test("clicking the payday button changes cash", () => {
  render(<App />);
  let paydayButton = screen.getByRole("button", { name: "Payday" });
  fireEvent.click(paydayButton);
  let cash = screen.getByText("Cash: 7500");
  expect(cash).toBeDefined();
});

test("clicking the sell button creates the sell component", () => {
  render(<App />);
  let sellButton = screen.getByRole("button", { name: "Sell" });
  fireEvent.click(sellButton);
  let sellIsVisible = screen.getByText("NONE");
  expect(sellIsVisible).toBeDefined();
});
