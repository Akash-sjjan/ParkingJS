import { render } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Context from "./Context/ContextProvider";

it("Should render App", () => {
  const context: any = {
    parking: [],
  };
  render(
    <BrowserRouter>
      <Context.Provider value={context}>
        <App />
      </Context.Provider>
    </BrowserRouter>
  );
});
