import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Context from "../Context/ContextProvider";
import Checkout from "./Checkout";

let Comp = () => {
  const context: any = {
    parking: [
      {
        id: "1",
        RegNo: "asd",
        checkIn: new Date(new Date().getDate() - 1),
        checkOut: new Date(),
        spaceNo: "1",
        available: false,
      },
      {
        id: "2",
        RegNo: "asdasd",
        checkIn: new Date(),
        checkOut: new Date(),
        spaceNo: "2",
        available: false,
      },
    ],
  };
  return (
    <Context.Provider value={context}>
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    </Context.Provider>
  );
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: {
      id: "1",
    },
  }),
}));

describe("tests", () => {
  it("should render Checkout", () => {
    render(<Comp />);
  });

  it("Should render Back button", () => {
    render(<Comp />);
    let btn = screen.getByTestId("deregister-back-button");
    let click = fireEvent.click(btn);
    expect(click).toBe(true);
  });

  it("Should render payment button", () => {
    render(<Comp />);
    let btn = screen.getByTestId("deregister-payment-button");
    let click = fireEvent.click(btn);
    expect(click).toBe(true);
  });

  it("Should render price", () => {
    render(<Comp />);
    let price = screen.getByTestId("deregister-charge");
    expect(price.innerHTML).toBe("Price: $");
  });
});
