import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
}
