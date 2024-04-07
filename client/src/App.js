import { useSelector } from "react-redux";
import "./scss/App.scss";
import StartPage from "./pages/startPage/StartPage";
import HomePage from "./pages/homePage/HomePage";
import { initializedSuccess } from "./services/redux/reducers/app-reducer";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/profile/Profile";
import Tabbar from "./components/Tabbar/Tabbar";
import Tournament from "./pages/tournament/Tournament";

function App() {
  const initialized = useSelector((store) => store.app.initialized);

  if (!initialized) {
    return <StartPage initializedSuccess={initializedSuccess} />;
  }

  return (
    <div  className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/counter" element={<Tournament />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Tabbar />
    </div>
  );
}

export default App;
