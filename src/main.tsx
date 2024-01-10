import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";
import Details from "./pages/Details";
import PlaceHolderMessage from "./components/Placeholder/PlaceHolderMessage";

export const router = createBrowserRouter([
  {
    path: "/artworks/",
    element: <App />,
    errorElement: (
      <PlaceHolderMessage
        message={"Something went wrong, please try again later"}
      />
    )
  },
  {
    path: "/artworks/:id",
    element: <Details />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
