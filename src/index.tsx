import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { loadServer, DevTools } from "jira-dev-tool";
// 务必在jira后引入
import "antd/dist/antd.less";
import { AppProviders } from "./context";

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);
