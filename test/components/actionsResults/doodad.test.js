import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Doodad from "../../../src/components/actionsResults/doodad";

test("doodad is displayed", () => {
  render(<Doodad />);
  let doodad = screen.getByText("DOODAD");
  expect(doodad).toBeDefined();
});
