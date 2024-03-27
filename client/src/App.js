import { useSelector } from "react-redux";
import "./scss/App.scss";
import StartPage from "./pages/startPage/startPage";
import { initializeAppTC } from "./services/redux/reducers/app-reducer";

function App() {
  const initialized = useSelector((store) => store.app.initialized);

  if (!initialized) {
    return <StartPage initializeAppTC={initializeAppTC} />;
  }

  return (
    <div className="App">
      <p>App page</p>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   initialized: state.app.initialized,
// });

export default App;
// export default compose(withRouter, connect(mapStateToProps, {initializeAppTC}))(App);
