import "./sass/import.scss";
import Router from "./router/Router.jsx";
import DifficultyProvider from "./context/Difficulty.jsx";

function App() {
  return <>
    <DifficultyProvider>
      <Router />
    </DifficultyProvider>
  </>
}

export default App;
