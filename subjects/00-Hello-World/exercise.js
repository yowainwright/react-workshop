////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - change the contents of the render function and save the file
// - see the updates automatically in your browser without refreshing!
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";

/**
 * @returns <div>{some text}</div>
 */
function App() {
  return <div>Hello Dollar Shave Club!</div>;
}

ReactDOM.render(<App />, document.getElementById("app"));
