import "./App.css";
import Body from "./Body";
import ActionTabs from "./components/actionTabs/ActionTabs";
import UrlBar from "./components/urlBar/UrlBar";
import CustomSelect from "./CustomSelect";
import Loader from "./Loader";
import Main from "./Main";

function App() {
  return (
    <main className="main">
      {/* <Main /> */}
      {/* <Body /> */}
      {/* <CustomSelect /> */}
      {/* <Loader /> */}
      {/* ------------------------- */}
      <UrlBar />
      <ActionTabs />
      {/* RESPONSE_SECTION */}
    </main>
  );
}

export default App;

// Query
// Headers
// Body
