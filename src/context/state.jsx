import { createContext, useState } from "react";

export const StateContext = createContext();

function StateContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [agencyData, setAgencyData] = useState(null);


  return (
    <StateContext.Provider value={{ currentUser, setCurrentUser, agencyData, setAgencyData }}>
      {children}
    </StateContext.Provider>
  );
}

export default StateContextProvider;
