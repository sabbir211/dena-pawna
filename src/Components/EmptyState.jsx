import { FiPlus } from "react-icons/fi";
import { Link } from "react-router";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-box border border-dashed border-base-300 bg-base-200/50 px-6 py-12 text-center">
      <p className="font-medium">No debts tracked yet</p>
      <p className="text-sm text-base-content/70">
        Add your first transaction to start seeing who owes who.
      </p>
      <Link to="/transactions/new" className="btn btn-primary btn-sm mt-2 gap-2">
        <FiPlus /> Add Transaction
      </Link>
    </div>
  );
}