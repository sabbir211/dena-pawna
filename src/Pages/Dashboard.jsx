import { useContext, useState } from "react";
import { Outlet } from "react-router";
import AddTransactionModal from "../Components/AddTransactionModal.jsx";
import { AuthContext } from "../Provider/AuthProvider";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [prefill, setPrefill] = useState(null);
  const [version, setVersion] = useState(0);
  const [modalKey, setModalKey] = useState(0); 
  console.log("prefill in Dashboard:", prefill);
const openAddMoney = (person, direction) => {
  setPrefill(
    person
      ? { name: person.name, receiverEmail: person.email, ...(direction && { direction }) }
      : null
  );
  setModalKey((prevKey) => prevKey + 1); 
  setModalOpen(true);
};
  const handleAddTransaction = async (data, proofFile) => {
    const token = await user.getIdToken();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.message || "Failed to add transaction");
    setVersion((v) => v + 1); // tells the active page to reload
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
      <Outlet context={{ openAddMoney, version }} />
      <AddTransactionModal
        open={modalOpen}
        prefill={prefill}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddTransaction}
        key={modalKey}
      />
    </div>
  );
}