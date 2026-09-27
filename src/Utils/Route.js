import { createBrowserRouter } from "react-router";
import App from "../App.jsx";
import Home from "../Pages/Home.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
export const route = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      
      },
      {
        path: "/login",
        Component:Login
      },
      {
        path: "/register",
        Component: Register
      }
    ],
  },
]);
