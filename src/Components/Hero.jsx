import { Link } from "react-router";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";

export default function Hero() {
  return (
    <section
      id="home"
      className="bg-base-100 px-2 py-8 md:py-18 w-full md:w-11/12 mx-auto lg:w-10/12 min-h-screen "
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:gap-16">
        {/* Left: text */}
        <div className="animate-fade-up flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Never forget <span className="text-error">who owes</span> you,{" "}
            <span className="text-success">ever again</span>
          </h1>

          <p className="mt-4 text-lg text-base-content/70">
            Track every Dena (debt) and Pawna (due) in one place — log
            transactions, follow repayments, and always know exactly where you
            stand.
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
        </div>

        {/* Right: dashboard mockup */}
        <div className="flex-1">
          <div className="mockup-browser border border-base-300 bg-base-200">
            <div className="mockup-browser-toolbar">
              <div className="input border border-base-300 bg-base-100">
                denapawna.com/dashboard
              </div>
            </div>
            <div className="flex flex-col gap-4 border-t border-base-300 bg-base-100 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="stat rounded-box bg-success/10 p-4">
                  <div className="stat-title">You'll receive</div>
                  <div className="stat-value text-success text-2xl">৳4,200</div>
                </div>
                <div className="stat rounded-box bg-error/10 p-4">
                  <div className="stat-title">You owe</div>
                  <div className="stat-value text-error text-2xl">৳1,500</div>
                </div>
              </div>

              <ul className="flex flex-col gap-2">
                <li className="flex items-center justify-between rounded-box bg-base-200 px-4 py-3">
                  <span>Rahim</span>
                  <span className="badge badge-success badge-outline">
                    +৳3,000
                  </span>
                </li>
                <li className="flex items-center justify-between rounded-box bg-base-200 px-4 py-3">
                  <span>Karim</span>
                  <span className="badge badge-error badge-outline">
                    -৳1,500
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <a
        href="#how-it-works"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-base-content/50"
      >
        <FiArrowDown className="h-8 w-8 text-success" />
      </a>
    </section>
  );
}
