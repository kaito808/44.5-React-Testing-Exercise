import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

test("renders Card component without crashing", () => {
  render(<Card />);
});

test("matches Card component snapshot", () => {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});
