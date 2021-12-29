import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { loadDevTools } from "jira-dev-tool";
// 务必在jira后引入
import 'antd/dist/antd.less'
import { AppProviders } from "./context";

loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);
