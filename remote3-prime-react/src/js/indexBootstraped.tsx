import React from "react";
import ReactDom from "react-dom";
import App from "./modules/App";
import { Provider } from "mobx-react";
import terminalStore from "./core/store/Terminal";
import { configure } from "mobx";

// const stores = {
//   terminal: terminalStore,
// };

configure({
  enforceActions: "observed",
  isolateGlobalState: true,
});

ReactDom.render(<App />, document.getElementById("root"));
