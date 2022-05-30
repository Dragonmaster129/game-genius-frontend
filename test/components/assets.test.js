import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Assets from "../../src/components/assets";
import externalData from "../sampledata";

test("assets component is the same as what it was", () => {
  render(<Assets props={externalData.assets} />);
  let assets = screen.getByRole("heading", { name: "Assets" });
  expect(assets).toBeDefined();
});
