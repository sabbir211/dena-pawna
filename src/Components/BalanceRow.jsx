import { Link } from "react-router";
import { FiChevronRight } from "react-icons/fi";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";

export const fmtDate = (d) => {
  const date = new Date(d);
  return d && !isNaN(date)
    ? date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
    : null;
};

const timeAgo = (d) => {
  const date = new Date(d);
  if (!d || isNaN(date)) return null;
  const days = Math.floor((Date.now() - date) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  return fmtDate(d);
};

const TONE = {
  positive: {
    avatar: "bg-success/15 text-success",
    amount: "text-success",
    sign: "+",
    label: "Owes you",
  },
  negative: {
    avatar: "bg-error/15 text-error",
    amount: "text-error",
    sign: "-",
    label: "You owe",
  },
  zero: {
    avatar: "bg-base-200 text-base-content/60",
    amount: "text-base-content/60",
    sign: "",
    label: "Settled",
  },
};

function getStatus(person) {
  if (person.netAmount === 0)
    return { label: "Settled", cls: "bg-base-200 text-base-content/60" };

  if (person.dueDate) {
    const days = Math.ceil((new Date(person.dueDate) - new Date()) / 86400000);
    if (days < 0)
      return { label: `Overdue ${-days}d`, cls: "bg-error/10 text-error" };
    if (days === 0)
      return { label: "Due today", cls: "bg-warning/15 text-warning" };
    return { label: `Due in ${days}d`, cls: "bg-info/10 text-info" };
  }

  // if (person.hasPending) return { label: "Awaiting confirmation", cls: "bg-warning/15 text-warning" };
  // return { label: "Active", cls: "bg-success/10 text-success" };
}

export default function BalanceRow({ person }) {
  const { user } = useContext(AuthContext);
  const tone =
    person.netAmount > 0
      ? TONE.positive
      : person.netAmount < 0
        ? TONE.negative
        : TONE.zero;
  const status = getStatus(person);

  const dueText = fmtDate(person.dueDate) && `Due ${fmtDate(person.dueDate)}`;
  const ago = timeAgo(person.updatedAt);
  const dateText = dueText || (ago && `Last activity ${ago}`);
const name = person.contactA.email === user.email ? person.contactB.name : person.contactA.name;
const contactId = person.contactA.email === user.email ? person.contactB._id : person.contactA._id;

  return (
    <li>
      <Link
        to={`/dashboard/ledger/${contactId}`}
        className="group flex items-center gap-2 md:gap-4 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm transition hover:shadow-md sm:p-5"
      >
        {/* Avatar */}
        <div
          className={`flex h-4 w-4 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-full md:text-xl font-semibold ${tone.avatar}`}
        >
          {name.charAt(0).toUpperCase()}
        </div>

        {/* Name + status + date */}
        <div className="min-w-0 flex-1">
          <p className="truncate md:text-lg font-semibold">{name}</p>
          
          <div className="mt-1.5 flex flex-wrap items-center md:gap-x-3 gap-y-1">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${status.cls}`}
            >
              <span className="h-2 w-2 rounded-full bg-current" />
              {status.label}
            </span>

            {dateText && (
              <>
                <span className="hidden h-4 w-px bg-base-300 sm:block" />
                <span className="text-sm text-base-content/60">{dateText}</span>
              </>
            )}
          </div>
        </div>

        {/* Amount + who owes whom */}
        <div className="shrink-0 text-right">
          <p className={`text-xl font-bold md:text-2xl ${tone.amount}`}>
            {tone.sign}৳{Math.abs(person.netAmount).toLocaleString()}
          </p>
          <p className="text-sm text-base-content/60">{tone.label}</p>
        </div>

        <FiChevronRight className="h-5 w-5 shrink-0 text-base-content/40 transition group-hover:translate-x-0.5 group-hover:text-primary" />
      </Link>
    </li>
  );
}
