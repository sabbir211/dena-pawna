import {
  FiPlusCircle,
  FiUsers,
  FiPieChart,
  FiLayers,
  FiMail,
  FiSearch,
  FiDownload,
  FiClock,
  FiMessageSquare,
 
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";


const CURRENT_FEATURES = [
  { icon: FiPlusCircle, title: "Add, edit & delete transactions", desc: "Log every owe and lend, with full control to fix mistakes." },
  { icon: FiUsers, title: "Per-contact history", desc: "See a running balance and full timeline with each person." },
  { icon: FiPieChart, title: "Dashboard summary", desc: "One glance shows exactly how much you'll receive vs owe." },
  { icon: FiLayers, title: "Partial payments", desc: "Repayments don't have to be all at once — track partial settlements." },
  { icon: FiMail, title: "Email reminders", desc: "Send a one-click nudge to anyone with a pending due." },
  { icon: FiSearch, title: "Search & filter", desc: "Find any contact or transaction in seconds." },
  { icon: FiDownload, title: "Export statement", desc: "Download your ledger as proof, anytime." },
  { icon: FiClock, title: "Automatic due alerts", desc: "Get emailed automatically the day a payment is due." },
];

const UPCOMING_FEATURES = [
  { icon: HiSparkles, title: "Natural language entry", desc: "Just type \"gave Rahim 500 for lunch\" — AI fills the form for you." },
  { icon: FiMessageSquare, title: "AI monthly summaries", desc: "A plain-language recap of what you lent, owed, and settled." },
];

export default function Features() {
  return (
    <section className="bg-base-100 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Everything you need</h2>
          <p className="mt-3 text-base-content/70">
            Built to keep every debt and due organized, without the mental math.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CURRENT_FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="card border border-base-300 bg-base-100 p-5">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-base-content/70">{f.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Coming soon */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold">Coming soon</h3>
          <p className="mt-2 text-base-content/70">AI-powered features, on the way.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {UPCOMING_FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="card relative border border-dashed border-base-300 bg-base-200/50 p-5 opacity-80"
              >
                <span className="badge badge-secondary badge-sm absolute right-4 top-4">
                  Coming soon
                </span>
                <Icon className="h-6 w-6 text-secondary" />
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-base-content/70">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}