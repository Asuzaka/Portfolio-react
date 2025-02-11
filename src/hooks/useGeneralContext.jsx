import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const GeneralContext = createContext();

function GeneralProvider({ children }) {
  const [dark, setDark] = useState(false);
  return (
    <GeneralContext.Provider value={{ dark, setDark }}>
      {children}
    </GeneralContext.Provider>
  );
}

function useGeneralContext() {
  const context = useContext(GeneralContext);
  if (context === undefined)
    throw new Error("Context was used outside of its scope");
  return context;
}

export { GeneralProvider, useGeneralContext };
