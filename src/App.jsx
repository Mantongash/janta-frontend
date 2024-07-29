import Router from "./assets/components/Router";
import StateContextProvider from "./context/state";
function App() {
  return (
    <StateContextProvider>
      {" "}
      <Router />
    </StateContextProvider>
  );
}

export default App;
