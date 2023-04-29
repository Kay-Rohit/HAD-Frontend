import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/users/userReducer";
import requestReducer from "./reducers/requests/requestReducer";
import doctorReducer from "./reducers/doctors/doctorReducer";
import articleReducer from "./reducers/articleReducer";
import defaultQuestionaire from "./reducers/defaultContentReducer";

const store = configureStore({
  reducer: {
    users: userReducer,
    requests: requestReducer,
    doctors: doctorReducer,
    articles: articleReducer,
    questions: defaultQuestionaire
  },
});



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
        <App />
  </Provider>
  // </React.StrictMode>
);
reportWebVitals();
