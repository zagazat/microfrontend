import React from "react";
import ReactDom from "react-dom";
import { App } from "./components/App";

declare var require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (
    paths: string[],
    callback: (require: <T>(path: string) => T) => void
  ) => void;
};

ReactDom.render(<App />, document.getElementById("root"));
