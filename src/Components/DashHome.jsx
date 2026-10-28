import React, { use, useContext, useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";
import { FiPlus, FiSearch } from "react-icons/fi";
// import AddTransactionModal from "./addTransactionModal";
import EmptyState from "./EmptyState";
import BalanceRow from "./BalanceRow";
import { AuthContext } from "../Provider/AuthProvider";
import { useOutletContext } from "react-router";
import Loader from "./Loader";

export default function DashHome() {
  const { user } = useContext(AuthContext);
  const { openAddMoney, version } = useOutletContext();
  const [tab, setTab] = useState("owedToYou");
  const [modalOpen, setModalOpen] = useState(false);
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const getToken = async () => {
    if (user) {
      const token = await user.getIdToken();
     
      return token;
    }
  };
console.log("User in DashHome:");
  useEffect(() => {
    const fetchMyDenaPawnaList = async () => {
      
      await fetch(`${API_BASE_URL}/api/transactions/my-dena-pawna-list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPairs(data.pairs);
          console.log("My dena pawna list:", data);
        })
        .catch((err) => {
          console.error("Error fetching my dena pawna list:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (user) {
      fetchMyDenaPawnaList();
    }
  }, [user, version]);


  const classifyPair = (pair) => {
    const userEmail = user?.email.toLowerCase();
    const isContactA = pair.contactA.email === userEmail;
    const isContactB = pair.contactB.email === userEmail;

    if (!isContactA && !isContactB) {
      return null;
    }

    if (pair.netAmount === 0) {
      return "settled";
    }

    const iWillGet =
      (isContactA && pair.netAmount > 0) || (isContactB && pair.netAmount < 0);

    return iWillGet ? "iWillget" : "IHaveToGive";
  };



  const iWillGetPairs = (pairs).filter(
    (pair) => classifyPair(pair) === "iWillget",
  );
  const iHaveToGivePairs = pairs?.filter(
    (pair) => classifyPair(pair) === "IHaveToGive",
  );
  const settledPairs = pairs?.filter((pair) => classifyPair(pair) === "settled");

  const receivable = iWillGetPairs?.reduce((sum, p) => sum + Math.abs(p.netAmount), 0);
  const payable = Math.abs(
    iHaveToGivePairs?.reduce((sum, p) => sum + Math.abs(p.netAmount), 0),
  );
  const isEmpty = pairs?.length === 0;

 

  if(loading){
    return (
     <Loader></Loader>
    );
  }

  return (
    <div>
      <div className="mt-6">
        <SummaryCards receivable={receivable} payable={payable} />
      </div>

      {/* Quick actions */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="input input-bordered flex w-full items-center gap-2 sm:max-w-xs">
          <FiSearch className="h-4 w-4 text-base-content/50" />
          <input type="text" placeholder="Search contacts" className="grow" />
        </label>
        <button
          onClick={() => openAddMoney(null, null)}
          className="btn btn-primary gap-2 sm:w-fit"
        >
          <FiPlus /> Add Transaction
        </button>
      </div>
     

      {isEmpty ? (
        <div className="mt-10">
          <EmptyState />
        </div>
      ) : (
        <>
          {/* Mobile: tabs. Desktop: two columns side by side */}
          <div className="mt-8 tabs tabs-boxed w-fit md:hidden">
            <button
              className={`tab ${tab === "owedToYou" ? "tab-active" : ""}`}
              onClick={() => setTab("owedToYou")}
            >
              They owe me
            </button>
            <button
              className={`tab ${tab === "youOwe" ? "tab-active" : ""}`}
              onClick={() => setTab("youOwe")}
            >
              I owe them
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className={tab === "owedToYou" ? "block" : "hidden md:block"}>
              <h2 className="mb-3 font-semibold text-success">
                I will get money from{" "}
              </h2>
              {iWillGetPairs.length === 0 ? (
                <p className="text-sm text-base-content/50">
                  You're all settled up.
                </p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {iWillGetPairs.map((p) => (
                    <BalanceRow key={p.id} person={p} />
                  ))}
                </ul>
              )}
            </div>

            <div className={tab === "youOwe" ? "block" : "hidden md:block"}>
              <h2 className="mb-3 font-semibold text-error">
                I took money from
              </h2>
              {iHaveToGivePairs.length === 0 ? (
                <p className="text-sm text-base-content/50">
                  You're all settled up.
                </p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {iHaveToGivePairs.map((p) => (
                    <BalanceRow key={p.id} person={p} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}

      <div className="mt-8">
        <h2 className="mb-3 font-semibold text-base-content/60">
          Settled
        </h2>
        {settledPairs.length === 0 ? (
          <p className="text-sm text-base-content/50">
            No settled transactions.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {settledPairs.map((p) => (
              <BalanceRow key={p.id} person={p} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
