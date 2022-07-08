import "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Context from "../Context/ContextProvider";
import Register from "./Register";

it("should render Register", () => {
  const context: any = {
    setParking: jest.fn(),
    parking: [
      {
        id: 1,
        RegNo: "",
        checkIn: "",
        checkOut: "",
        spaceNo: "",
        available: true,
      },
    ],
  };
  render(
    <BrowserRouter>
      <Context.Provider value={context}>
        <Register />
      </Context.Provider>
    </BrowserRouter>
  );

  const btn = screen.getByTestId("cancel_btn");
  const click = fireEvent.click(btn);
  expect(click).toBe(true);
  const regBtn = screen.getByTestId("parking-drawing-add-carbutton");
  const input = screen.getByLabelText("Enter Vehicle Number");
  fireEvent.change(input, { target: { value: "asd" } });
  expect(regBtn).toBeEnabled();
  let clickRegBtn = fireEvent.click(regBtn);
  expect(clickRegBtn).toBe(true);
});
