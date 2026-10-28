import { useContext, useEffect, useState } from "react";
import { Link, useParams, useOutletContext } from "react-router";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiArrowDownLeft,
  FiPlusCircle,
  FiCreditCard,
  FiMessageCircle,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import { AuthContext } from "../Provider/AuthProvider";
import SingleLedger from "./SingleLedger";
import Loader from "./Loader";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const PAGE_SIZE = 10;

const TONE = {
  positive: { text: "text-success", avatar: "bg-success/15 text-success" },
  negative: { text: "text-error", avatar: "bg-error/15 text-error" },
  zero: {
    text: "text-base-content/60",
    avatar: "bg-base-200 text-base-content/60",
  },
};

const tileCls =
  "flex w-full flex-col items-center gap-1 rounded-2xl border border-base-300 bg-base-100 p-5 text-center transition hover:border-primary/40 hover:bg-base-200/50";

function ActionTile({
  as: Tag = "button",
  icon: Icon,
  title,
  subtitle,
  className = "",
  ...props
}) {
  return (
    <Tag className={`${tileCls} ${className}`} {...props}>
      <Icon className="h-5 w-5 text-primary" />
      <span className="mt-1 font-semibold">{title}</span>
      <span className="text-xs text-base-content/60">{subtitle}</span>
    </Tag>
  );
}

export default function PairLedger() {
  const { contactId } = useParams();
  const { openAddMoney, version } = useOutletContext();
  const { user } = useContext(AuthContext);

  const [person, setPerson] = useState(null);
  const [entries, setEntries] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [moreError, setMoreError] = useState(false);
  const [error, setError] = useState("");

  const fetchPage = async (page) => {
    const token = await user.getIdToken();
    const res = await fetch(
      `${API_BASE_URL}/api/transactions/ledger/${contactId}?page=${page}&limit=${PAGE_SIZE}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const body = await res.json().catch(() => ({}));
    if (!res.ok)
      throw new Error(body.message || `Server responded with ${res.status}`);
    return body;
  };

  const refreshPage = async (page) => {
    const json = await fetchPage(page);
    const pageSize = json.pagination.limit || PAGE_SIZE;
    const pageStart = (page - 1) * pageSize;
    setPerson(json.person);
    setEntries((previousEntries) => [
      ...previousEntries.slice(0, pageStart),
      ...json.entries,
      ...previousEntries.slice(pageStart + pageSize),
    ]);
    setPagination((previousPagination) => ({
      ...previousPagination,
      totalCount: json.pagination.totalCount,
      totalPages: json.pagination.totalPages,
      hasMore:
        previousPagination.currentPage * pageSize < json.pagination.totalCount,
    }));
  };

  // First page. Runs again when a transaction is added (version changes).
  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    (async () => {
      try {
        const json = await fetchPage(1);
        if (cancelled) return;
        setPerson(json.person);
        setEntries(json.entries);
        setPagination(json.pagination);
        setError("");
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [contactId, user, version]);

  const loadMore = async () => {
    setLoadingMore(true);
    setMoreError(false);
    try {
      const json = await fetchPage(pagination.currentPage + 1);
      setEntries((prev) => [...prev, ...json.entries]);
      setPagination(json.pagination);
    } catch {
      setMoreError(true);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return <Loader></Loader>;
  }
  if (error || !person) {
    return (
      <p className="text-error">{error || "Couldn't load this ledger."}</p>
    );
  }

  const amount = person.amount;
  const positive = amount > 0;
  const negative = amount < 0;
  const tone = positive ? TONE.positive : negative ? TONE.negative : TONE.zero;
  const firstName = person.name.split(" ")[0];

  const mailto =
    `mailto:${person.email}` +
    `?subject=${encodeURIComponent("Payment reminder")}` +
    `&body=${encodeURIComponent(
      `Hi ${firstName}, a friendly reminder that ৳${Math.abs(amount).toLocaleString()} is due. Thanks!`,
    )}`;

  console.log("entries in PairLedger:", entries);

  return (
    <div className="mx-auto  rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-base-content"
      >
        <FiArrowLeft /> Back to dashboard
      </Link>

      {/* Profile */}
      <div className="mt-5 flex items-center gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl font-semibold ${tone.avatar}`}
        >
          {person.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold">{person.name}</h1>
          <p className="text-sm text-base-content/60">
            {amount === 0 ? "Settled" : "Active contact"}
          </p>
          <p>{person.email}</p>
        </div>
      </div>

      {/* Net balance */}
      <div className="mt-6">
        <p className="text-sm text-base-content/60">Net balance</p>
        <p className={`mt-1 text-3xl font-bold ${tone.text}`}>
          {positive ? "+" : negative ? "-" : ""}৳
          {Math.abs(amount).toLocaleString()}
        </p>
        <p className="mt-1 text-sm text-base-content/60">
          {positive
            ? `You will get from ${firstName} `
            : negative
              ? `You will pay to ${firstName}`
              : "All settled up"}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <ActionTile
          icon={FiArrowUpRight}
          title="Send money"
          subtitle={`Sent to ${firstName}`}
          onClick={() => openAddMoney(person, "give")}
        />
        <ActionTile
          icon={FiArrowDownLeft}
          title="Receive money"
          subtitle={`Got from ${firstName}`}
          onClick={() => openAddMoney(person, "take")}
        />

        {positive && (
          <div className="dropdown w-full">
            <ActionTile
              as="div"
              tabIndex={0}
              role="button"
              icon={FiMessageCircle}
              title="Remind"
              subtitle="Send a reminder"
            />
            <ul
              tabIndex={0}
              className="menu dropdown-content z-10 mt-2 w-full rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
            >
              <li>
                <a href={mailto}>
                  <FiMail /> Email
                </a>
              </li>
              <li className="menu-disabled">
                <span>SMS · Coming soon</span>
              </li>
            </ul>
          </div>
        )}

        <ActionTile
          as="a"
          href={person.phone ? `tel:${person.phone}` : undefined}
          aria-disabled={!person.phone}
          icon={FiPhone}
          title="Call"
          subtitle={person.phone ? `Contact ${firstName}` : "No phone saved"}
          className={`${!person.phone ? "pointer-events-none opacity-40" : ""} ${
            !positive ? "col-span-2" : ""
          }`}
        />
      </div>

      <div className="my-6 h-px bg-base-300" />

      {/* History */}
      <SingleLedger
        entries={entries}
        pagination={pagination}
        refreshPage={refreshPage}
        loadMore={loadMore}
        loadingMore={loadingMore}
        moreError={moreError}
      />
    </div>
  );
}
