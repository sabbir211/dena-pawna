import React, { useContext, useEffect } from "react";
import {
  FiArrowDownLeft,
  FiArrowUpRight,
  FiCheck,
  FiImage,
  FiX,
} from "react-icons/fi";
import { AuthContext } from "../Provider/AuthProvider";

const fmtDay = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

const fmtDateTime = (d) => {
  const date = new Date(d);
  if (!d || isNaN(date)) return "";
  const day = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${day} · ${time}`;
};

const STATUS_CLS = {
  pending: "badge-warning",
  confirmed: "badge-success",
  cancelled: "badge-ghost",
};

export default function SingleLedger({
  entries,
  pagination,
  loadMore,
  loadingMore,
  moreError,
}) {
  const { user } = useContext(AuthContext);

  const onConfirm = async (entry) => {
    console.log("Confirming entry:", entry);
    fetch(
      `${import.meta.env.VITE_API_URL}/api/transactions/${entry._id}/confirm`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify({}),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Confirm response:", data);
        if (!data.success) throw new Error(data.message || "Failed to confirm");
        loadMore(1); // Reload the first page to reflect the change
      })
      .catch((err) => {
        console.error("Error confirming entry:", err);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Transaction history</h2>
        <span className="text-sm text-base-content/60">
          {pagination.totalCount} total
        </span>
      </div>

      {entries.length === 0 ? (
        <p className="mt-4 text-sm text-base-content/50">
          No transactions yet.
        </p>
      ) : (
        <ul className="mt-2 divide-y divide-base-300">
          {entries.map((e) => {
            const gave = e.direction === "give";
            const cancelled = e.status === "cancelled";
            const proofUrl = e.proofImage?.url ?? e.proofUrl;

            return (
              <li key={e._id ?? e.id} className="flex items-start gap-3 py-3">
                <div className="mt-1 text-base-content/70">
                  {gave ? <FiArrowUpRight /> : <FiArrowDownLeft />}
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={`font-semibold ${cancelled ? "text-base-content/50 line-through" : ""}`}
                  >
                    {gave ? "You gave" : "You received"}
                  </p>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-base-content/60">
                    <span>{fmtDateTime(e.createdAt)}</span>
                    {e.status && (
                      <span
                        className={`badge badge-xs ${STATUS_CLS[e.status] ?? ""}`}
                      >
                        {e.status}
                      </span>
                    )}
                    {e.dueDate && <span>Due {fmtDay(e.dueDate)}</span>}
                    {proofUrl && (
                      <a
                        href={proofUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="link flex items-center gap-1"
                      >
                        <FiImage /> Proof
                      </a>
                    )}
                    {e.note && <span className="truncate">· {e.note}</span>}
                  </div>
                </div>

                <p
                  className={`shrink-0 font-bold ${
                    cancelled
                      ? "text-base-content/50 line-through"
                      : gave
                        ? "text-success"
                        : ""
                  }`}
                >
                  {gave ? "+" : "−"}৳{e.amount.toLocaleString()}
                </p>
                <div className="flex w-16 shrink-0 justify-end gap-1">
                  {e.status === "pending" && e.createdBy.email != user.email && (
                    <>
                      <button
                        title="Confirm"
                        onClick={() => onConfirm(e)}
                        className="btn btn-ghost btn-xs btn-circle text-success"
                      >
                        <FiCheck className="h-4 w-4" />
                      </button>
                      <button
                        title="Cancel"
                        onClick={() => onCancel(e)}
                        className="btn btn-ghost btn-xs btn-circle text-error"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {pagination.hasMore && (
        <div className="mt-3 text-center">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="btn btn-ghost btn-sm w-full"
          >
            {loadingMore ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Load more"
            )}
          </button>
          {moreError && (
            <p className="mt-1 text-xs text-error">
              Couldn't load more. Try again.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
