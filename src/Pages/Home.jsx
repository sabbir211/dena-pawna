import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Hero from "../Components/Hero";
import HowItWorks from "../Components/HowItWorks";
import Features from "../Components/Features";
import CTA from "../Components/CTA";

export default function Home() {
  return (
    <div>
    <Hero></Hero>
    <HowItWorks></HowItWorks>
    <Features></Features>
    <CTA></CTA>
    </div>
  );
}
