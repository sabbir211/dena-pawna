import { useState } from "react";
import { Link, Outlet } from "react-router";
import { FiPlus, FiSearch, FiMail, FiCheckCircle } from "react-icons/fi";
import SummaryCards from "../Components/SummaryCards";
import EmptyState from "../Components/EmptyState";
import BalanceRow from "../Components/BalanceRow";
import AddTransactionModal from "../Components/addTransactionModal";






export default function Dashboard() {

  return (
    <div className="mx-auto max-w-4/5 min-h-full px-4 py-8 md:py-8">
      <h1 className="text-2xl font-bold md:text-3xl">Dashboard</h1>
      <p className="mt-1 text-base-content/70">Here's where you stand with everyone.</p>

    <Outlet></Outlet>
    </div>
  );
}