// import { StrictMode } from "react";
// Import modules
import { createRoot } from "react-dom/client";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
// Import components
import "./global.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
