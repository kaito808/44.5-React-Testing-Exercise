import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

test("should render the Carousel component without errors", () => {
  render(<Carousel />);
});

test("should match the snapshot of the Carousel component", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

test("should correctly navigate when clicking the right arrow", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

test("should hide/show arrows appropriately", () => {
  const { getByTestId } = render(<Carousel />);
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");

  expect(leftArrow).toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  fireEvent.click(getByTestId("right-arrow"));

  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  fireEvent.click(rightArrow);

  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).toHaveClass("hidden");
});

test("should correctly navigate when clicking the left arrow", () => {
  const { getByTestId, queryByAltText } = render(<Carousel />);
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");

  fireEvent.click(rightArrow);

  fireEvent.click(leftArrow);

  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();
});
