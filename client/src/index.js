import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NotificationContextProvider } from "./context/NotificationContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NotificationContextProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
  // </React.StrictMode>
);
