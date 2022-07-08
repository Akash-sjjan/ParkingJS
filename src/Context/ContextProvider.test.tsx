import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { ContextProvider } from "./ContextProvider";

it("should render context provider", () => {
  render(<ContextProvider />);
});
