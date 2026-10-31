import { useState } from "react";
import { Link } from "react-router";
import { FiPlus, FiSearch, FiMail, FiCheckCircle } from "react-icons/fi";       



export default function SummaryCards({ receivable, payable }) {
  const net = receivable - payable;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="stat rounded-box border border-base-300 bg-success/10">
        <div className="stat-title">You'll receive</div>
        <div className="stat-value text-success">{receivable}</div>
      </div>
      <div className="stat rounded-box border border-base-300 bg-error/10">
        <div className="stat-title">You owe</div>
        <div className="stat-value text-error">{payable}</div>
      </div>
      <div className="stat rounded-box border border-base-300 bg-base-200">
        <div className="stat-title">Net balance</div>
        <div className={`stat-value ${net >= 0 ? "text-success" : "text-error"}`}>
          {net >= 0 ? "+" : "-"}{Math.abs(net)}
        </div>
      </div>
    </div>
  );
}