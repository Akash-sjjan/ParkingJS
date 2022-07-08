import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import { fireEvent, render, screen } from "@testing-library/react";

const Comp = () => {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

it("Should render Home", () => {
  render(<Comp />);
});

it("Should have Button Disabled", () => {
  render(<Comp />);
  const btn = screen.getByTestId("Parking-create-submit-button");
  expect(btn).toBeDisabled();
});

it("Should render Textinput", () => {
  render(<Comp />);
  const input = screen.getByLabelText(/Enter a number/i);
  fireEvent.change(input, { target: { value: 3 } });
  const btn = screen.getByTestId("Parking-create-submit-button");
  expect(btn).toBeEnabled();
  let click = fireEvent.click(btn);
  expect(click).toBe(true);
});
