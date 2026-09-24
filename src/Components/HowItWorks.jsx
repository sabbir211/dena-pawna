import { FiPlusCircle, FiTrendingUp, FiCheckCircle } from "react-icons/fi";

const STEPS = [
  {
    icon: FiPlusCircle,
    title: "Add a transaction",
    desc: "Log who you gave money to, or received it from.",
  },
  {
    icon: FiTrendingUp,
    title: "Track the balance",
    desc: "See running totals per person, calculated automatically.",
  },
  {
    icon: FiCheckCircle,
    title: "Settle up",
    desc: "Mark full or partial repayments — dues clear instantly.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className=" px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">How It Works</h2>
        <p className="mt-3 text-base-content/70">
          Three simple steps to stay on top of every debt and due.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="card border border-base-300 bg-base-100 p-6"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>

                <div className="mt-4 text-sm font-semibold text-primary">
                  Step {i + 1}
                </div>
                <h3 className="mt-1 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-base-content/70">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}