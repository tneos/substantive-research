import Form from "./Form";

import {useContext} from "react";
import "./App.css";
import Results from "./Results";

// State
import AppState from "./context/AppState";

const App = () => {
  return (
    <div className="container my-5">
      <AppState>
        <Form />
        <Results />
      </AppState>
    </div>
  );
};

export default App;
