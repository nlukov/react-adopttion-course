import React from "react";
// import ReactDOM from "react-dom";
import { render } from "react-dom";
import SearchParams from "./SearchParams";

//use of React.StrictMode. This will throw warnings for things that the React Team will depricate.
//It is recommended to use this for new applciations and NOT for legacy!
const App = () => {
  return (
    <React.StrictMode>
      <div>
        <h1 id="something-important">Adopt Me!</h1>
        <SearchParams />
      </div>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
