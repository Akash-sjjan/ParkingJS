import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Payment from "./Payment";
import Context from "../Context/ContextProvider";

const Comp = () => {
  const context: any = {
    setParking: jest.fn(),
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
        RegNo: "",
        checkIn: "",
        checkOut: "",
        spaceNo: "",
        available: true,
      },
    ],
  };
  return (
    <Context.Provider value={context}>
      <BrowserRouter>
        <Payment />
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
  it("Should render payment", () => {
    render(<Comp />);
  });

  it("Home button has click event", () => {
    render(<Comp />);
    let btn = screen.getByTestId("goto-dashboard-btn");
    let click = fireEvent.click(btn);
    expect(click).toBe(true);
  });
});
