import { useState } from "react";

import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
    <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default App;
