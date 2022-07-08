import React, { createContext, useState } from "react";

const Context = createContext({
  parking: [],
  setParking: (a: any): any => {},
});

export const ContextProvider = (props: any) => {
  const [parking, setParking] = useState<any>([]);

  const context: any = {
    parking,
    setParking,
  };
  return (
    <div>
      <Context.Provider value={context}>{props.children}</Context.Provider>
    </div>
  );
};

export default Context;
