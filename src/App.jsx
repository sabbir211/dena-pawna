import { useState } from "react";

import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
