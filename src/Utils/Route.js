import { createBrowserRouter } from "react-router";
import App from "../App.jsx";
import Home from "../Pages/Home.jsx";
export const route = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);
