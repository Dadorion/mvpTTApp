import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./scss/App.scss";
import { Route, Routes } from "react-router-dom";
import { initializeAppTC } from "./services/redux/reducers/app-reducer";
import Registration from "./pages/registration/Registration";
import Login from "./pages/login/Login";
import Spinner from "./components/SpinnerPreloader/Spinner";
import AuthRedirect from "./components/AuthRedirect/AuthRedirect";
import Content from "./pages/content/Content";

function App() {
  const initialized = useSelector((store) => store.app.initialized);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, [dispatch]);

  if (!initialized) {
    return <Spinner />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <AuthRedirect>
              <Content />
            </AuthRedirect>
          }
        />
      </Routes>
    </div>
  );
}


export default App;
