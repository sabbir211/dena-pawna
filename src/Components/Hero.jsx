import { Link } from "react-router";
import { FiArrowDown, FiArrowRight, FiCheckCircle } from "react-icons/fi";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full bg-base-100 px-2 py-14 md:w-11/12 md:py-24 lg:w-10/12 mx-auto mt-3.5"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 md:flex-row md:gap-16">
        {/* Left: text */}
        <div className="animate-fade-up flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Never forget <span className="text-error">who owes</span> you,{" "}
            <span className="text-success">ever again</span>
          </h1>

          <p className="mt-6 text-lg text-base-content/70 md:text-xl">
            Track every Dena (debt) and Pawna (due) in one place — log
            transactions, follow repayments, and always know exactly where
            you stand with everyone around you.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
            <Link to="/register" className="btn btn-primary btn-lg gap-2">
              Get Started Free
              <FiArrowRight />
            </Link>
            <a href="#how-it-works" className="btn btn-outline btn-lg">
              See How It Works
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-base-300 pt-8 text-base-content/60 md:justify-start">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-base-content">100%</div>
              <div className="text-sm">Free to use</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-base-content">৳</div>
              <div className="text-sm">Built for BD, Taka-first</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-base-content">2-tap</div>
              <div className="text-sm">Settle any due</div>
            </div>
          </div>
        </div>

        {/* Right: dashboard mockup */}
        <div className="relative flex-1">
          <div className="mockup-browser border border-base-300 bg-base-200 shadow-xl">
            <div className="mockup-browser-toolbar">
              <div className="input border border-base-300 bg-base-100">
                denapawna.com/dashboard
              </div>
            </div>
            <div className="flex flex-col gap-5 border-t border-base-300 bg-base-100 p-6 md:p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="stat rounded-box bg-success/10 p-5">
                  <div className="stat-title">You'll receive</div>
                  <div className="stat-value text-success text-3xl">৳4,200</div>
                  <div className="stat-desc text-success/70">from 3 people</div>
                </div>
                <div className="stat rounded-box bg-error/10 p-5">
                  <div className="stat-title">You owe</div>
                  <div className="stat-value text-error text-3xl">৳1,500</div>
                  <div className="stat-desc text-error/70">to 1 person</div>
                </div>
              </div>

              <ul className="flex flex-col gap-2">
                <li className="flex items-center justify-between rounded-box bg-base-200 px-4 py-3">
                  <span>Rahim</span>
                  <span className="badge badge-success badge-outline">+৳3,000</span>
                </li>
                <li className="flex items-center justify-between rounded-box bg-base-200 px-4 py-3">
                  <span>Karim</span>
                  <span className="badge badge-error badge-outline">-৳1,500</span>
                </li>
                <li className="flex items-center justify-between rounded-box bg-base-200 px-4 py-3">
                  <span>Lima</span>
                  <span className="badge badge-success badge-outline">+৳1,200</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Floating highlight badge — depth + visual interest */}
          <div className="absolute -bottom-6 -left-6 hidden items-center gap-2 rounded-box border border-base-300 bg-base-100 px-4 py-3 shadow-lg md:flex">
            <FiCheckCircle className="h-5 w-5 text-success" />
            <span className="text-sm font-medium">
              Rahim just settled ৳1,000
            </span>
          </div>
        </div>
      </div>

      <a
        href="#how-it-works"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-base-content/50"
      >
        <FiArrowDown className="h-8 w-8 text-success" />
      </a>
    </section>
  );
}