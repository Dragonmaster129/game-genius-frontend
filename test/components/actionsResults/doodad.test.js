import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Doodad from "../../../src/components/actionsResults/doodad";
import "@testing-library/jest-dom";

test("doodad is displayed", () => {
  render(<Doodad />);
  let doodad = screen.getByText("Doodad");
  expect(doodad).toBeDefined();
});
