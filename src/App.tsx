import "./sass/import.scss";
import Router from "./router/Router";
import DifficultyProvider from "./context/Difficulty";

function App() {
  return <>
    <DifficultyProvider>
      <Router />
    </DifficultyProvider>
  </>
}

export default App;
