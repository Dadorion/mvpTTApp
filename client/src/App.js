import { useSelector } from "react-redux";
import "./scss/App.scss";
import StartPage from "./pages/startPage/StartPage";
import HomePage from "./pages/homePage/HomePage";
import { initializedSuccess } from "./services/redux/reducers/app-reducer";

function App() {
  const initialized = useSelector((store) => store.app.initialized);

  if (!initialized) {
    return <StartPage initializedSuccess={initializedSuccess} />;
  }

  return <HomePage />
}

export default App;
