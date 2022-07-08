import "@testing-library/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Context from "../Context/ContextProvider";
import Dashboard from "./Dashboard";

const Comp: any = () => {
  const context: any = {
    setParking: jest.fn(),
    parking: [
      {
        id: "1",
        RegNo: "asd",
        checkIn: new Date(),
        checkOut: "",
        spaceNo: "1",
        available: false,
      },
      {
        id: "2",
        RegNo: "asdasd",
        checkIn: new Date(),
        checkOut: "",
        spaceNo: "2",
        available: false,
      },
    ],
  };
  return (
    <BrowserRouter>
      <Context.Provider value={context}>
        <Dashboard />
      </Context.Provider>
    </BrowserRouter>
  );
};

describe("tests", () => {
  it("should render Dashboard", () => {
    render(<Comp />);
  });

  it("Should render Back button", () => {
    render(<Comp />);
    let btn = screen.getByTestId("back-btn-dashboard");
    let click = fireEvent.click(btn);
    expect(click).toBe(true);
  });

  it("Should render checkout button", () => {
    render(<Comp />);
    let btn = screen.getByTestId("checkOutBtn-1");
    let click = fireEvent.click(btn);
    expect(click).toBe(true);
  });
});
