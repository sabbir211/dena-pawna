
import { useState } from "react";
import { FiX, FiArrowUpRight, FiArrowDownLeft, FiImage } from "react-icons/fi";

const INITIAL = {
  direction: "give",
  name: "",
  receiverEmail: "",
  amount: "",
  note: "",
  dueDate: "",
};

export default function AddTransactionModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(INITIAL);
  const [proofFile, setProofFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleClose = () => {
    setForm(INITIAL);
    setProofFile(null);
    setError("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.receiverEmail || !form.amount) {
      setError("Name, email and amount are required.");
      return;
    }
    if (Number(form.amount) <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    try {
      setSubmitting(true);
      // Parent decides what to do: upload proofFile to Cloudinary, then POST to your API
      await onSubmit({ ...form, amount: Number(form.amount) }, proofFile);
      // console.log("Form submitted:", { ...form, amount: Number(form.amount) }, proofFile);
      handleClose();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const isGive = form.direction === "give";

  return (
    <div className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Add Transaction</h3>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Close"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          {/* Direction toggle */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, direction: "give" }))}
              className={`btn gap-2 ${isGive ? "btn-error" : "btn-outline"}`}
            >
              <FiArrowUpRight /> I gave money
            </button>
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, direction: "take" }))}
              className={`btn gap-2 ${!isGive ? "btn-success" : "btn-outline"}`}
            >
              <FiArrowDownLeft /> I received money
            </button>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="form-control w-full">
              <span className="label-text mb-1">
                {isGive ? "Given to" : "Received from"} (name)
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Rahim"
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1">Their email</span>
              <input
                type="email"
                name="receiverEmail"
                value={form.receiverEmail}
                onChange={handleChange}
                placeholder="rahim@example.com"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          {/* Amount + due date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="form-control w-full">
              <span className="label-text mb-1">Amount</span>
              <label className="input input-bordered flex items-center gap-2">
                <span className="text-base-content/50">৳</span>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="grow"
                />
              </label>
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1">
                Due date <span className="text-base-content/50">(optional)</span>
              </span>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </label>
          </div>

          {/* Note */}
          <label className="form-control w-full">
            <span className="label-text mb-1">
              Note <span className="text-base-content/50">(optional)</span>
            </span>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="e.g. lunch, rent share, trip"
              rows={2}
              className="textarea textarea-bordered w-full"
            />
          </label>

          {/* Proof image */}
          <label className="form-control w-full">
            <span className="label-text mb-1">
              Proof photo <span className="text-base-content/50">(optional)</span>
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProofFile(e.target.files[0] || null)}
              className="file-input file-input-bordered w-full"
            />
            {proofFile && (
              <div className="mt-2 flex items-center gap-2 text-sm text-base-content/70">
                <FiImage className="h-4 w-4" />
                <span className="truncate">{proofFile.name}</span>
              </div>
            )}
          </label>

          {error && (
            <div role="alert" className="alert alert-error py-2 text-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="modal-action mt-2">
            <button type="button" onClick={handleClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="btn btn-primary">
              {submitting ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Add Transaction"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Click outside to close */}
      <div className="modal-backdrop" onClick={handleClose} />
    </div>
  );
}