import React from "react";
import ReactDOM from "react-dom/client";  // Correct import for React 18
import App from "./App";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
