
import { Link } from "react-router";
import { FiGithub, FiMail } from "react-icons/fi";
import logo from "../assets/logo_v2.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-base-200 px-6 py-10 text-base-content">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <img src={logo} alt="DenaPawna logo" className="h-8 w-auto shrink-0 md:h-16" />

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-base-content/70">
          <li><a href="#home">Home</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Sign Up</Link></li>
        </ul>

        <div className="flex shrink-0 items-center gap-4">
          <a
            href="https://github.com/sabbir211/dena-pawna"
            target="_blank"
            rel="noreferrer"
            className="btn btn-circle btn-ghost btn-sm"
            aria-label="GitHub"
          >
            <FiGithub className="h-4 w-4" />
          </a>
          <a
            href="mailto:contact@denapawna.com"
            className="btn btn-circle btn-ghost btn-sm"
            aria-label="Email"
          >
            <FiMail className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mt-8 border-t border-base-300 pt-6 text-center text-xs text-base-content/50">
        © {year} DenaPawna. All rights reserved.
      </div>
    </footer>
  );
}